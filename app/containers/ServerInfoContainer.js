import ServerInfo from './../components/ServerInfo.js'
import {connect} from 'react-redux'
import serverInfoSelector from './../selectors/server-info-selector.js'

const mapStateToProps = (state) => serverInfoSelector(state)

const ServerInfoContainer = connect(mapStateToProps)(ServerInfo)

export default ServerInfoContainer;
