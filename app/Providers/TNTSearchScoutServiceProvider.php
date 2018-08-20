<?php


namespace App\Providers;

use App\Services\Engines\TNTSearchEngine;
use TeamTNT\TNTSearch\TNTSearch;
use Laravel\Scout\EngineManager;
use Illuminate\Support\ServiceProvider;

class TNTSearchScoutServiceProvider extends ServiceProvider
{
    public function boot()
    {
        $this->app[EngineManager::class]->extend('tntsearch', function ($app) {
            $tnt = new TNTSearch();

            $driver = config('database.default');
            $config = config('scout.tntsearch') + config("database.connections.{$driver}");

            $tnt->loadConfig($config);
            $tnt->setDatabaseHandle(app('db')->connection()->getPdo());

            $this->setFuzziness($tnt);
            $this->setAsYouType($tnt);

            return new TNTSearchEngine($tnt);
        });
    }

    protected function setFuzziness($tnt)
    {
        $tnt->fuzziness            = config('scout.tntsearch.fuzziness', $tnt->fuzziness);
        $tnt->fuzzy_distance       = config('scout.tntsearch.fuzzy.distance', $tnt->fuzzy_distance);
        $tnt->fuzzy_prefix_length  = config('scout.tntsearch.fuzzy.prefix_length', $tnt->fuzzy_prefix_length);
        $tnt->fuzzy_max_expansions = config('scout.tntsearch.fuzzy.max_expansions', $tnt->fuzzy_max_expansions);
    }

    protected function setAsYouType($tnt)
    {
        $tnt->asYouType = config('scout.tntsearch.asYouType', $tnt->asYouType);
    }
}