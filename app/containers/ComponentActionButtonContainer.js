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
    isActive: !isDisabled
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  const arg = { serverId: ownProps.serverId, componentId: ownProps.componentId };
  const handleClick = isDisabled => () => dispatch(isDisabled ? startComponent(arg) : stopComponent(arg))
  return {
    handleClick
  };
};

const mergeProps = (stateProps, dispatchProps) => {
  return {
    isActionPending: stateProps.isActionPending,
    isActive: stateProps.isActive,
    handleClick: dispatchProps.handleClick(stateProps.isDisabled)
  }
}

const ComponentActionButtonContainer = connect(mapStateToProps, mapDispatchToProps, mergeProps)(ActionButton);

export default ComponentActionButtonContainer;
