<?php
 
namespace App\Http\Controllers\Auth;
 
use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
 
class RegisteredUserController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'firstName' => 'required|string|max:255',
            'lastName' => 'required|string|max:255',
            'username' => 'required|string|max:255|unique:users',
            'country' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8',
            'dateOfBirth' => 'required|date',
            'termsCondition' => 'required|accepted',
        ]);
 
        $user = User::create([
            'firstName' => $request->firstName,
            'lastName' => $request->lastName,
            'username' => $request->username,
            'country' => $request->country,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'dateOfBirth' => $request->dateOfBirth,
            'infolettre' => $request->infolettre,
            'termsCondition' => $request->termsCondition,
            'image' => $request->image ?? null, // Optional profile image
        ]);
 
        return redirect('/connexion');

    }
}