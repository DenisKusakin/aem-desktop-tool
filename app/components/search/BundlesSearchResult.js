import React from 'react';
import Paper from 'material-ui/Paper';
import LinearProgress from 'material-ui/LinearProgress';
import ChunkNameContainer from './../../containers/ChunkNameContainer';
import LastUpdated from './../LastUpdated';
import Bundles from './Bundles';

const style = {
  display: 'inline-block',
  padding: '10px',
  verticalAlign: 'top'
};

const Chunk = ({ time, id, items, total, isPending }) => (<Paper style={{ ...style, width: `${Math.round(100 / total)}%` }}>
  <div>{isPending && <LinearProgress mode="indeterminate" />}</div>
  <div style={{ display: 'block' }}>
    <ChunkNameContainer id={id} />
    {time && <LastUpdated time={time} /> }
  </div>
  <Bundles items={items} id={id} />
</Paper>);

const BundlesSearchResult = ({ chunks }) => (<div>
  <p>Search Result</p>
  {
        chunks.length > 0 && chunks.map(({ time, items, id, isPending }) => <Chunk time={time} isPending={isPending} id={id} key={id} items={items} total={chunks.length} />)
    }
</div>);

export default BundlesSearchResult;
