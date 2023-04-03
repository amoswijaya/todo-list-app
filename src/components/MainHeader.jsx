import Axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { ReactComponent as Back } from '../assets/Back.svg';
import { ReactComponent as Edit } from '../assets/Edit.svg';
import { useLocation, useNavigate } from 'react-router';
import { ReactComponent as Plus } from '../assets/Plus.svg';
import { addNewActivity, editTitleActivity } from '../redux/actions';
import { BASE_URL } from '../redux/actions';
import ModalTodo from './ModalTodo';
export default function MainHeader() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [currLocation, setCurrLocation] = useState();
  const [selectedActivity, setSelectedActivity] = useState();
  const [isOpenTodo, setIsOpenTodo] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [id, setId] = useState(0);
  const [titleEdited, setTitleEdited] = useState('');
  const addNew = () => {
    if (currLocation) {
      setIsOpenTodo(true);
    } else {
      dispatch(addNewActivity());
    }
  };

  const editTitle = (e) => {
    setTitleEdited(e.target.value);
  };

  const doEditTitleActivity = () => {
    dispatch(editTitleActivity(selectedActivity.id, titleEdited));
  };

  const onBack = () => {
    doEditTitleActivity();
    navigate('/');
  };
  useEffect(() => {
    const currLocation = location.pathname.split('/');
    setCurrLocation(currLocation[1]);
    setId(currLocation[2]);
    const getOne = async () => {
      try {
        const activity = await Axios.get(
          `${BASE_URL}/activity-groups/${currLocation[2]}`
        );
        setSelectedActivity(activity.data);
        setTitleEdited(activity.data.title);
      } catch (error) {
        console.log(error);
      }
    };

    if (currLocation[1]) {
      getOne();
    }
  }, [location]);

  return (
    <div className='px-[10%] mt-[43px] flex w-full justify-between'>
      <div className='flex items-center'>
        {currLocation && <Back className='cursor-pointer' onClick={onBack} />}
        {!isEdit && (
          <p data-cy='activity-title' className=' text-4xl font-bold'>
            {currLocation ? titleEdited : 'Activity'}
          </p>
        )}
        {isEdit && (
          <input
            type='text'
            // onKeyDown={handleKeyPress}
            onBlur={() => setIsEdit(false)}
            onChange={editTitle}
            value={titleEdited}
            className='py-1 md:py-2 text-xl font-bold md:text-3xl bg-transparent border-b outline-none text-neutral-700 border-neutral-700'
            autoFocus
          />
        )}
        {currLocation && (
          <Edit
            data-cy='todo-title-edit-button'
            onBlur={() => setIsEdit(false)}
            onClick={() => setIsEdit(true)}
            className='mx-6'
          />
        )}
      </div>

      <button
        data-cy='activity-add-button'
        className='bg-[#16ABF8] px-4 py-2  rounded-3xl flex text-white '
        onClick={addNew}
      >
        <Plus />
        Tambah
      </button>
      {isOpenTodo && (
        <ModalTodo id={id} onClose={(value) => setIsOpenTodo(value)} />
      )}
    </div>
  );
}
