import React from 'react';
import Dialog from 'material-ui/Dialog';
import SearchBar from 'material-ui-search-bar';
import { List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';

const SearchDialog = () => (
  <Dialog open>
    <SearchBar />
    <List>
      <Subheader>General</Subheader>
      <ListItem
        primaryText="Profile photo"
        secondaryText="Change your Google+ profile photo"
      />
      <ListItem
        primaryText="Show your status"
        secondaryText="Your status is visible to everyone you use with"
      />
    </List>
    <Divider />
  </Dialog>
);

export default SearchDialog;
