import React from 'react';
import Play from 'material-ui/svg-icons/av/play-arrow';
import Stop from 'material-ui/svg-icons/av/stop';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import CircularProgress from 'material-ui/CircularProgress';

const ActionButton = props => {
  const { isActionPending, isActive, handleClick } = props;

  if (isActionPending) {
    return <CircularProgress />;
  }

  return (
    <FloatingActionButton mini disabled={isActionPending}>
      {isActive
                ?
                  <Stop onClick={handleClick} />
                :
                  <Play onClick={handleClick} />}
    </FloatingActionButton>
  );
};

export default ActionButton;
