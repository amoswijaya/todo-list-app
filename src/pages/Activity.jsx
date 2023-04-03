import { useEffect } from 'react';
import { ReactComponent as EmptyState1 } from '../assets/EmptyState1.svg';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { fetchAllTodo } from '../redux/actions';
import TodoList from '../components/ListTodo';

export default function Activity() {
  const todos = useSelector((state) => state.todo.todos);
  const dispatch = useDispatch();
  const { id } = useParams();
  useEffect(() => {
    dispatch(fetchAllTodo(id));
  }, [dispatch, id]);

  useEffect(() => {
    console.log(todos);
  }, [todos]);
  if (!todos.length)
    return (
      <div
        className='px-[10%] flex justify-center '
        data-cy='activity-empty-state'
      >
        <EmptyState1 />
      </div>
    );
  return (
    <div className='px-[10%] mt-8'>
      {todos.map((todo) => (
        <TodoList data={todo} />
      ))}
    </div>
  );
}
