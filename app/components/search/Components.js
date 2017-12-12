import React, { Component } from 'react';
import CircularProgress from 'material-ui/CircularProgress';
import Subheader from 'material-ui/Subheader';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import ComponentActionButton from './../../containers/ComponentActionButtonContainer';

const renderItem = serverId => ({ name, id, _id, state, stateRaw, isActionPending }) => (
  <TableRow key={name}>
    <TableRowColumn style={{ width: '10%' }}>{_id}</TableRowColumn>
    <TableRowColumn style={{ width: '55%' }}>
      <div>
        <span style={{ fontSize: 12 }}>
          { name }
        </span>
      </div>
    </TableRowColumn>
    <TableRowColumn style={{ width: '20%' }}>{state}</TableRowColumn>
    <TableRowColumn style={{ width: '15%' }}>
      <ComponentActionButton serverId={serverId} componentId={id} />
    </TableRowColumn>
  </TableRow>
);

const BundlesTable = ({ items, id }) => (
        items.length > 0
            ?
              <Table

                showCheckboxes={false}
              >
                <TableHeader
                  displaySelectAll={false}
                  adjustForCheckbox={false}
                  enableSelectAll={false}
                >
                  <TableRow>
                    <TableHeaderColumn style={{ width: '10%' }}>ID</TableHeaderColumn>
                    <TableHeaderColumn style={{ width: '55%' }}>Name</TableHeaderColumn>
                    <TableHeaderColumn style={{ width: '20%' }}>Status</TableHeaderColumn>
                    <TableHeaderColumn style={{ width: '15%' }}>Actions</TableHeaderColumn>
                  </TableRow>
                </TableHeader>
                <TableBody displayRowCheckbox={false} stripedRows>
                  {items.map(renderItem(id))}
                </TableBody>
              </Table>
            :
              <span>Empty</span>
    );

export default BundlesTable;
