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
            'firstName' => [
                'sometimes',
                'string',
                'max:255',
                'regex:/^[A-Za-zÀ-ÖØ-öø-ÿ\s-]+$/', 
            ],
            'lastName' => [
                'sometimes',
                'string',
                'max:255',
                'regex:/^[A-Za-zÀ-ÖØ-öø-ÿ\s-]+$/',
            ],
            'dateOfBirth' => [
                'sometimes',
                'date',
                'after_or_equal:' . now()->subYears(100)->format('d-m-Y'),
                'before_or_equal:' . now()->subYears(11)->format('d-m-Y'),
            ],
            'country' => [
                'sometimes',
                'string',
                'max:255',
            ],
            'username' => [
                'sometimes',
                'string',
                'max:255',
                'unique:users,username,' . auth()->id(),
            ],
            'email' => [
                'sometimes',
                'email',
                'max:255',
                'unique:users,email,' . auth()->id(),
            ],
            'description' => [
                'nullable',
                'string',
                'max:255',
            ],
            'image' => [
                'nullable',
                'string',
                'max:255',
            ],
        ];
    }


}
