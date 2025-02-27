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
        Schema::create('wishlists', function (Blueprint $table) {
            $table->id();
            // Lien avec la table locale "users"
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            
            // ID du jeu depuis la base externe
            // (pas de clé étrangère, juste un champ "int" ou "string")
            $table->unsignedBigInteger('game_id');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('wishlists');
    }
};
