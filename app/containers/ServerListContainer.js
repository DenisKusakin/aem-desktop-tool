import { connect } from 'react-redux'
import ServerList from '../components/ServerList'
import {showNewServerForm, removeServer, showServerInfoDialog, deleteServerIntent} from './../actions'

let mapStateToProps = state => ({
    items: state.servers.items
})

let mapDispatchToProps = dispatch => ({
    onAddClick: () => dispatch(showNewServerForm()),
    removeServer: id => dispatch(deleteServerIntent(id)),
    showInfo: id => dispatch(showServerInfoDialog(id))
})

const ServerListContainer = connect(mapStateToProps, mapDispatchToProps)(ServerList)

export default ServerListContainer