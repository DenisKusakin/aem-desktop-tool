import { connect } from 'react-redux';
import ActionButton from './../components/BundleAdditionalActions';
import { bundleStartWatching, bundleStopWatching } from '../actions/bundle-additional-actions';

const mapDispatchToProps = (dispatch, ownProps) => {
  const arg = { serverId: ownProps.serverId, bundleId: ownProps.bundleId };

  return {
    handleStartWathingClick: () => dispatch(bundleStartWatching(arg)),
    handleStopWatchingClick: () => dispatch(bundleStopWatching(arg))
  };
};

const BundleAdditionalActionButtonContainer = connect(null, mapDispatchToProps)(ActionButton);

export default BundleAdditionalActionButtonContainer;
