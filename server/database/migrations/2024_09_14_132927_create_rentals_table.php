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
        Schema::create('rentals', function (Blueprint $table) {
            $table->id();
            $table->foreignId('borrower_id')->constrained('users');
            $table->foreignId('item_id')->constrained('items');
            $table->date('start_date');
            $table->date('end_date');
            $table->enum('status', ['requested', 'approved', 'rejected', 'active', 'returned', 'cancelded']);
            $table->decimal('rental_price', 10, 2)->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.numeric
     */
    public function down(): void
    {
        Schema::dropIfExists('rentals');
    }
};
