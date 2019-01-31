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

    /**
     * @OA\Get(path="/api/posts",
     *   tags={"posts"},
     *   summary="Find list of Posts",
     *   @OA\Parameter(
     *       name="category",
     *       in="query",
     *       description="Category of Posts",
     *       @OA\Schema(
     *          type="integer",
     *          enum={"politics", "economics", "health", "sport", "culture", "society"}
     *       )
     *   ),
     *   @OA\Parameter(
     *       name="type",
     *       in="query",
     *       description="Type of Posts",
     *       @OA\Schema(
     *          type="integer", 
     *          enum={"news", "article", "blog post", "quote"}
     *       )
     *   ),
     *   @OA\Parameter(
     *       name="flag",
     *       in="query",
     *       description="Flag attributed to Posts",
     *       @OA\Schema(
     *          type="string", 
     *          enum={"main", "popular"}
     *       )
     *   ),
     *   @OA\Parameter(ref="#/components/parameters/page"),
     *   @OA\Parameter(ref="#/components/parameters/elems"),
     *   @OA\Response(
     *     response="200", 
     *     description="Found Posts",
     *     @OA\JsonContent(
     *       type="array",
     *       @OA\Items(ref="#/components/schemas/Post")
     *     )
     *   )
     * )
     */
    public function find(Request $request)
    {
        $posts = $this->postService->find($request->only(['category', 'type', 'flag']));
        return Post::collection($posts);
    }

    /**
     * @OA\Get(path="/api/posts/{id}",
     *   tags={"posts"},
     *   summary="Find Post by id",
     *   @OA\Parameter(
     *       name="id",
     *       in="path",
     *       description="Identifier of the Post",
     *       required=true,
     *       @OA\Schema(type="integer", minimum=1)
     *   ),
     *   @OA\Response(
     *     response="200", 
     *     description="Found Post",
     *     @OA\JsonContent(
     *       ref="#/components/schemas/Post"
     *     )
     *   )
     * )
     */
    public function findById($postId)
    {
        return new Post($this->postService->findById($postId));
    }

    /**
     * @OA\Get(path="/api/posts/search",
     *   tags={"posts"},
     *   summary="Find list of Posts",
     *   @OA\Parameter(
     *       name="query",
     *       in="query",
     *       description="Query to search Posts by",
     *       required=true,
     *       @OA\Schema(type="string")
     *   ),
     *   @OA\Parameter(ref="#/components/parameters/page"),
     *   @OA\Parameter(ref="#/components/parameters/elems"),
     *   @OA\Response(
     *     response="200", 
     *     description="Found Posts",
     *     @OA\JsonContent(
     *       type="array",
     *       @OA\Items(ref="#/components/schemas/Post")
     *     )
     *   )
     * )
     */
    public function search(Request $request)
    {
        return Post::collection($this->postService->search($request->input('query')));
    }

     /**
     * @OA\Post(path="/api/posts",
     *   tags={"posts"},
     *   summary="Save Post",
     *   @OA\RequestBody(
     *     required=true,
     *     description="Post data",
     *     @OA\JsonContent(ref="#/components/schemas/Post")
     *   ),
     *   @OA\Response(
     *     response="200", 
     *     description="Saved Post",
     *     @OA\JsonContent(
     *       ref="#/components/schemas/Post")
     *     )
     *   )
     * )
     */
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

        /**
     * @OA\Delete(path="/api/posts/{id}",
     *   tags={"posts"},
     *   summary="Delete Post",
     *   @OA\Parameter(
     *     name="id",
     *     in="path",
     *     required=true,
     *     description="Identifier of the Post",
     *     @OA\Schema(type="integer", minimum=1)
     *   ),
     *   @OA\Response(response=200, description="Post deleted"),
     * )
     */
    public function delete($postId)
    {
        $this->postService->delete($postId);
    }

     /**
     * @OA\Get(path="/api/categories",
     *   tags={"categories"},
     *   summary="Find Categories",
     *   @OA\Response(
     *     response="200", 
     *     description="Found Categories",
     *     @OA\JsonContent(
     *       type="array",
     *       @OA\Items(ref="#/components/schemas/Category")
     *     )
     *   )
     * )
     */
    public function findCategories()
    {
        return $this->categoryService->find();
    }

}
