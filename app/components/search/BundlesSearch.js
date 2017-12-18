import React from 'react';
import Paper from 'material-ui/Paper';
import { BundlesSearchFilterContainer } from '../../containers/search/SearchFilterContainersv2';
import Bundles from '../../containers/search/BundlesContainer';
import Components from '../../containers/search/ComponentsContainer';
import { BundlesSearchBarContainer } from '../../containers/search/SearchBarContainers';

const BundlesSearch = () => (<div>
  <Paper>
    <div style={{ display: 'flex' }}>
      <div style={{ flexGrow: 0 }}><BundlesSearchFilterContainer /></div>
      <div style={{ flexGrow: 2 }}><BundlesSearchBarContainer /></div>
    </div>
    <Bundles />
  </Paper>
</div>);

export default BundlesSearch;
