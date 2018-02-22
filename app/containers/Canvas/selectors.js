/**
 * Homepage selectors
 */

import { createSelector } from 'reselect';

const selectCanvas = (state) => state.get('canvas');

const makeSelect_mode = () => createSelector(
  selectCanvas,
  (canvasState) => canvasState.get('mode')
);
const makeSelect_isDrawing = () => createSelector(
  selectCanvas,
  (canvasState) => canvasState.get('isDrawing')
);
const makeSelect_ui = () => createSelector(
  selectCanvas,
  (canvasState) => canvasState.get('ui')
);

export {
  makeSelect_mode,
  makeSelect_isDrawing,
  makeSelect_ui
};
