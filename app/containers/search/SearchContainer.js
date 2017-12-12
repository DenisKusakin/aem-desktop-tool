import { connect } from 'react-redux';
import Search from '../../components/SearchBar';

const mapStateToProps = state => ({
  currentIndex: state.bottomNavigation.current
});

const SearchContainer = connect(mapStateToProps)(Search);

export default SearchContainer;
