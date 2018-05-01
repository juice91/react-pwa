import { fromJS } from "immutable";
import {EventEmitter} from 'events'
import { LOAD_REPOS, LOAD_REPOS_ERROR, LOAD_REPOS_SUCCESS } from '../App/constants';

const initialState = fromJS({
 /* loading: false,
  error: false,
  currentUser: false,
  userData: {
    repositories: false,
  },*/
  isDrawing: false,
  mode: "brush",
  stage:{},
  ui:new EventEmitter()
});


function canvasReducer(state = initialState, action) {
  console.log(action);
  switch (action.type) {
    case 'switch-mode':
    return state.set('mode',action.payload);
    case 'ui-command':
      state.get('ui').emit('command',action.payload)
    default:
      return state;
  }

}

export default canvasReducer;
