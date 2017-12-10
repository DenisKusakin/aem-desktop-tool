// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './Home.css';
import AppBar from '../containers/AppBar';
import Drawer from '../containers/Drawer';
import ServerList from '../containers/ServerListContainer';
import NewServerDialog from '../containers/NewServerDialog';
import ServerInfoDialog from '../containers/ServerInfoDialogContainer';
import RemoveServerDialogContainer from '../containers/RemoveServerDialogContainer';
import ServerInfo from '../containers/ServerInfoContainer';
import Notifications from '../containers/Notifications';
import SearchBar from './../containers/search/SearchContainer';

export default class Home extends Component {

  componentDidMount() {
    this.props.fetchData && this.props.fetchData();
  }

  render() {
    return (
      <div>
        <AppBar title="AEM Tool" />
        <Drawer docked={false} width={300}>
          <ServerList />
        </Drawer>

        <SearchBar />

        <Notifications />
        <NewServerDialog />
        <ServerInfoDialog>
          <ServerInfo />
        </ServerInfoDialog>
        <RemoveServerDialogContainer />
      </div>
    );
  }
}
