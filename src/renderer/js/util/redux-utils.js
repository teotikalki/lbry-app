// util for creating reducers
// based off of redux-utils
// https://redux-utils.js.org/docs/api/handleAction.html#handleactions
export const handleActions = (actionMap, defaultState) => {
  return (state = defaultState, action) => {
    const handler = actionMap[action.type];
    const newState = handler ? handler(state, action) : {};
    return Object.assign({}, state, newState);
  };
};
