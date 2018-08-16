<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\File;

class FrontendController extends Controller
{
    public function index()
    {
        return File::get(app()->basePath('public/ui/index.html'));
    }
}