import ChunkName from './../components/search/ChunkName.js'
import {connect} from 'react-redux'
import {serverById} from './../selectors/servers-selectors.js'

const mapStateToProps = (state, ownProps) => {
    let server = serverById(state)(ownProps.id)
    return {
        name: server ? server.name : null
    }
}

const ChunkNameContainer = connect(mapStateToProps)(ChunkName)

export default ChunkNameContainer