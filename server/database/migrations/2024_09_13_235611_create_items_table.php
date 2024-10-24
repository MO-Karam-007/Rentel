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
            $table->boolean('status')->nullable();
            $table->enum('current_state', ['available', 'rented', 'unavailable'])->default('available');;
            $table->decimal('price', 10, 2);
            // $table->integer('duration');
            $table->boolean('archive')->default(true);
            $table->boolean('visible')->default(false);
            $table->foreignId('lender_id')->constrained('users');
            $table->string('tag')->unique();
            $table->unsignedBigInteger('category_id'); // Foreign key
            $table->dateTime('startDate');
            $table->geography('location', subtype: 'point', srid: 4326);
            $table->dateTime('endDate');
            $table->foreign('category_id')->references('id')->on('categories')->onDelete('cascade');
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
