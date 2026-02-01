<x-mail::message>
<h1>Nouvelle réservation</h1>

Une nouvelle réservation a été effectuée sur la plateforme. Voici les détails :

<strong>Détails de la réservation :</strong>
- <strong>Cabinet :</strong> {{ $reservation->room->name }}
- <strong>Date :</strong> {{ \Carbon\Carbon::parse($reservation->reservation_date)->locale('fr')->isoFormat('dddd D MMMM YYYY') }}
- <strong>Période :</strong> {{ $reservation->reservation_period === 'AM' ? 'Matin' : 'Après-midi' }}
- <strong>Réservation faite par :</strong> {{ $reservation->byUser->name }}
- <strong>Réservation pour :</strong> {{ $reservation->forUser->name }}

Pour gérer cette réservation, veuillez cliquer sur le bouton ci-dessous :

<x-mail::button :url="route('admin.reservations.index')">
Gérer les réservations
</x-mail::button>

Cordialement, <br>
L'équipe du Centre-étoile

</x-mail::message>
