<?php

$router->group(['prefix' => 'api'], function() use ($router) {
    $router->get('posts', 'PostController@find');
    $router->get('posts/search', 'PostController@search');
    $router->get('posts/{id}', 'PostController@findById');
    $router->post('posts', 'PostController@save');
    $router->delete('posts/{id}', 'PostController@delete');
    $router->put('posts/{id}/flag', 'PostController@flag');

    $router->get('categories', 'PostController@findCategories');
});

