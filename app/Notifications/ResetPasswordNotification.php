<?php

namespace App\Notifications;

use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Auth\Notifications\ResetPassword as BaseResetPassword;

class ResetPasswordNotification extends BaseResetPassword
{
    public function toMail($notifiable)
    {
        $resetUrl = url(route('password.reset', [
            'token' => $this->token,
            'email' => $notifiable->email
        ], false));

        return (new MailMessage)
            ->subject('🔒 Réinitialisation de votre mot de passe')
            ->greeting('Bonjour ' . $notifiable->name . ',')
            ->line("Nous avons reçu une demande de réinitialisation de votre mot de passe.")
            ->action('Réinitialiser mon mot de passe', $resetUrl)
            ->line("Ce lien de réinitialisation de mot de passe expirera en 60 minutes.\nSi vous n'avez pas fait cette demande, ignorez simplement cet email.")
            ->salutation('L’équipe de QTs Montréal');
    }
}
