import Axios from 'axios';
export const BASE_URL = 'https://todo.api.devcode.gethired.id';
export const ADD_TODO = 'ADD_TODO';
export const REMOVE_TODO = 'REMOVE_TODO';
export const TOGGLE_TODO = 'TOGGLE_TODO';
export const ADD_ACTIVITY = 'ADD_ACTIVITY';
export const REMOVE_ACTIVITY = 'REMOVE_ACTIVITY';
export const ALERT_ACTIVITY = 'ALERT_ACTIVITY';
export const GET_ALL_TODO = 'GET_ALL_TODO';
export const OPEN_MODAL = 'OPEN_MODAL';
export const EDIT_TODO = 'EDIT_TODO';
export function addTodo(text) {
  return { type: ADD_TODO, text };
}

export const editTodos = (id, updatedTodo) => {
  return {
    type: EDIT_TODO,
    id,
    updatedTodo,
  };
};

export function getAllTodo(payload) {
  return { type: GET_ALL_TODO, payload };
}

export function removeTodo(id) {
  return { type: REMOVE_TODO, id };
}

export function toggleTodo(id, status) {
  return { type: TOGGLE_TODO, id, status };
}

export function fetchActivity(payload) {
  return { type: ADD_ACTIVITY, payload };
}

export function removeActivity(id) {
  return { type: REMOVE_ACTIVITY, id };
}

export function showAlert(payload) {
  return { type: ALERT_ACTIVITY, payload };
}

export function getAllActivity() {
  return (dispatch) => {
    return Axios.get(`${BASE_URL}/activity-groups?email=amos@wijay.com`).then(
      ({ data }) => dispatch(fetchActivity(data.data))
    );
  };
}

export function deleteActivity(id) {
  return (dispatch) => {
    return Axios.delete(`${BASE_URL}/activity-groups/${id}`).then((res) => {
      dispatch(removeActivity(id));
      dispatch(getAllActivity());
    });
  };
}

export function addNewActivity() {
  return (dispatch) => {
    return Axios({
      url: `${BASE_URL}/activity-groups/`,
      method: 'post',
      data: {
        title: 'new activity',
        email: 'amos@wijay.com',
      },
    }).then((res) => {
      dispatch(getAllActivity());
    });
  };
}

export function editTitleActivity(id, data) {
  return (dispatch) => {
    return Axios({
      method: 'patch',
      url: `${BASE_URL}/activity-groups/${id}`,
      data: {
        title: data,
      },
    }).then((res) => {
      dispatch(getAllActivity());
    });
  };
}

export function fetchAllTodo(id) {
  return (dispatch) => {
    return Axios.get(`${BASE_URL}/todo-items?activity_group_id=${id}`).then(
      (res) => dispatch(getAllTodo(res.data.data))
    );
  };
}

export function createTodo(id, { title, priority }) {
  return (dispatch) => {
    return Axios({
      method: 'post',
      url: `${BASE_URL}/todo-items`,
      data: {
        activity_group_id: id,
        title,
        priority,
      },
    }).then((res) => {
      dispatch(fetchAllTodo(id));
    });
  };
}

export function deletTodo(id) {
  return (dispatch) => {
    return Axios.delete(`${BASE_URL}/todo-items/${id}`).then((res) => {
      dispatch(removeTodo(id));
    });
  };
}

export function editTodo(id, data) {
  return (dispatch) => {
    return Axios({
      method: 'patch',
      url: `${BASE_URL}/todo-items/${id}`,
      data,
    }).then((res) => {
      dispatch(editTodos(id, data));
      console.log(res);
      if (data.is_active) {
        dispatch(toggleTodo(id, res.data.data.is_active));
      } else {
        console.log('hello');
      }
    });
  };
}
