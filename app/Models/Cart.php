<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cart extends Model
{
    use HasFactory;

    protected $fillable = ['user_id', 'game_id'];

 
    

    /**
     * Récupérer l'utilisateur associé à cet élément du panier
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function game()
{
    return $this->belongsTo(Game::class, 'game_id', 'id'); 
}

}
