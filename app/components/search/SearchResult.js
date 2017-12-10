import React from 'react';
import Paper from 'material-ui/Paper';
import LinearProgress from 'material-ui/LinearProgress';
import ChunkNameContainer from './../../containers/ChunkNameContainer';
import LastUpdated from './../LastUpdated';

const style = {
  display: 'inline-block',
  padding: '10px',
  verticalAlign: 'top'
};

const Chunk = ({ time, id, items, total, isPending, renderList }) => (
  <Paper style={{ ...style, width: `${Math.round(100 / total)}%` }}>
    <div>{isPending && <LinearProgress mode="indeterminate" />}</div>
    <div style={{ display: 'block' }}>
      <ChunkNameContainer id={id} />
      {time && <LastUpdated time={time} /> }
    </div>
    {renderList({ items, id })}
    {/* <Bundles items={items} id={id} /> */}
  </Paper>);

const SearchResult = ({ chunks, renderList }) => (<div>
  <p>Search Result</p>
  {
      chunks.length > 0 && chunks.map(({ time, items, id, isPending }) => (
        <Chunk
          time={time}
          isPending={isPending}
          id={id}
          key={id}
          items={items}
          total={chunks.length}
          renderList={renderList}
        />))
  }
</div>);

export default SearchResult;
