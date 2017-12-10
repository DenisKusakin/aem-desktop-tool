import { connect } from 'react-redux';
import Search from '../../components/SearchBar';

const mapStateToProps = state => ({
  id: state.search.items[state.search.current].id
});

const SearchContainer = connect(mapStateToProps)(Search);

export default SearchContainer;
