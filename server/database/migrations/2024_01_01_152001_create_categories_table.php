<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCategoriesTable extends Migration
{
    public function up()
    {
        Schema::create('categories', function (Blueprint $table) {
            $table->id(); // 'id' as primary key
            $table->string('category'); // 'category' column
            $table->timestamps(); // Adds 'created_at' and 'updated_at'
        });
    }

    public function down()
    {
        Schema::dropIfExists('categories');
    }
}
