<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateFavoritesTable extends Migration
{
    public function up()
    {
        Schema::create('favorites', function (Blueprint $table) {
            $table->unsignedBigInteger('user_id'); // 'user_id' column
            $table->unsignedBigInteger('item_id'); // 'item_id' column

            // Foreign keys and indexes
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('item_id')->references('id')->on('items')->onDelete('cascade');

            $table->primary(['user_id', 'item_id']); // Composite primary key
            $table->timestamps(); // Adds 'created_at' and 'updated_at'
        });
    }

    public function down()
    {
        Schema::dropIfExists('favorites');
    }
}
