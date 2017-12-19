import React from 'react';
import { List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';

const SearchDialogList = props => (
  <List>
    <Subheader>Bundles</Subheader>
    <ListItem
      primaryText="Profile photo"
      secondaryText="Change your Google+ profile photo"
    />
    <ListItem
      primaryText="Show your status"
      secondaryText="Your status is visible to everyone you use with"
    />
    <Divider />
    <Subheader>Components</Subheader>
    <ListItem
      primaryText="Profile photo"
      secondaryText="Change your Google+ profile photo"
    />
    <ListItem
      primaryText="Show your status"
      secondaryText="Your status is visible to everyone you use with"
    />
  </List>
);

export default SearchDialogList;
