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
 *     property="name",
 *     type="string"
 *   )
 * )
 */
class Author extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'name' => $this->name
        ];
    }
}