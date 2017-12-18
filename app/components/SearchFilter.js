import React from 'react';
import Checkbox from 'material-ui/Checkbox';

const SearchFilter = ({ items }) => {
  const renderCheckbox = ({ title, id, checked, changeState }) => (<Checkbox
    label={title}
    key={id}
    onCheck={changeState}
    checked={checked}
  />);

  return (<div>
    {items.map(renderCheckbox)}
  </div>);
};

export default SearchFilter;
