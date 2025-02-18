<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\GameController;


Route::get('/', [GameController::class,'showTOP']); 
Route::inertia('/connexion', 'Connexion');
Route::inertia('/inscription', 'Inscription');
Route::inertia('/profile', 'Profile');
Route::inertia('/profil-settings', 'ProfileSettings');

Route::get('/boutique', [GameController::class, 'index'])->name('games.index');



Route::get('/jeux/{id}', [GameController::class, 'show']);

Route::inertia('/a_propos', 'A_Propos');



/*
Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
*/
