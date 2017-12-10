import { connect } from 'react-redux';
import SearchFilter from '../../components/SearchFilter';
import { changeCheckboxState } from '../../actions/search-actions';
import searchSelector from './../../selectors/search-selector';

const mapStateToProps = (state, ownProps) => {
  const items = state.servers.items.map(x => ({
    title: x.name,
    id: x.id,
    checked: !!searchSelector(state, ownProps.id).checkboxes[x.id]
  }));

  return { items };
};

const mapDispatchToProps = dispatch => ({
  changeCheck: searchId => id => () => dispatch(changeCheckboxState(searchId)(id))
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  items: stateProps.items.map(x => ({
    ...x,
    changeState: dispatchProps.changeCheck(ownProps.id)(x.id)
  }))
});

const SearchFilterContainer = connect(mapStateToProps, mapDispatchToProps, mergeProps)(SearchFilter);

export default SearchFilterContainer;
