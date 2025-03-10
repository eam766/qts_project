<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\GameController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\PasswordResetLinkController;
use App\Http\Controllers\Auth\NewPasswordController;
use App\Http\Controllers\WishlistController;




Route::get('/', [GameController::class,'acceuil'])->name('accueil');
Route::inertia('/connexion', 'Connexion')->name('connexion');

Route::inertia('/inscription', 'Inscription')->name('inscription');
Route::post('/register', [RegisteredUserController::class, 'store'])->name('register');
Route::post('/login', [AuthenticatedSessionController::class, 'store'])->name('login');


Route::inertia('/listeSouhaits', 'ListeSouhaits');
Route::inertia('/panier', 'Panier');
Route::inertia('/profil', 'Profile');
Route::inertia('/profil-settings', 'ProfileSettings');

Route::get('/boutique', [GameController::class, 'index'])->name('games.index');


Route::get('/boutique/recherche', [GameController::class, 'search'])->name('games.search');
Route::get('/boutique/filter', [GameController::class, 'filter'])->name('games.filter');



Route::get('/jeux/{game_id}', [GameController::class, 'show']);

Route::inertia('/a_propos', 'A_Propos');
Route::inertia('/equipe', 'Equipe');
Route::inertia('/termes_conditions', 'TermesConditions');
Route::inertia('/politique_cookies', 'PolitiqueCookies');
Route::inertia('/contact', 'Contact');
Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');




 Route::get('/connexion', function () {
     return Inertia::render('Connexion', [
         'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
     ]);
 });


Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::get('/forgot-password', [PasswordResetLinkController::class, 'create'])
    ->middleware('guest')
    ->name('password.request');

Route::post('/forgot-password', [PasswordResetLinkController::class, 'store'])
    ->middleware('guest')
    ->name('password.email');

Route::get('/reset-password/{token}', [NewPasswordController::class, 'create'])
    ->middleware('guest')
    ->name('password.reset');

Route::post('/reset-password', [NewPasswordController::class, 'store'])
    ->middleware('guest')
    ->name('password.update');


    Route::post('/wishlist', [WishlistController::class, 'store'])
    ->name('wishlist.store')
    ->middleware('auth');

    Route::delete('/wishlist', [WishlistController::class, 'destroy'])
    ->name('wishlist.destroy')
    ->middleware('auth');

    Route::get('/listeSouhaits', [WishlistController::class, 'index'])
    ->middleware('auth')
    ->name('wishlist.index');

    Route::middleware('auth')->get('/wishlist-data', [WishlistController::class, 'getWishlist'])
    ->name('wishlist.data');




require __DIR__.'/auth.php';


