<?php
namespace App\Http\Controllers;

use App\Models\Library;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class LibraryController extends Controller
{
    public function index()
    {
        $user = Auth::user();

        // On charge la relation 'game'
        $libraryEntries = $user->library()->with('game')->get();

        return Inertia::render('Library', [
            'libraryEntries' => $libraryEntries,
        ]);
    }
}