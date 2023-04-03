import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { ReactComponent as Edit } from '../assets/Edit.svg';
import { ReactComponent as Trash } from '../assets/Trash.svg';
import { editTodo, deletTodo } from '../redux/actions';
import ModalDelete from './ModalDelete';
import ModalEditTodo from './ModalEditTodo';

export default function TodoList({ data }) {
  const dispatch = useDispatch();
  const [priority, setPriority] = useState('');
  const [colorPriority, setColorPriority] = useState('');
  const [isActive, setIsActive] = useState(data.is_active ? false : true);
  const [isEdit, setEdit] = useState(false);
  const [isRemove, setIsRemove] = useState(false);
  useEffect(() => {
    switch (priority) {
      case 'very-high':
        setColorPriority('#ED4C5C');
        break;
      case 'hight':
        setColorPriority('#F8A541');
        break;
      case 'medium':
        setColorPriority('#00A790');
        break;
      case 'low':
        setColorPriority('#428BC1');
        break;
      case 'very-low':
        setColorPriority('#8942C1');
        break;
      default:
        break;
    }
  }, [colorPriority, priority]);

  const removeTodo = () => {
    console.log(data.id);

    dispatch(deletTodo(data.id));
    setIsRemove(false);
  };

  const openModalRemove = () => {
    setIsRemove(true);
  };

  const onActive = () => {
    setIsActive(!isActive);
    dispatch(editTodo(data.id, { is_active: isActive ? 1 : 0 }));
  };

  useEffect(() => {
    setPriority(data.priority);
  }, [priority, data]);

  useEffect(() => {
    console.log(data.is_active);
  }, [data.is_active]);
  return (
    <div className='w-full h-auto bg-white shadow-lg rounded-lg p-4 my-1 flex justify-between'>
      <div className='flex items-center'>
        <input
          className='cursor-pointer'
          data-cy='todo-item-checkbox'
          type='checkbox'
          onChange={onActive}
          checked={isActive}
        />
        <div className={`bg-[${colorPriority}] rounded-full w-2 h-2 mx-2`} />
        <p
          data-cy='todo-item-title'
          className={`mr-2 ${isActive && 'line-through opacity-50'} `}
        >
          {data.title}
        </p>
        <Edit
          className=' cursor-pointer line'
          data-cy='todo-item-edit-button'
          onClick={() => setEdit(true)}
        />
      </div>
      <Trash
        className='cursor-pointer'
        onClick={openModalRemove}
        data-cy='todo-item-delete-button'
      />
      {isEdit && (
        <ModalEditTodo onClose={(value) => setEdit(value)} data={data} />
      )}
      {isRemove && (
        <ModalDelete
          data={data}
          onClose={() => setIsRemove(false)}
          onDelete={removeTodo}
        />
      )}
    </div>
  );
}
