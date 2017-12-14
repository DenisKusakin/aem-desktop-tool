import React, { Component } from 'react';
import CircularProgress from 'material-ui/CircularProgress';
import Subheader from 'material-ui/Subheader';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import BundleActionButton from './../../containers/BundleActionButtonContainer';
import VisibilityIcon from 'material-ui/svg-icons/action/visibility';
import { red500, yellow500, blue500, green200 } from 'material-ui/styles/colors';
import BundleAdditionalActions from './../../containers/BundleAdditionalActionsButtonContainer';

// import SearchResult from "./search-result.js"
// import BundleActionButton from "./../../containers/BundleActionButton.js"

const renderItem = serverId => ({ name, symbolicName, id, version, state, stateRaw, isActionPending }) => (
  <TableRow key={name}>
    <TableRowColumn style={{ width: '10%' }}>{id}</TableRowColumn>
    <TableRowColumn style={{ width: '55%' }}>
      <div>
        {/* <span style={{fontSize: 12}}>
                    { name }
                </span>
                <br/> */}
        <span style={{ fontSize: 12 }}>
          { symbolicName }
        </span>
        {/* <br/>
                <span style={{fontSize: 10}}>
                    { version }
                </span> */}
      </div>
    </TableRowColumn>
    {/* <TableRowColumn style={{width: "10%"}}>{version}</TableRowColumn>
        <TableRowColumn style={{width: "5%"}}>{category}</TableRowColumn>*/}
    <TableRowColumn style={{ width: '20%' }}>{state}</TableRowColumn>
    <TableRowColumn style={{ width: '15%' }}>
      <BundleActionButton stateRaw={stateRaw} serverId={serverId} bundleId={id} isActionPending={isActionPending} />
      <BundleAdditionalActions serverId={serverId} bundleId={id} />
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
                    {/* <TableHeaderColumn style={{width: "10%"}}>Version</TableHeaderColumn>
                        <TableHeaderColumn style={{width: "5%"}}>Category</TableHeaderColumn>*/}
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
