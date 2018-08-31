<?php

namespace App\Services;


interface PostService
{
    public function find();

    public function findByCategory($categoryId);

    public function findById($postId);

    public function search($query);

    public function save($post);

    public function delete($postId);
}
