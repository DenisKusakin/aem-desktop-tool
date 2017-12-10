import RemoveServerDialog from './../components/RemoveServerDialog.js'
import {connect} from 'react-redux'
import {removeServer, hideDeleteServerForm} from './../actions'

const mapStateToProps = state => ({
    open: !(state.removeServerDialog.id === null),
    id: state.removeServerDialog.id
})

const mapDispatchToProps = dispatch => ({
    handleYes: id => () => dispatch(removeServer(id)),
    handleClose: () => dispatch(hideDeleteServerForm())
})

const mergeProps = (stateProps, dispatchProps) => ({
    open: stateProps.open,
    handleYes: dispatchProps.handleYes(stateProps.id),
    handleClose: dispatchProps.handleClose
})

const RemoveServerDialogContainer = connect(mapStateToProps, mapDispatchToProps, mergeProps)(RemoveServerDialog)

export default RemoveServerDialogContainer