<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    /**
     * Display the user's profile form.
     */
    public function edit(Request $request): Response
    {
        return Inertia::render('Profile/Edit', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        // Log pour déboguer
        \Log::info('Données reçues pour la mise à jour du profil :', $request->all());
    
        // Récupère les champs validés (incluant "image" s'il est présent)
        $validatedData = $request->validated();
    
        // Met à jour l'utilisateur avec les champs validés
        $request->user()->fill($validatedData);
    
        // Si l'email a changé, invalider la vérification
        if ($request->user()->isDirty('email')) {
            $request->user()->email_verified_at = null;
        }
    
        // Sauvegarde en BD
        $request->user()->save();
    
        return Redirect::route('profile.edit')->with('status', 'Profil mis à jour avec succès.');
    }
    

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }
}
