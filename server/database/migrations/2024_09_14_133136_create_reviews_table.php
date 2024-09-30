<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
             Schema::create('reviews', function (Blueprint $table) {
                $table->id();
                $table->unsignedBigInteger('reviewer_id'); 
                $table->unsignedBigInteger('reviewed_id'); // Polymorphic relation ID
                $table->string('reviewed_type'); // Polymorphic relation type (User or Item)
                $table->tinyInteger('rating')->unsigned(); // Rating (1-5)
                $table->text('comment')->nullable(); 
                $table->timestamps();
    
                // Add foreign key constraint for reviewer_id
                $table->foreign('reviewer_id')->references('id')->on('users')->onDelete('cascade');
            });
        }

    public function down()
    {
        Schema::dropIfExists('reviews');
    }
};
