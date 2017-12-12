import { connect } from 'react-redux';
import SearchFilter from '../../components/SearchFilter';
import { changeCheckboxState } from '../../actions/search-actions';
import searchSelector from './../../selectors/search-selector';

const mapStateToProps = reduxRoot => (state) => {
  const items = state.servers.items.map(x => ({
    title: x.name,
    id: x.id,
    checked: !!searchSelector(state, reduxRoot).checkboxes[x.id]
  }));

  return { items };
};

const mapDispatchToProps = searchId => dispatch => ({
  changeCheck: id => () => dispatch(changeCheckboxState(searchId)(id))
});

const mergeProps = (stateProps, dispatchProps) => ({
  items: stateProps.items.map(x => ({
    ...x,
    changeState: dispatchProps.changeCheck(x.id)
  }))
});

const searchFilterContainer = (reduxRoot, searchId) => connect(mapStateToProps(reduxRoot), mapDispatchToProps(searchId), mergeProps)(SearchFilter);

export default {
  ComponentsSearchFilterContainer: searchFilterContainer('componentsSearch', 'components'),
  BundlesSearchFilterContainer: searchFilterContainer('bundlesSearch', 'bundles')
}
