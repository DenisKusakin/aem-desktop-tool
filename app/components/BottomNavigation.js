import React from 'react';
import FontIcon from 'material-ui/FontIcon';
import { BottomNavigation, BottomNavigationItem } from 'material-ui/BottomNavigation';

const bundlesIcon = label => <FontIcon className="material-icons">{label}</FontIcon>;

const BottomNav = ({ handleClick, selectedIndex }) => (
  <BottomNavigation style={{ bottom: 0 }} selectedIndex={selectedIndex}>
    <BottomNavigationItem
      label={'Bundles'}
      icon={bundlesIcon('Bundles')}
      onClick={handleClick(0)}/>
    <BottomNavigationItem
      label={'Components'}
      icon={bundlesIcon('Components')}
      onClick={handleClick(1)}/>
  </BottomNavigation>);

export default BottomNav;
