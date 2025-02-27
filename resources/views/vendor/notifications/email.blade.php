<x-mail::message>
{{-- Logo Section --}}


{{-- Greeting --}}




{{-- Intro Lines --}}
@foreach ($introLines as $line)
{{ $line }}
@endforeach

{{-- Action Button --}}
@isset($actionText)
<?php
    $color = match ($level) {
        'success', 'error' => $level,
        default => 'primary',
    };
?>
<x-mail::button :url="$actionUrl" :color="$color">
Réinitialiser mon mot de passe
</x-mail::button>
@endisset

{{-- Outro Lines --}}
@foreach ($outroLines as $line)
{{ $line }}
@endforeach


{{-- Salutation --}}
Cordialement,<br>
L’équipe de **QTs Montréal**

{{-- Subcopy --}}
<x-slot:subcopy>
Si vous avez du mal à cliquer sur le bouton "Réinitialiser mon mot de passe", copiez et collez l'URL ci-dessous dans votre navigateur :
<span class="break-all">[{{ $displayableActionUrl }}]({{ $actionUrl }})</span>

<p>Besoin d’aide ? Contactez-nous à <a href="mailto:qtsmontreal@gmail.com">qtsmontreal@gmail.com</a>.</p>
</x-slot:subcopy>
</x-mail::message>
