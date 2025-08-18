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
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('description')->nullable();
            $table->string('slug')->unique();
            $table->string('sku')->unique();
            $table->decimal('price', 10, 2);
            $table->decimal('compare_price', 10, 2)->nullable();
            $table->integer('quantity')->default(0);
            $table->enum('stock_status', ['in_stock', 'out_of_stock'])->default('in_stock');
            $table->foreignId('category_id')->constrained()->onDelete('cascade');
            $table->string('main_image')->nullable();
            $table->json('gallery_images')->nullable();
            $table->string('meta_title')->nullable();
            $table->text('meta_description')->nullable();
            $table->json('tags')->nullable();
            $table->boolean('is_active')->default(true);
            $table->boolean('is_featured')->default(false);
            $table->timestamps();

            $table->index(['sku']);
            $table->index(['is_active', 'created_at']);
            $table->index(['is_featured']);
            $table->index(['stock_status']);
            $table->index(['slug']);
            $table->fullText(['name', 'description']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
