import users from './users'
import vacations from './vacations'

const admin = {
    users: Object.assign(users, users),
    vacations: Object.assign(vacations, vacations),
}

export default admin