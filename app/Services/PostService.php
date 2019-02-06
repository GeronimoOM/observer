<?php

namespace App\Services;


interface PostService
{
    public function find($options = array());

    public function findById($postId);

    public function search($query);

    public function save($post);

    public function delete($postId);

    public function flag($postId, $flag);
}
