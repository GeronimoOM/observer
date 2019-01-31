<?php

namespace App\Services;


interface PostService
{
    public function find();

    public function findById($postId);

    public function findByOptions($options);

    public function search($query);

    public function save($post);

    public function delete($postId);
}
