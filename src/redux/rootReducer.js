import { combineReducers } from 'redux';
import familyRootReducer from './familyRoot/reducer/familyRootReducer';

let reducers = combineReducers({
  family: familyRootReducer
})

export default reducers;