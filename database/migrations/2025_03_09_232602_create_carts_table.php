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
        Schema::create('carts', function (Blueprint $table) {
            $table->id();
            // Clé étrangère vers la table "users"
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            
            // ID du jeu (lié à l'API externe, pas de clé étrangère)
            $table->unsignedBigInteger('game_id');

            $table->timestamps();

            // Empêche un utilisateur d'ajouter plusieurs fois le même jeu
            $table->unique(['user_id', 'game_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('carts');
    }
};
