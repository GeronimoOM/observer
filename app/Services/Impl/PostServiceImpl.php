<?php

namespace App\Services\Impl;

use App\Models\Author;
use App\Models\Post;
use App\Services\PostService;
use App\Services\Utils\Pagination;
use DB;
use Illuminate\Support\Carbon;

class PostServiceImpl implements PostService
{
    use Pagination;

    public function find($options = array())
    {
        $query = Post::abridged();

        if (array_key_exists('category', $options))
        {
            $query = $query->where('category_id', '=', $options['category']);
        }
        if (array_key_exists('type', $options))
        {
            $query = $query->where('type', '=', $options['type']);
        }
        if (array_key_exists('flag', $options))
        {
            $query = $query->join('post_flags', 'posts.post_id', '=', 'post_flags.post_id')
                ->where('flag', '=', $options['flag'])
                ->latest('assigned');
        }
        return $this->paginate($query);
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

    public function flag($postId, $flag)
    {
        DB::table('post_flags')->insert([
            'post_id' => $postId,
            'flag' => $flag,
            'assigned' => Carbon::now()
        ]);
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