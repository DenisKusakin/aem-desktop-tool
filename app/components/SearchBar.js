import React from 'react';
import Paper from 'material-ui/Paper';
import SearchFilter from '../containers/search/SearchFilterContainer';
import Bundles from '../containers/search/BundlesContainer';
import SearchBar from '../containers/search/SearchBarContainer';
import BottomNavigation from './../containers/search/BottomNavigationContainer';

const Search = ({id}) => (<div>
  <Paper>
    <SearchFilter id={id} />
    <SearchBar id={id} />
    <Bundles id={id} />
  </Paper>
  <BottomNavigation />
</div>);

export default Search;
