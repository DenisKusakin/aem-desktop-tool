import { connect } from 'react-redux';
import Bundles from '../../components/search/BundlesSearchResult';
import searchSelector from './../../selectors/search-selector';

const mapStateToProps = (state, ownProps) => {
  const search = searchSelector(state, ownProps.id);
  if (!search) {
    return { chunks: [] };
  }
  const chunks = search.result.chunks
    .filter(x => search.checkboxes[x.id])
    .map(x => {
      const serverBundles = state.bundles[x.id];
      if (!serverBundles) {
        return {
          ...x,
          items: []
        };
      }
      return {
        ...x,
        items: x.items.map(({ id }) => serverBundles.items.find(y => y.id === id))
      };
    });
  return { chunks };
};

const BundlesContainer = connect(mapStateToProps)(Bundles);

export default BundlesContainer;
