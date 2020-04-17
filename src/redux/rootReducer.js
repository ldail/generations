import { combineReducers } from 'redux';
import familyRootReducer from './familyRoot/reducer/familyRootReducer';
import petRootReducer from './petRoot/reducers/petRootReducer';
import gameRootReducer from './gameRoot/reducer/gameRootReducer';

let reducers = combineReducers({
  family: familyRootReducer,
  pet: petRootReducer,
  game: gameRootReducer
})

export default reducers;