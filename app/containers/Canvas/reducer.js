import { fromJS } from "immutable";
import { LOAD_REPOS, LOAD_REPOS_ERROR, LOAD_REPOS_SUCCESS } from '../App/constants';

const initialState = fromJS({
 /* loading: false,
  error: false,
  currentUser: false,
  userData: {
    repositories: false,
  },*/
  isDrawing: false,
  mode: "Brush",
  stage:{},
});


function canvasReducer(state = initialState, action) {
  console.log(action);
  switch (action.type) {
    case 'switch-mode':
    //return state.set('mode',action.payload);

    default:
      return state;
  }

}

export default canvasReducer;
