import React from 'react';
import Bundles from './Bundles';
import SearchResult from './SearchResult';

const renderList = ({ items, id }) => <Bundles items={items} id={id} />;

const BundlesSearchResult = ({ chunks }) => (
  <SearchResult chunks={chunks} renderList={renderList} />);

export default BundlesSearchResult;
