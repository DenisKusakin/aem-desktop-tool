import React from 'react';
import Components from './Components';
import SearchResult from './SearchResult';

const renderList = ({ items, id }) => <Components items={items} id={id} />;

const BundlesSearchResult = ({ chunks }) => (
  <SearchResult chunks={chunks} renderList={renderList} />);

export default BundlesSearchResult;
