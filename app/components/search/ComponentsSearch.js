import React from 'react';
import Paper from 'material-ui/Paper';
import { ComponentsSearchFilterContainer } from '../../containers/search/SearchFilterContainers';
import Bundles from '../../containers/search/BundlesContainer';
import Components from '../../containers/search/ComponentsContainer';
import { ComponentsSearchBarContainer } from '../../containers/search/SearchBarContainers';

const ComponentsSearch = () => (<div>
  <Paper>
    <ComponentsSearchFilterContainer />
    <ComponentsSearchBarContainer />
    <Components />
  </Paper>
</div>);

export default ComponentsSearch;
