<?php

namespace App\Services\Utils;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\Input;

trait Pagination
{
    public static $perPage = 10;

    protected function paginate(Builder $query)
    {
       return new Collection($query->simplePaginate(Input::get('elems', self::$perPage))->items());
    }
}