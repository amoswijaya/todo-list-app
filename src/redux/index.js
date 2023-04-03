import {
  combineReducers,
  legacy_createStore as createStore,
  applyMiddleware,
} from 'redux';
import thunk from 'redux-thunk';
import todo from './todo';
import activity from './activity';
const reducer = combineReducers({
  todo,
  activity,
});

export default createStore(reducer, applyMiddleware(thunk));
