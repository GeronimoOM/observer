<?php

namespace App\Http\Resources;


use Illuminate\Http\Resources\Json\JsonResource;

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