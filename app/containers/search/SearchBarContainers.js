import SearchBar from 'material-ui-search-bar';
import { connect } from 'react-redux';
import { runSearch, changeQueryField } from '../../actions/index';
import searchSelector from './../../selectors/search-selector';

const mapStateToProps = reduxRoot => (state) => {
  let serverIds = [];
  const search = searchSelector(state, reduxRoot);

  Object.keys(search.checkboxes).forEach(x => {
    if (search.checkboxes[x]) {
      serverIds = [...serverIds, x];
    }
  });

  return {
    value: search.q,
    serverIds
  };
};

const mapDispatchToProps = searchId => (dispatch) => ({
  onRequestSearch: (serverIds, q) => () => dispatch(
    runSearch(searchId, searchId)({ serverIds, q })),
    onChange: q => dispatch(changeQueryField(searchId)(q))
});

const mergeProps = (stateProps, dispatchProps) => ({
  onRequestSearch: dispatchProps.onRequestSearch(stateProps.serverIds, stateProps.value),
  onChange: dispatchProps.onChange,
  value: stateProps.value
});

const searchBarContainer = (reduxRoot, searchId) => connect(mapStateToProps(reduxRoot), mapDispatchToProps(searchId), mergeProps)(SearchBar);

export default {
  BundlesSearchBarContainer: searchBarContainer('bundlesSearch', 'bundles'),
  ComponentsSearchBarContainer: searchBarContainer('componentsSearch', 'components')
}
