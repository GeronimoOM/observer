<?php

namespace App\Services\Impl;


use App\Services\CategoryService;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Storage;

/**
 * @OA\Schema(
 *   schema="Category",
 *   @OA\Property(
 *     property="id",
 *     type="integer"
 *   ),
 *   @OA\Property(
 *     property="name",
 *     type="string"
 *   )
 * )
 */
class CategoryServiceImpl implements CategoryService
{
    /**
     * @var Collection
     */
    private $categories;

    public function __construct()
    {
        $this->load();
    }

    public function find()
    {
        return $this->categories->values();
    }

    public function findById($categoryId)
    {
        return $this->categories->get($categoryId);
    }

    private function load()
    {
        $categories = json_decode(Storage::disk('local')->get('categories.json'));
        $this->categories = collect($categories)->mapWithKeys(function($category) {
            return [$category->id => $category];
        });
    }
}