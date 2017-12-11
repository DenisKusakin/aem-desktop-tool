import React from 'react';
import FontIcon from 'material-ui/FontIcon';
import { BottomNavigation, BottomNavigationItem } from 'material-ui/BottomNavigation';

const bundlesIcon = label => <FontIcon className="material-icons">{label}</FontIcon>;

const BottomNav = ({ items, selectedIndex }) => {
  if (items.length > 0) {
    return (<BottomNavigation style={{ bottom: 0 }} selectedIndex={selectedIndex}>
      {
        items.map(x => (
          <BottomNavigationItem
            label={x.label}
            icon={bundlesIcon(x.label)}
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
