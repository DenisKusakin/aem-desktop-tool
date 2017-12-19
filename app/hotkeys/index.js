import map from './hotkeys-actions-map';

const Mousetrap = require('mousetrap');

export default dispatch =>
  map.forEach(({ bind, action }) =>
    Mousetrap.bind(bind, () => dispatch({ type: action })));

