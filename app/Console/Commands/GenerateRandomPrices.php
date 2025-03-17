<?php

namespace App\Console\Commands;
use Illuminate\Console\Command;
use App\Models\Game;
use App\Services\ITADService;

class GenerateRandomPrices extends Command
{
    protected $signature = 'games:generate-prices';
    protected $description = 'Generate and assign random prices for games';

    public function handle()
    {
        $games = Game::all();

        foreach ($games as $game) {
            $randomPrice = rand(5, 80) . '.99';

            $game->update(['price' => $randomPrice]);

            $this->info("Assigned price $randomPrice to {$game->name}");
        }

        $this->info('Random prices generated for all games!');
    }

}
