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
            'firstName'   => ['sometimes', 'string', 'max:255'],
            'lastName'    => ['sometimes', 'string', 'max:255'],
            'dateOfBirth' => ['sometimes', 'date'],
            'country'     => ['sometimes', 'string', 'max:255'],
            'username'    => [
                'sometimes',
                'string',
                'max:255',
                'unique:users,username,' . auth()->id(),
            ],
            'email'       => [
                'sometimes',
                'email',
                'max:255',
                'unique:users,email,' . auth()->id(),
            ],
            'image'       => ['nullable', 'string', 'max:255'],
        ];
    }
    

}
