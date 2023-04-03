import { REMOVE_TODO, TOGGLE_TODO, GET_ALL_TODO, EDIT_TODO } from './actions';

const initialState = {
  todos: [],
};

function todo(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_TODO:
      return {
        ...state,
        todos: [...action.payload],
      };
    case REMOVE_TODO:
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.id),
      };
    case TOGGLE_TODO:
      return {
        ...state,
        todos: state.todos.map((todo) => {
          if (todo.id === action.id) {
            return { ...todo, is_active: !todo.completed };
          } else {
            return todo;
          }
        }),
      };
    case EDIT_TODO:
      return {
        ...state,
        todos: state.todos.map((todo) => {
          if (todo.id === action.id) {
            return { ...todo, ...action.updatedTodo };
          } else {
            return todo;
          }
        }),
      };
    default:
      return state;
  }
}

export default todo;
