<?php
/**
 * Created by PhpStorm.
 * User: oleh
 * Date: 8/16/18
 * Time: 12:06 AM
 */

namespace App\Services;


interface PostService
{
    public function find();

    public function findByCategory($categoryId);

    public function findById($postId);

    public function save($post);

    public function delete($postId);
}
