import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

const actions = (submit, close) => [
    <FlatButton
        label="Save"
        primary={false}
        keyboardFocused={true}
        onClick={submit}/>,
    <FlatButton
        label="Cancel"
        primary={false}
        keyboardFocused={true}
        onClick={close}/>
]

export default props => {
    
    return (
        <Dialog
            title="New Server"
            actions={actions(props.submit, props.close)}
            modal={false}
            open={props.open}>
            {props.children}
        </Dialog>
    );
}