import React from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

const SearchFilter = ({ items, changeState }) => (
  <SelectField
    multiple
    hintText="Select a server"
    value={items.filter(x => x.checked).map(x => x.id)}
    onChange={(event, newIndex, values) => changeState(values)}
  >
    {
      items.map(({ id, title, checked }) => (<MenuItem
        key={id}
        insetChildren
        checked={checked}
        value={id}
        primaryText={title}
      />))
    }
  </SelectField>
);

export default SearchFilter;
