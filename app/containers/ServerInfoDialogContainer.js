import ServerInfoDialog from './../components/ServerInfoDialog.js'
import {connect} from 'react-redux'
import {hideServerInfoDialog} from './../actions'

const mapStateToProps = (state) => ({
    open: state.serverInfoDialog.open
})
const mapDispatchToProps = dispatch => ({
    handleClose: () => dispatch(hideServerInfoDialog())
})

const ServerInfoDialogContainer = connect(mapStateToProps, mapDispatchToProps)(ServerInfoDialog)

export default ServerInfoDialogContainer;