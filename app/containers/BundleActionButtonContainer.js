import { connect } from 'react-redux';
import ActionButton from './../components/ActionButton';
import { startBundle, stopBundle } from '../actions/bundles-actions';

const mapStateToProps = (state, ownProps) => ({
  isActionPending: ownProps.isActionPending
});

const mapDispatchToProps = (dispatch, ownProps) => {
  const arg = { serverId: ownProps.serverId, bundleId: ownProps.bundleId };
  const actionCreator = ownProps.stateRaw === 32 ? stopBundle : startBundle;
  return {
    handleClick: () => dispatch(actionCreator(arg)),
    isActive: ownProps.stateRaw === 32
  };
};

const BundleActionButtonContainer = connect(mapStateToProps, mapDispatchToProps)(ActionButton);

export default BundleActionButtonContainer;
