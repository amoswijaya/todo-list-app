import { ReactComponent as Warning } from '../assets/Warning.svg';
export default function ModalDelete({ data, onClose, onDelete }) {
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
              <p className='text-lg'>Apakah anda yakin menghapus List</p>
              <p className='text-lg font-bold'>"{data.title}"?</p>
            </div>

            <div className='flex justify-center'>
              <button
                data-cy='modal-delete-cancel-button'
                onClick={() => onClose()}
                className='px-12 py-2 bg-[#F4F4F4] text-black rounded-2xl hover:opacity-50  focus:outline-none'
              >
                Batal
              </button>
              <button
                data-cy='modal-delete-confirm-button'
                onClick={onDelete}
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
