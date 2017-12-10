import Notifications from 'react-notification-system-redux'
import {connect} from 'react-redux'

const NotificationsContainer = connect( state => ({notifications: state.notifications}) )(Notifications)

export default NotificationsContainer