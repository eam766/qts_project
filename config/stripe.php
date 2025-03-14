<?php
// 1. Installez le package Stripe PHP via Composer:
// composer require stripe/stripe-php

// 2. Ajoutez vos clés Stripe dans le fichier .env:
// STRIPE_KEY=votre_clé_publique
// STRIPE_SECRET=votre_clé_secrète

// 3. Créez un fichier de configuration config/stripe.php
namespace App\Config;

return [
    'key' => env('STRIPE_KEY', ''),
    'secret' => env('STRIPE_SECRET', ''),
    'webhook' => [
        'secret' => env('STRIPE_WEBHOOK_SECRET', ''),
        'tolerance' => env('STRIPE_WEBHOOK_TOLERANCE', 300),
    ],
];
