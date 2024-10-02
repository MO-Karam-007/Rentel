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
        Schema::create('rental_user', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->foreignId('lender_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('borrower_id')->constrained('users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('rental_user');
    }
};
