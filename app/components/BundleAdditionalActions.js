import React from 'react';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

const BundleAdditionalActions = ({ handleStartWathingClick, handleStopWatchingClick }) => (
  <IconMenu
    iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
    anchorOrigin={{ horizontal: 'left', vertical: 'top' }}
    targetOrigin={{ horizontal: 'left', vertical: 'top' }}
  >
    <MenuItem primaryText="Start Watching" onClick={handleStartWathingClick} />
    <MenuItem primaryText="Stop Watching" onClick={handleStopWatchingClick} />
  </IconMenu>
);

export default BundleAdditionalActions;
