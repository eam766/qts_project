<?php

namespace App\Http\Requests;

use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ProfileUpdateRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules()
{
    return [
        'firstName' => ['required', 'string', 'max:255'],
        'lastName' => ['required', 'string', 'max:255'],
        'image' => ['nullable', 'string', 'max:255','url'],
        'dateOfBirth' => ['nullable', 'date'],
        'country' => ['nullable', 'string', 'max:255'],
        'username' => ['required', 'string', 'max:255', 'unique:users,username,'.auth()->id()],
        'email' => ['required', 'email', 'max:255', 'unique:users,email,'.auth()->id()],
    ];
}

}
