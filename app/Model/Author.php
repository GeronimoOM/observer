<?php

namespace App\Model;


use Illuminate\Database\Eloquent\Model;

class Author extends Model
{
    protected $primaryKey = 'author_id';

    protected $fillable = ['name'];

    public $timestamps = false;

    public function getIdAttribute()
    {
        return $this->attributes['author_id'];
    }
}