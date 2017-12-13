import { connect } from 'react-redux';
import TabsNavigation from '../components/TabsNavigation';
import { changeBottomNavigation } from '../actions/search-actions';

const mapStateToProps = state => ({
  value: state.bottomNavigation.current === 0 ? 'bundles' : 'components'
})

const mapDispatchToProps = dispatch => ({
  handleClick: newVal => dispatch(changeBottomNavigation(newVal === 'bundles' ? 0 : 1))
});

const TabsNavigationContainer = connect(mapStateToProps, mapDispatchToProps)(TabsNavigation);

export default TabsNavigationContainer;
