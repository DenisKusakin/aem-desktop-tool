import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

const actions = (handleClose) => [
    <FlatButton
      label="Ok"
      primary={true}
      onClick={handleClose}
    />
  ];

const ServerInfoDialog = props => {
    
    return (
        <Dialog
            title="Server Info"
            actions={actions(props.handleClose)}
            modal={false}
            onRequestClose={props.handleClose}
            open={props.open}>
            {props.children}
        </Dialog>
    );
}

export default ServerInfoDialog;