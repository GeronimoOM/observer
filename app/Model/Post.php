<?php

namespace App\Model;

use App\Facades\Category;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    protected $primaryKey = 'post_id';

    protected $fillable = ['title', 'subtitle', 'content', 'type', 'category', 'author', 'added', 'image'];

    public $timestamps = false;

    protected $dates = ['added'];

    public function getIdAttribute()
    {
        return $this->attributes['post_id'];
    }

    public function setCategoryAttribute($category)
    {
        $this->attributes['category_id'] = $category['id'];
    }

    public function getCategoryAttribute()
    {
        return Category::findById($this->attributes['category_id']);
    }

    public function setAuthorAttribute($author)
    {
        $this->attributes['author_id'] = $author['id'];
    }

    public function author()
    {
        return $this->belongsTo(Author::class, 'author_id');
    }

    protected static function boot()
    {
        parent::boot();

        static::addGlobalScope('order', function (Builder $query) {
            $query->orderByDesc('added');
        });
        static::addGlobalScope('withAuthor', function (Builder $query) {
            $query->with('author');
        });
    }

    public function scopeAbridged(Builder $query)
    {
        return $query->selectRaw('post_id, title, subtitle, 
        SUBSTRING(content, 1, 300) AS content, type, category_id, author_id, added, image');
    }
}
