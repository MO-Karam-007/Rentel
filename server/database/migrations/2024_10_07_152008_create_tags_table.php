<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTagsTable extends Migration
{
    public function up()
    {
        Schema::create('tags', function (Blueprint $table) {
            $table->id(); // 'id' as primary key
            $table->string('tag_name'); // 'tag_name' column
            $table->timestamps(); // Adds 'created_at' and 'updated_at'
        });
    }

    public function down()
    {
        Schema::dropIfExists('tags');
    }
}
