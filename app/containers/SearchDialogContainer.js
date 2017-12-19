import { connect } from 'react-redux';
import SearchDialog from '../components/search-dialog/SearchDialog';

const mapStateToProps = state => ({
  open: state.searchDialog.open
});

const SearchDialogContainer = connect(mapStateToProps)(SearchDialog);

export default SearchDialogContainer;
