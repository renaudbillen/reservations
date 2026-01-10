import users from './users'
import reservations from './reservations'
import periodicReservations from './periodicReservations'
import vacations from './vacations'

const admin = {
    users: Object.assign(users, users),
    reservations: Object.assign(reservations, reservations),
    periodicReservations: Object.assign(periodicReservations, periodicReservations),
    vacations: Object.assign(vacations, vacations),
}

export default admin