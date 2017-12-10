import { connect } from 'react-redux'
import AppBar from 'material-ui/AppBar';
import {showDrawer} from "./../actions";

// let mapStateToProps = state => ({
//     title: "AEM Tool"
// })

let mapDispatchToProps = dispatch => ({
    onLeftIconButtonTouchTap: () => dispatch(showDrawer())
})

const AppBarContainer = connect(null, mapDispatchToProps)(AppBar)

export default AppBarContainer