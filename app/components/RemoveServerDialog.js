import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

const actions = (handleYes, handleClose) => [
    <FlatButton
      label="Yes"
      primary={true}
      onClick={handleYes}
    />,
    <FlatButton
        label="Cancel"
        onClick={handleClose}
    />
  ];

const RemoveServerConfirmation = props => (
    <Dialog
        title="Are you sure you want to delete server?"
        actions={actions(props.handleYes, props.handleClose)}
        modal={true}
        open={props.open}>
        <p>Please confirm</p>
    </Dialog>
);

export default RemoveServerConfirmation;