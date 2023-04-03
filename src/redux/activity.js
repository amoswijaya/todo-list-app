import { ADD_ACTIVITY, REMOVE_ACTIVITY, ALERT_ACTIVITY } from './actions';

const initialState = {
  activity: [],
  alert: false,
};

function activity(state = initialState, action) {
  switch (action.type) {
    case ADD_ACTIVITY:
      return {
        ...state,
        activity: [...action.payload],
      };
    case REMOVE_ACTIVITY:
      return {
        ...state,
        activity: state.activity.filter(
          (activity) => activity.id !== action.id
        ),
      };
    case ALERT_ACTIVITY:
      return {
        ...state,
        alert: action.payload,
      };
    default:
      return state;
  }
}

export default activity;
