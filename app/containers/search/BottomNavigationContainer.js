import { connect } from 'react-redux';
import BottomNavigation from '../../components/BottomNavigation';
import { changeBottomNavigation } from './../../actions/search-actions';

const mapStateToProps = state => ({
  selectedIndex: state.bottomNavigation.current
})

const mapDispatchToProps = dispatch => ({
  handleClick: newIndex => () => dispatch(changeBottomNavigation(newIndex))
});

const BottomNavigationContainer = connect(mapStateToProps, mapDispatchToProps)(BottomNavigation);

export default BottomNavigationContainer;
