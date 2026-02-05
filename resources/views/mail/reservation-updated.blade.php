<x-mail::message>
<h1>Modification de votre réservation</h1>

Cher(e) {{ $reservation->forUser->name }},

Votre réservation a été modifiée. Voici les nouveaux détails de votre réservation :

<strong>Nouveaux détails de la réservation :</strong>
- <strong>Cabinet :</strong> {{ $reservation->room->name }}
- <strong>Date :</strong> {{ \Carbon\Carbon::parse($reservation->reservation_date)->locale('fr')->isoFormat('dddd D MMMM YYYY') }}
- <strong>Période :</strong> {{ $reservation->reservation_period === 'AM' ? 'Matin' : 'Après-midi' }}
- <strong>Réservation faite par :</strong> {{ $reservation->byUser->name }}

Pour accéder à votre espace et gérer vos réservations, veuillez cliquer sur le bouton ci-dessous :

<x-mail::button :url="route('admin.reservations.index')">
Voir mes réservations
</x-mail::button>

<x-mail::alert>
    <strong>Note :</strong> Si vous n'avez pas demandé cette modification, veuillez contacter l'administrateur.
</x-mail::alert>

Cordialement, <br>
L'équipe du Centre-étoile

</x-mail::message>
