import React from 'react';
import Paper from 'material-ui/Paper';
import SearchFilter from '../containers/search/SearchFilterContainer';
import Bundles from '../containers/search/BundlesContainer';
import SearchBar from '../containers/search/SearchBarContainer';
import BottomNavigation from './../containers/search/BottomNavigationContainer';

const Search = ({ id }) => {
  if (id === 'bundles') {
    return (<div>
      <Paper>
        <SearchFilter id={id} />
        <SearchBar id={id} searchType={'bundles'} />
        <Bundles id={id} />
      </Paper>
      <BottomNavigation />
    </div>);
  } else if (id === 'components') {
    return (<div>
      <Paper>
        <SearchFilter id={id} />
        <SearchBar id={id} searchType={'components'} />
        <Bundles id={id} />
      </Paper>
      <BottomNavigation />
    </div>);
  }
  return null;
};

export default Search;
