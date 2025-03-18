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
use App\Http\Controllers\CartController;
use App\Http\Controllers\CheckoutController;
use App\Http\Controllers\LibraryController;



Route::get('/', [GameController::class,'acceuil'])->name('accueil');

Route::inertia('/inscription', 'Inscription')->name('inscription');
Route::post('/register', [RegisteredUserController::class, 'store'])->name('register');
Route::post('/login', [AuthenticatedSessionController::class, 'store'])->name('login');


Route::inertia('/listeSouhaits', 'ListeSouhaits');
Route::inertia('/panier', 'Panier');


Route::get('/boutique', [GameController::class, 'index'])->name('games.index');


Route::get('/boutique/recherche', [GameController::class, 'search'])->name('games.search');
Route::get('/boutique/filter', [GameController::class, 'filter'])->name('games.filter');



Route::get('/jeux/{id}', [GameController::class, 'show'])->name('games.show');


Route::inertia('/a_propos', 'A_Propos');
Route::inertia('/equipe', 'Equipe');
Route::inertia('/termes_conditions', 'TermesConditions');
Route::inertia('/politique_cookies', 'PolitiqueCookies');
Route::inertia('/contact', 'Contact');
Route::get('/profil', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/bibliotheque', function () {
    return Inertia::render('Library');
})->middleware(['auth', 'verified'])->name('bibliotheque');

Route::middleware('auth')->get('/bibliotheque', [LibraryController::class, 'index'])
    ->name('bibliotheque');






Route::get('/connexion', function () {
    return Inertia::render('Connexion', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->name('connexion');



Route::middleware('auth')->group(function () {
    Route::get('/profil-parametres', [ProfileController::class, 'edit'])->name('profile.edit');
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

    Route::middleware('auth')->group(function () {
        Route::get('/panier', [CartController::class, 'index'])->name('cart.index'); 
        Route::post('/cart/add', [CartController::class, 'store'])->name('cart.store'); 
        Route::delete('/cart/remove', [CartController::class, 'destroy'])->name('cart.destroy'); 
    });


    Route::middleware('auth')->get('/wishlist-data', [WishlistController::class, 'getWishlist'])
    ->name('wishlist.data');

    Route::middleware('auth')->get('/library-data', [LibraryController::class, 'getLibrary'])
    ->name('library.data');



    Route::get('/cart-data', [CartController::class, 'getCart'])->name('cart.data');
    Route::get('/games-data', [GameController::class, 'getGames'])->name('games.data');


    Route::middleware(['auth'])->group(function () {

        Route::get('/finaliser-commande', [CheckoutController::class, 'index'])
            ->name('checkout.index');

        Route::post('/create-checkout-session', [CheckoutController::class, 'createCheckoutSession'])
            ->name('checkout.session');

        Route::get('/finaliser-commande/succes', [CheckoutController::class, 'success'])
            ->name('checkout.success');

        Route::get('/finaliser-commande/annuler', [CheckoutController::class, 'cancel'])
            ->name('checkout.cancel');
    });

Route::middleware('guest')->group(function () {

    Route::inertia('/inscription', 'Inscription')
        ->name('inscription');

    Route::post('/register', [RegisteredUserController::class, 'store'])
        ->name('register');

    Route::get('/connexion', function () {
        return Inertia::render('Connexion', [
            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register'),
        ]);
    })->name('connexion');

    Route::post('/login', [AuthenticatedSessionController::class, 'store'])
        ->name('login');

    Route::get('/forgot-password', [PasswordResetLinkController::class, 'create'])
        ->name('password.request');

    Route::post('/forgot-password', [PasswordResetLinkController::class, 'store'])
        ->name('password.email');

});





require __DIR__.'/auth.php';


