import { connect } from 'react-redux';
import ActionButton from './../components/ActionButton';
import { startComponent, stopComponent } from '../actions/components-actions';

const mapStateToProps = (state, ownProps) => {
  const components = state.components[ownProps.serverId].items
  const component = components.find(x => x.id === ownProps.componentId)
  const isDisabled = component.stateRaw === -1
  return {
    isActionPending: component.isActionPending,
    isDisabled,
    isActive: !isDisabled,
    actionId: component.actionId
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  const handleClick = (actionId, isDisabled) => {
    const arg = { serverId: ownProps.serverId, componentId: actionId };
    return () => dispatch(isDisabled ? startComponent(arg) : stopComponent(arg))
  }
  return {
    handleClick
  };
};

const mergeProps = (stateProps, dispatchProps) => {
  return {
    isActionPending: stateProps.isActionPending,
    isActive: stateProps.isActive,
    handleClick: dispatchProps.handleClick(stateProps.actionId, stateProps.isDisabled)
  }
}

const ComponentActionButtonContainer = connect(mapStateToProps, mapDispatchToProps, mergeProps)(ActionButton);

export default ComponentActionButtonContainer;
