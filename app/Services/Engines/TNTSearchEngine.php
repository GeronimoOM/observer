<?php

namespace App\Services\Engines;

use Illuminate\Database\Eloquent\Collection;
use Laravel\Scout\Builder;
use Laravel\Scout\Engines\Engine;
use TeamTNT\TNTSearch\TNTSearch;

class TNTSearchEngine extends Engine
{
    /**
     * @var TNTSearch
     */
    protected $tnt;

    /**
     * Create a new engine instance.
     *
     * @param TNTSearch $tnt
     */
    public function __construct(TNTSearch $tnt)
    {
        $this->tnt = $tnt;
    }

    /**
     * Update the given model in the index.
     *
     * @param Collection $models
     *
     * @return void
     */
    public function update($models)
    {
        $this->initIndex($models->first());
        $this->tnt->selectIndex("{$models->first()->searchableAs()}.index");
        $index = $this->tnt->getIndex();
        $index->setPrimaryKey($models->first()->getKeyName());

        $index->indexBeginTransaction();
        $models->each(function ($model) use ($index) {
            $array = $model->toSearchableArray();

            if (empty($array)) {
                return;
            }

            if ($model->getKey()) {
                $index->update($model->getKey(), $array);
            } else {
                $index->insert($array);
            }
        });
        $index->indexEndTransaction();
    }

    /**
     * Remove the given model from the index.
     *
     * @param Collection $models
     *
     * @return void
     */
    public function delete($models)
    {
        $this->initIndex($models->first());
        $models->each(function ($model) {
            $this->tnt->selectIndex("{$model->searchableAs()}.index");
            $index = $this->tnt->getIndex();
            $index->setPrimaryKey($model->getKeyName());
            $index->delete($model->getKey());
        });
    }

    /**
     * Perform the given search on the engine.
     *
     * @param Builder $builder
     *
     * @return mixed
     */
    public function search(Builder $builder)
    {
        return $this->performSearch($builder);
    }

    /**
     * Perform the given search on the engine.
     *
     * @param Builder $builder
     * @param int     $perPage
     * @param int     $page
     *
     * @return mixed
     */
    public function paginate(Builder $builder, $perPage, $page)
    {
        $results = $this->performSearch($builder);

        $keys = collect($results['ids'])->forPage($page, $perPage);

        return [
            'ids' => $keys->values()->all(),
            'hits' => $keys->count()
        ];
    }

    /**
     * Perform the given search on the engine.
     *
     * @param Builder $builder
     *
     * @return mixed
     */
    protected function performSearch(Builder $builder, array $options = [])
    {
        $index = $builder->index ?: $builder->model->searchableAs();
        $limit = $builder->limit ?: 10000;
        $this->tnt->selectIndex("{$index}.index");

        if ($builder->callback) {
            return call_user_func(
                $builder->callback,
                $this->tnt,
                $builder->query,
                $options
            );
        }
        if (isset($this->tnt->config['searchBoolean']) ? $this->tnt->config['searchBoolean'] : false) {
            return $this->tnt->searchBoolean($builder->query, $limit);
        } else {
            return $this->tnt->search($builder->query, $limit);
        }
    }

    /**
     * Map the given results to instances of the given model.
     *
     * @param  \Laravel\Scout\Builder  $builder
     * @param mixed                               $results
     * @param \Illuminate\Database\Eloquent\Model $model
     *
     * @return Collection
     */
    public function map(Builder $builder, $results, $model)
    {
        if (count($results['ids']) === 0) {
            return Collection::make();
        }

        $models = $model->getScoutModelsByIds($builder, $results['ids'])->keyBy(function ($model) {
            return $model->getScoutKey();
        });

        return collect($results['ids'])->map(function ($hit) use ($models) {
            if (isset($models[$hit])) {
                return $models[$hit];
            }
        })->filter()->values();
    }

    /**
     * Pluck and return the primary keys of the given results.
     *
     * @param mixed $results
     * @return \Illuminate\Support\Collection
     */
    public function mapIds($results)
    {
        return collect($results['ids'])->values();
    }

    /**
     * Get the total count from a raw result returned by the engine.
     *
     * @param mixed $results
     *
     * @return int
     */
    public function getTotalCount($results)
    {
        return $results['hits'];
    }

    public function initIndex($model)
    {
        $indexName = $model->searchableAs();

        if (!file_exists($this->tnt->config['storage']."/{$indexName}.index")) {
            $indexer = $this->tnt->createIndex("$indexName.index");
            $indexer->setDatabaseHandle($model->getConnection()->getPdo());
            $indexer->setPrimaryKey($model->getKeyName());
            if (isset($this->tnt->config['language'])) {
                $indexer->setLanguage($this->tnt->config['language']);
            }
        }
    }
}
