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
 
 
 
Route::get('/', [GameController::class,'showTOP']);
Route::inertia('/connexion', 'Connexion')->name('connexion');

Route::inertia('/inscription', 'Inscription')->name('inscription');
Route::post('/register', [RegisteredUserController::class, 'store'])->name('register');
Route::post('/login', [AuthenticatedSessionController::class, 'store'])->name('login');
 
 
Route::inertia('/listeSouhaits', 'ListeSouhaits'); 
Route::inertia('/panier', 'Panier'); 
Route::inertia('/profile', 'Profile');
Route::inertia('/profil-settings', 'ProfileSettings');
 
Route::get('/boutique', [GameController::class, 'index'])->name('games.index');
 
 
 
Route::get('/jeux/{id}', [GameController::class, 'show']);
 
Route::inertia('/a_propos', 'A_Propos');
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
 
require __DIR__.'/auth.php';
 
 
 