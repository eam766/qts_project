<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('games', function (Blueprint $table) {
            $table->id();
            $table->integer('game_id')->unique();
            $table->string('name');
            $table->string('slug')->nullable();
            $table->float('price')->nullable();
            $table->text('release_date')->nullable();
            $table->string('cover_image_id')->nullable();
            $table->float('total_rating')->nullable();
            $table->text('storyline')->nullable();
            $table->text('summary')->nullable();
            $table->integer('hypes')->nullable();
            $table->integer('game_type')->nullable();


            //Tableau
            $table->text('artworks')->nullable();
            $table->text('screenshots')->nullable();
            $table->text('genres')->nullable();
            $table->text('involved_companies')->nullable();
            $table->text('similar_games')->nullable();
            $table->text('videos')->nullable();
            $table->text('platforms')->nullable();
            $table->text('themes')->nullable();
            $table->text('external_games')->nullable();


            $table->timestamps();
        });
    }

    public function down(): void {
        Schema::dropIfExists('games');
    }
};
