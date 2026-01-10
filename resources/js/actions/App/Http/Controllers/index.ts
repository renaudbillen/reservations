import Api from './Api'
import UserController from './UserController'
import ReservationController from './ReservationController'
import PeriodicReservationController from './PeriodicReservationController'
import VacationController from './VacationController'
import Settings from './Settings'

const Controllers = {
    Api: Object.assign(Api, Api),
    UserController: Object.assign(UserController, UserController),
    ReservationController: Object.assign(ReservationController, ReservationController),
    PeriodicReservationController: Object.assign(PeriodicReservationController, PeriodicReservationController),
    VacationController: Object.assign(VacationController, VacationController),
    Settings: Object.assign(Settings, Settings),
}

export default Controllers