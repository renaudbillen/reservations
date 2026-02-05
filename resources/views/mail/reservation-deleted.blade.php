<x-mail::message>
<h1>Annulation de votre réservation</h1>

Cher(e) {{ $reservation->forUser->name }},

Votre réservation a été annulée. Voici les détails de la réservation qui a été supprimée :

<strong>Détails de la réservation annulée :</strong>
- <strong>Cabinet :</strong> {{ $reservation->room->name }}
- <strong>Date :</strong> {{ \Carbon\Carbon::parse($reservation->reservation_date)->locale('fr')->isoFormat('dddd D MMMM YYYY') }}
- <strong>Période :</strong> {{ $reservation->reservation_period === 'AM' ? 'Matin' : 'Après-midi' }}
- <strong>Réservation faite par :</strong> {{ $reservation->byUser->name }}

Pour accéder à votre espace et gérer vos réservations, veuillez cliquer sur le bouton ci-dessous :

<x-mail::button :url="route('admin.reservations.index')">
Voir mes réservations
</x-mail::button>

<x-mail::alert>
    <strong>Note :</strong> Si vous n'avez pas demandé cette annulation, veuillez contacter l'administrateur.
</x-mail::alert>

Cordialement, <br>
L'équipe du Centre-étoile

</x-mail::message>
