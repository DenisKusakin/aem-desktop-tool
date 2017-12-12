import React from 'react';
import Paper from 'material-ui/Paper';
import { BundlesSearchFilterContainer } from '../../containers/search/SearchFilterContainers';
import Bundles from '../../containers/search/BundlesContainer';
import Components from '../../containers/search/ComponentsContainer';
import { BundlesSearchBarContainer } from '../../containers/search/SearchBarContainers';

const BundlesSearch = () => (<div>
  <Paper>
    <BundlesSearchFilterContainer />
    <BundlesSearchBarContainer />
    <Bundles />
  </Paper>
</div>)

export default BundlesSearch;
