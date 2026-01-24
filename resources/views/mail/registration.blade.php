<x-mail::message>
<h1>Bienvenue sur notre plateforme de réservation</h1>

Cher(e) {{ $user->name }},


Voici vos informations de connexion :
- <strong>Email :</strong> {{ $user->email }}
- <strong>Mot de passe :</strong> {{ $password }}

Pour accéder à votre espace personnel, veuillez cliquer sur le bouton ci-dessous :

<x-mail::button :url="route('login')">
Me connecter à mon compte
</x-mail::button>

<x-mail::alert>
    <strong>Pour des raisons de sécurité</strong>, nous vous recommandons de changer votre mot de passe après votre première connexion.
</x-mail::alert>

Cordialement, <br>
L'équipe du Centre-étoile

</x-mail::message>
