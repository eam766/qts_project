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

        $libraryEntries = $user->library()->with('game')->get();

        return Inertia::render('Library', [
            'libraryEntries' => $libraryEntries,
        ]);
    }


    public function getLibrary()
{
    $user = auth()->user();
    $libraryEntries = $user ? $user->library()->pluck('game_id') : collect();

    return response()->json([
        'libraryEntries' => $libraryEntries
    ]);
}
}