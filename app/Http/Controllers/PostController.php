<?php

namespace App\Http\Controllers;

use App\Http\Resources\Post;
use App\Services\CategoryService;
use App\Services\PostService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class PostController extends Controller
{
    /**
     * @var PostService
     */
    private $postService;

    /**
     * @var CategoryService
     */
    private $categoryService;

    public function __construct(PostService $postService,
                                CategoryService $categoryService)
    {
        $this->postService = $postService;
        $this->categoryService = $categoryService;
    }

    public function find(Request $request)
    {
        if(!$request->has('category')) {
            $posts = $this->postService->find();
        } else {
            $posts = $this->postService->findByCategory($request->input('category'));
        }
        return Post::collection($posts);
    }


    public function findById($postId)
    {
        return new Post($this->postService->findById($postId));
    }

    public function search(Request $request)
    {
        return Post::collection($this->postService->search($request->input('query')));
    }

    public function save(Request $request)
    {
        $post = Validator::make($request->json()->all(), [
            'title' => 'max:200|required',
            'subtitle' => 'max:500|required',
            'content' => 'required',
            'type' => 'integer|required',
            'category.id' => 'integer|required',
            'author.name' => 'filled|max:50|nullable',
            'added' => 'date|nullable',
            'image' => 'filled|max:1000|nullable'
        ])->validate();
        return new Post($this->postService->save($post));
    }

    public function delete($postId)
    {
        $this->postService->delete($postId);
    }

    public function findCategories()
    {
        return $this->categoryService->find();
    }

}
