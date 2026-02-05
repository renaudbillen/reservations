<x-mail::message>
<h1>Réservation annulée</h1>

Cher(e) administrateur,

Une réservation a été annulée dans le système. Voici les détails :

<strong>Détails de la réservation annulée :</strong>
- <strong>Cabinet :</strong> {{ $reservation->room->name }}
- <strong>Date :</strong> {{ \Carbon\Carbon::parse($reservation->reservation_date)->locale('fr')->isoFormat('dddd D MMMM YYYY') }}
- <strong>Période :</strong> {{ $reservation->reservation_period === 'AM' ? 'Matin' : 'Après-midi' }}
- <strong>Réservation faite par :</strong> {{ $reservation->byUser->name }}
- <strong>Réservation pour :</strong> {{ $reservation->forUser->name }}

Pour accéder au panneau d'administration et gérer les réservations, veuillez cliquer sur le bouton ci-dessous :

<x-mail::button :url="route('admin.reservations.index')">
Gérer les réservations
</x-mail::button>

Cordialement, <br>
Système de réservations - Centre-étoile

</x-mail::message>
