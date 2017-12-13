import React from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import BundlesSearch from './search/BundlesSearch';
import ComponentsSearch from './search/ComponentsSearch';

const TabsNavigation = ({ value, handleClick }) => (
  <Tabs
    value={value}
    onChange={handleClick}
  >
    <Tab label='Bundles' value='bundles'>
      <BundlesSearch />
    </Tab>
    <Tab label='Components' value='components'>
      <ComponentsSearch />
    </Tab>
  </Tabs>
)

export default TabsNavigation;
