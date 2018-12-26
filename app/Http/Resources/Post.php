<?php

namespace App\Http\Resources;


use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @OA\Schema(
 *   @OA\Property(
 *     property="id",
 *     type="integer"
 *   ),
 *   @OA\Property(
 *     property="title",
 *     type="string"
 *   ),
 *   @OA\Property(
 *     property="subtitle",
 *     type="string"
 *   ),
 *   @OA\Property(
 *     property="content",
 *     type="string",
 *   ),
 *   @OA\Property(
 *     property="type",
 *     type="integer",
 *     enum={"News", "Article", "BlogPost", "Quote"}
 *   ),
 *   @OA\Property(
 *     property="author",
 *     ref="#/components/schemas/Author"
 *   ),
 *   @OA\Property(
 *     property="category",
 *      ref="#/components/schemas/Category"
 *   ),
 *   @OA\Property(
 *     property="added",
 *     type="string",
 *     format="date-time"
 *   ),
 *   @OA\Property(
 *     property="image",
 *     type="string"
 *   )
 * )
 */
class Post extends JsonResource
{

    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'subtitle' => $this->subtitle,
            'content' => $this->content,
            'type' => $this->type,
            'author' => new Author($this->author),
            'category' =>  $this->category,
            'added' => $this->added,
            'image' => $this->image,
        ];
    }
}