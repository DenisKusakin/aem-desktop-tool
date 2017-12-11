import { connect } from 'react-redux';
import ComponentsSearchResult from '../../components/search/ComponentsSearchResult';
import searchSelector from './../../selectors/search-selector';

const mapStateToProps = (state, ownProps) => {
  const search = searchSelector(state, ownProps.id);
  if (!search) {
    return { chunks: [] };
  }
  const chunks = search.result.chunks
    .filter(x => search.checkboxes[x.id])
    .map(x => {
      const serverComponents = state.components[x.id];
      if (!serverComponents) {
        return {
          ...x,
          items: []
        };
      }
      return {
        ...x,
        items: x.items.map(({ id }) => serverComponents.items.find(y => y.id === id))
      };
    });
  return { chunks };
};

const ComponentsContainer = connect(mapStateToProps)(ComponentsSearchResult);

export default ComponentsContainer;
