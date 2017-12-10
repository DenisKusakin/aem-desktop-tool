import { connect } from 'react-redux';
import BottomNavigation from '../../components/BottomNavigation';
import { changeBottomNavigation } from './../../actions/search-actions';

const mapStateToProps = state => {
  const search = state.search;
  if (!search) {
    return { items: [] };
  }
  return {
    items: search.items.map(({ id, label }) => ({ id, label })),
    selectedIndex: search.current
  };
};

const mapDispatchToProps = dispatch => ({
  handleClick: newIndex => () => dispatch(changeBottomNavigation(newIndex))
});

const mergeProps = (stateProps, dispatchProps) => ({
  selectedIndex: stateProps.selectedIndex,
  items: stateProps.items.map((x, index) => ({ ...x, handleClick: dispatchProps.handleClick(index) }))
});

const BottomNavigationContainer = connect(mapStateToProps, mapDispatchToProps, mergeProps)(BottomNavigation);

export default BottomNavigationContainer;
