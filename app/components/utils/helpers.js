import { green500, red500, indigo500 } from 'material-ui/styles/colors';
import { FOUND, INVALID_CREDENTIALS, NOT_FOUND, CANT_REACHED } from './statuses.js';

const map = {
  [FOUND]: {
    text: 'Online',
    color: green500
  },
  [NOT_FOUND]: {
    text: 'Offline',
    color: red500
  },
  [INVALID_CREDENTIALS]: {
    text: 'Invalid credentials',
    color: indigo500
  },
  [CANT_REACHED]: {
    text: 'Offline',
    color: red500
  }
};

export default {
  statusText: statusCode => map[statusCode] ? map[statusCode].text : map[NOT_FOUND].text,
  statusColor: statusCode => map[statusCode] ? map[statusCode].color : map[NOT_FOUND].color
};
