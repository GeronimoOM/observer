<?php

namespace App\Services\Utils;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\Input;

trait Pagination
{
    public static $perPage = 10;

    protected function paginate($query)
    {
        $elems = Input::get('elems', self::$perPage);
        return new Collection($query->paginate($elems)->items());
    }
}