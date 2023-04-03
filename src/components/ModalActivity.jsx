import { ReactComponent as Warning } from '../assets/Warning.svg';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import Axios from 'axios';
import { BASE_URL, showAlert } from '../redux/actions';
import { deleteActivity } from '../redux/actions';
export default function ModalActivity() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [activityData, setActivity] = useState({});
  const { id } = useParams();
  useEffect(() => {
    const getOne = async () => {
      try {
        const activity = await Axios.get(`${BASE_URL}/activity-groups/${id}`);
        setActivity(activity.data);
      } catch (error) {
        console.log(error);
      }
    };
    getOne();
  }, [id]);
  const handleCancel = () => {
    navigate(-1);
  };
  const handleRemove = () => {
    dispatch(deleteActivity(id));
    dispatch(showAlert(true));
    navigate('/');
  };
  return (
    <>
      <div class='fixed z-50 inset-0 bg-gray-500 bg-opacity-75'></div>
      <div className='fixed z-50 inset-0 overflow-y-auto'>
        <div
          data-cy='modal-delete'
          className='flex items-center justify-center min-h-screen'
        >
          <div className='bg-white rounded-lg shadow-lg p-16'>
            <div className='mb-8 flex items-center flex-col'>
              <Warning data-cy='modal-delete-icon' className='mb-8' />
              <p className='text-lg'>Apakah anda yakin menghapus activity</p>
              <p className='text-lg font-bold'>"{activityData.title}"?</p>
            </div>

            <div className='flex justify-center'>
              <button
                data-cy='modal-delete-cancel-button'
                onClick={handleCancel}
                className='px-12 py-2 bg-[#F4F4F4] text-black rounded-2xl hover:opacity-50  focus:outline-none'
              >
                Batal
              </button>
              <button
                data-cy='modal-delete-confirm-button'
                onClick={handleRemove}
                className='ml-4 px-12 py-2 bg-[#ED4C5C] text-white rounded-2xl hover:opacity-50  focus:outline-none'
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
