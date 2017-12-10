import Drawer from 'material-ui/Drawer';
import { connect } from 'react-redux'
import {hideDrawer} from "./../actions/index.js"
import React from 'react'

const mapStateToProps = (state) => ({
    open: state.servers.drawerOpen
})

const mapDispatchToProps = (dispatch) => ({
    onRequestChange: () => dispatch(hideDrawer())
})

export default connect(mapStateToProps, mapDispatchToProps)(Drawer)