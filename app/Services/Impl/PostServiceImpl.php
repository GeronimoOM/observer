<?php

namespace App\Services\Impl;

use App\Model\Author;
use App\Model\Post;
use App\Services\PostService;
use App\Services\Utils\Pagination;
use Illuminate\Support\Carbon;

class PostServiceImpl implements PostService
{
    use Pagination;

    public function find()
    {
        return $this->paginate(Post::abridged());
    }

    public function findByCategory($categoryId)
    {
        return $this->paginate(Post::abridged()->where('category_id', '=', $categoryId));
    }

    public function findById($postId)
    {
        return Post::findOrFail($postId);
    }

    public function search($query)
    {
        return $this->paginate(Post::search($query));
    }

    public function save($post)
    {
        if(array_key_exists('author', $post)) {
            $post['author'] = $this->getOrCreateAuthor($post['author']);
        }
        if(!array_key_exists('added', $post)) {
            $post['added'] = Carbon::now();
        };
        return Post::create($post);
    }

    public function delete($postId)
    {
        Post::destroy($postId);
    }

    private function getOrCreateAuthor($author)
    {
        if (!array_key_exists('id', $author)) {
            return Author::create($author);
        } else {
            return Author::find($author);
        }
    }

}