import {List, ListItem} from 'material-ui/List';
import ActionInfo from 'material-ui/svg-icons/action/info';
import React, {PropTypes} from "react";
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import {statusText, statusColor} from "./utils/helpers.js"

import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import {grey400, red500} from 'material-ui/styles/colors'
import LastUpdated from "./LastUpdated.js"
import LinearProgress from 'material-ui/LinearProgress';

const iconButtonElement = (
  <IconButton
    touch={true}
    tooltip="more"
    tooltipPosition="bottom-left">
    <MoreVertIcon color={grey400} />
  </IconButton>
);

const rightIconMenu = ({deleteFunc, showInfo}) => (
    <IconMenu iconButtonElement={iconButtonElement}>
        <MenuItem onClick={showInfo}>Info</MenuItem>
        <MenuItem onClick={deleteFunc}>Delete</MenuItem>
    </IconMenu>
);

class ServerList extends React.Component{

    constructor(props){
        super(props);
        let onRemoveClick = id => () => props.removeServer(id);
        let onInfoClick = id => () => props.showInfo(id);
        const infoText = (text, color, time) => (<p><span style={{color}}>{text}</span> <LastUpdated time={time}/> <br /></p>)
        this.renderItem = item => {
            if(item.lastStatus && !!item.lastStatus.error){
                return (<ListItem
                    rightIconButton={rightIconMenu( {deleteFunc: onRemoveClick(item.id), showInfo: onInfoClick(item.id)} )}
                    primaryText={item.name}
                    secondaryText={infoText("ERROR", red500, item.lastStatus.time)}
                    secondaryTextLines={1}
                  />);
            }
            let color = item.lastStatus ? statusColor(item.lastStatus.statusCode) : undefined;
            let text = item.lastStatus ? statusText(item.lastStatus.statusCode) : undefined;
            let time = item.lastStatus ? item.lastStatus.time : undefined;

            let secondaryText = color && text ? infoText(text, color, time) : <div><LinearProgress mode="indeterminate"/></div>;

            return (<ListItem
                  rightIconButton={rightIconMenu( {deleteFunc: onRemoveClick(item.id), showInfo: onInfoClick(item.id)} )}
                  primaryText={item.name}
                  secondaryText={secondaryText}
                  secondaryTextLines={1}
                />);
        }
    }

    render(){
        return  (
            <div>
                <List>
                    {this.props.items && this.props.items.map(x => {
                        let item = this.renderItem(x)
                        return <div key={x.id}>{item}</div>
                    })}
                </List>
                <FloatingActionButton onClick={this.props.onAddClick} mini={true} secondary={true} style={{marginLeft: 20}}>
                    <ContentAdd />
                </FloatingActionButton>
            </div>
        )
    }
}

export default ServerList;