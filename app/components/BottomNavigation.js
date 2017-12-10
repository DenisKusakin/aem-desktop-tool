import React, { Component } from 'react';
import FontIcon from 'material-ui/FontIcon';
import { BottomNavigation, BottomNavigationItem } from 'material-ui/BottomNavigation';

const bundlesIcon = <FontIcon className="material-icons">bundles</FontIcon>;

const BottomNav = ({ items, selectedIndex }) => {
  if (items.length > 0) {
    return (<BottomNavigation style={{ bottom: 0 }} selectedIndex={selectedIndex}>
      {
        items.map(x => (
          <BottomNavigationItem
            label={x.label}
            icon={bundlesIcon}
            key={x.id}
            onClick={x.handleClick}
          />)
        )
      }
    </BottomNavigation>);
  }
  return null;
};


export default BottomNav;
