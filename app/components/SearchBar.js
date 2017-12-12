import React from 'react';
import BundlesSearch from './search/BundlesSearch';
import ComponentsSearch from './search/ComponentsSearch';
import BottomNavigation from './../containers/search/BottomNavigationContainer';

const Search = ({ currentIndex }) => {
  if(currentIndex === 0){
    return [<BundlesSearch key={0} />, <BottomNavigation key={1} />];
  } else if(currentIndex === 1){
    return [<ComponentsSearch key={0} />, <BottomNavigation key={1} />];
  }

  return null;
};

export default Search;
