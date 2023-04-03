import { useDispatch, useSelector } from 'react-redux';
import { ReactComponent as EmptyState } from '../assets/EmptyState.svg';
import CardActivity from '../components/CardActivity';
import ModalAlert from '../components/ModalAlert';
import { addNewActivity, showAlert } from '../redux/actions';
export default function Home() {
  const activity = useSelector((state) => state.activity.activity);
  const alert = useSelector((state) => state.activity.alert);
  const dispatch = useDispatch();

  const addNew = () => {
    dispatch(addNewActivity());
  };

  const onCloseAlert = () => {
    dispatch(showAlert(false));
  };

  if (!activity.length)
    return (
      <div
        className='px-[10%] flex justify-center '
        data-cy='activity-empty-state'
        onClick={addNew}
      >
        <EmptyState />
      </div>
    );
  return (
    <div className='px-[10%] mt-14 grid grid-cols-4 gap-8'>
      {activity.map(({ id, title, created_at }) => (
        <CardActivity key={id} title={title} date={created_at} id={id} />
      ))}
      {alert && <ModalAlert onClose={onCloseAlert} />}
    </div>
  );
}
