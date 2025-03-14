<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cart extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'game_id',
    ];

    /**
     * Relation : un élément du panier appartient à un utilisateur.
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
