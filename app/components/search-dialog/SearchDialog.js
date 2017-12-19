import React from 'react';
import Dialog from 'material-ui/Dialog';
import SearchBar from 'material-ui-search-bar';
import { List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import SearchDialogList from './SearchDialogList';

const SearchDialog = ({ open }) => (
  <Dialog open={open}>
    <SearchBar />
    <SearchDialogList />
    <Divider />
  </Dialog>
);

export default SearchDialog;
