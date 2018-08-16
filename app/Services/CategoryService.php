<?php

namespace App\Services;


interface CategoryService
{
    public function find();

    public function findById($categoryId);

}