import { connect } from 'react-redux'
import NewServer from "./../components/NewServer.js"
import { reduxForm } from 'redux-form'
import {saveNewServer} from "./../actions";

const mapDispatchToProps = dispatch => {
    return {
        add: ({name, host, login, password}) => dispatch(saveNewServer({name, host, login, password}))
    }
}

export default connect( () => ({}), mapDispatchToProps )(reduxForm({form: 'newServer'})(NewServer))