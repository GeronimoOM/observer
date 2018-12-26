<?php

namespace App\Services\Utils;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\Input;

/** 
 * @OA\Parameter(
 *   name="page",
 *   in="query",
 *   description="Page number",
 *   required=false,
 *   @OA\Schema(
 *     type="integer",
 *     default=1
 *   )
 * )
 * @OA\Parameter(
 *   name="elems",
 *   in="query",
 *   description="Number of elements per page",
 *   required=false,
 *   @OA\Schema(
 *     type="integer",
 *     default=10
 *   )
 * )  
 */
trait Pagination
{
    public static $perPage = 10;

    protected function paginate($query)
    {
        $elems = Input::get('elems', self::$perPage);
        return new Collection($query->paginate($elems)->items());
    }
}