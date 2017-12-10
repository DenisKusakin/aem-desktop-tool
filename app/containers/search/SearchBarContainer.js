import SearchBar from 'material-ui-search-bar';
import { connect } from 'react-redux';
import { runSearch, changeQueryField } from '../../actions/index';
import searchSelector from './../../selectors/search-selector';

const mapStateToProps = (state, ownProps) => {
  let serverIds = [];
  const search = searchSelector(state, ownProps.id);

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

const mapDispatchToProps = (dispatch, ownProps) => ({
  onRequestSearch: (serverIds, q) => () => dispatch(
    runSearch(ownProps.id, ownProps.searchType)({ serverIds, q })),
  onChange: q => dispatch(changeQueryField(ownProps.id)(q))
});

const mergeProps = (stateProps, dispatchProps) => ({
  onRequestSearch: dispatchProps.onRequestSearch(stateProps.serverIds, stateProps.value),
  onChange: dispatchProps.onChange,
  value: stateProps.value
});

const SearchBarContainer = connect(mapStateToProps, mapDispatchToProps, mergeProps)(SearchBar);

export default SearchBarContainer;
