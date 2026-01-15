import UserController from './UserController'
import VacationController from './VacationController'

const Api = {
    UserController: Object.assign(UserController, UserController),
    VacationController: Object.assign(VacationController, VacationController),
}

export default Api