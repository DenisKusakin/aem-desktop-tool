import React from 'react'
import { connect } from 'react-redux'
import Dialog from "./../components/Dialog.js"
import { reduxForm } from 'redux-form'
import {hideNewServerForm} from "./../actions";
import NewServer from "./NewServer.js"
import { submit } from 'redux-form'

let mapStateToProps = state => ({open: state.newServerFormVisible})
let mapDispatchToProps = dispatch => ({
    submit: () => dispatch(submit("newServer")),
    close: () => dispatch(hideNewServerForm())
})

const NewServerDialog = props => (
    <Dialog {...props}>
        <NewServer/>
    </Dialog>
)

export default connect(mapStateToProps, mapDispatchToProps)(NewServerDialog)