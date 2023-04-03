import { ReactComponent as Alert } from '../assets/Alert.svg';
export default function ModalAlert({ onClose }) {
  return (
    <>
      <div class='fixed z-50 inset-0 bg-gray-500 bg-opacity-75'></div>
      <div className='fixed z-50 inset-0 overflow-y-auto'>
        <div
          data-cy='modal-information'
          className='flex items-center justify-center  min-h-screen'
          onClick={onClose}
        >
          <div className='bg-white rounded-lg shadow-lg px-4 py-4 w-[490px] flex items-center'>
            <Alert className='mr-2' data-cy='modal-information-icon' />
            <p data-cy='modal-information-title'>Activity berhasil dihapus</p>
          </div>
        </div>
      </div>
    </>
  );
}
