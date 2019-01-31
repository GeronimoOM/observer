<?php

namespace App\Services\Impl;

use App\Models\Author;
use App\Models\Post;
use App\Services\PostService;
use App\Services\Utils\Pagination;
use Illuminate\Support\Carbon;

class PostServiceImpl implements PostService
{
    use Pagination;

    public function find()
    {
        return $this->findByOptions();
    }

    public function findById($postId)
    {
        return Post::findOrFail($postId);
    }

    public function findByOptions($options = array())
    {
        $query = Post::abridged();
        if (array_key_exists('category', $options))
            $query = $query->where('category_id', '=', $options['category']);
        if (array_key_exists('type', $options))
            $query = $query->where('type', '=',$options['type']);
        return $this->paginate($query);
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