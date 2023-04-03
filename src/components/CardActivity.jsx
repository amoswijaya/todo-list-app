import { ReactComponent as Trash } from '../assets/Trash.svg';

import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import 'moment/locale/id';
export default function CardActivity({ title, date, id }) {
  const navigate = useNavigate();
  const formattedDate = moment(date).locale('id').format('D MMMM YYYY');
  const removeActivity = () => {
    navigate('/activity-delete/' + id);
  };
  const detailActivity = () => {
    navigate('/activity/' + id);
  };
  return (
    <div className='w-[235px]  rounded-xl shadow-md bg-white p-6 cursor-pointer hover:shadow-xl flex flex-col justify-between ml-2'>
      <div
        className='h-[186px]'
        onClick={detailActivity}
        data-cy='activity-item'
      >
        <p data-cy='activity-item-title' className='font-bold text-lg'>
          {title}
        </p>
      </div>
      <div className='flex justify-between items-center text-[#888888]'>
        <span data-cy='activity-item-date'>{formattedDate}</span>
        <Trash data-cy='activity-item-delete-button' onClick={removeActivity} />
      </div>
    </div>
  );
}
