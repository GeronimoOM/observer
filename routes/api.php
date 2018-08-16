<?php

$router->group(['prefix' => 'api'], function() use ($router) {
    $router->get('posts', 'PostController@find');
    $router->get('posts/{id}', 'PostController@findById');
    $router->post('posts', 'PostController@save');
    $router->delete('posts/{id}', 'PostController@delete');

    $router->get('categories', 'PostController@findCategories');
});

