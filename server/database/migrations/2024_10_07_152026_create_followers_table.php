<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateFollowersTable extends Migration
{
    public function up()
    {
        Schema::create('followers', function (Blueprint $table) {
            $table->id(); // 'id' as primary key
            $table->unsignedBigInteger('user_id'); // 'user_id' column
            $table->unsignedBigInteger('follower_id'); // 'follower_id' column

            // Foreign keys
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('follower_id')->references('id')->on('users')->onDelete('cascade');

            $table->timestamps(); // Adds 'created_at' and 'updated_at'
        });
    }

    public function down()
    {
        Schema::dropIfExists('followers');
    }
}
