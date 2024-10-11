<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {

        Schema::create('items', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->text('description');
            $table->string('item_image')->nullable();
            $table->decimal('latitude', 10, 7)->nullable();
            $table->decimal('longitude', 10, 7)->nullable();
            $table->boolean('status')->default(false);
            $table->enum('current_state', ['available', 'rented', 'unavailable'])->default('available');;
            $table->decimal('price', 10, 2);
            $table->integer('duration');
            $table->foreignId('lender_id')->constrained('users');
            $table->string('tag');
            
            // $table->unsignedBigInteger('category_id'); // Foreign key
            $table->foreignId('category_id')->constrained('categories')->onDelete('cascade');
            $table->magellanPoint('location', 4326); // Point type for PostGIS

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('items');
    }
};
