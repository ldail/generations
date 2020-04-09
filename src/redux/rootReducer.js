import { combineReducers } from 'redux';
import familyRootReducer from './familyRoot/reducer/familyRootReducer';
import petRootReducer from './petRoot/reducers/petRootReducer';

let reducers = combineReducers({
  family: familyRootReducer,
  pet: petRootReducer
})

export default reducers;