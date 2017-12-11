const START_COMPONENT = 'START_COMPONENT';
const STOP_COMPONENT = 'STOP_COMPONENT';
const UPDATE_COMPONENTS = 'UPDATE_COMPONENTS';
const UPDATE_COMPONENTS_INTENT = 'UPDATE_COMPONENTS_INTENT';
const COMPONENT_ACTION_FULFILLED = 'COMPONENT_ACTION_FULFILLED';

const startComponent = ({ serverId, componentId }) => (
  { type: START_COMPONENT, payload: { serverId, componentId } });
const stopComponent = ({ serverId, componentId }) => (
  { type: STOP_COMPONENT, payload: { serverId, componentId } });
const updateComponents = ({ serverId, items, time }) => (
  { type: UPDATE_COMPONENTS, payload: { serverId, items, time } });
const updateComponentsIntent = ({ serverId }) => (
  { type: UPDATE_COMPONENTS_INTENT, payload: { serverId } });
const componentActionFulfilled = ({ serverId, componentId, type }) => (
  { type: COMPONENT_ACTION_FULFILLED, payload: { serverId, componentId, type } });

export default {
  START_COMPONENT,
  STOP_COMPONENT,
  UPDATE_COMPONENTS,
  COMPONENT_ACTION_FULFILLED,
  UPDATE_COMPONENTS_INTENT,
  startComponent,
  stopComponent,
  updateComponents,
  updateComponentsIntent,
  componentActionFulfilled
};
