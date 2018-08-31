<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateSchema extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('authors', function (Blueprint $table) {
            $table->bigIncrements('author_id');
            $table->string('name', 50);

            $this->setCharset($table);
        });

        Schema::create('posts', function (Blueprint $table) {
            $table->bigIncrements('post_id');
            $table->string('title', 200);
            $table->string('subtitle', 500);
            $table->text('content');
            $table->unsignedSmallInteger('type');
            $table->unsignedSmallInteger('category_id');
            $table->dateTime('added');
            $table->unsignedBigInteger('author_id')->nullable();
            $table->text('image')->nullable();

            $table->foreign('author_id')
                ->references('author_id')->on('authors')
                ->onUpdate('cascade')->onDelete('set null');

            $this->setCharset($table);
        });

        Schema::create('comments', function (Blueprint $table) {
            $table->bigIncrements('comment_id');
            $table->string('name', 50);
            $table->text('content');
            $table->unsignedBigInteger('post_id');
            $table->dateTime('added');

            $table->foreign('post_id')
                ->references('post_id')->on('posts')
                ->onUpdate('cascade')->onDelete('cascade');

            $this->setCharset($table);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('comments');
        Schema::drop('posts');
        Schema::drop('authors');
    }

    private function setCharset($table)
    {
        $table->charset = 'utf8mb4';
        $table->collation = 'utf8mb4_unicode_ci';
    }
}

