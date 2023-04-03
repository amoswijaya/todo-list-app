import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { ReactComponent as Close } from '../assets/Close.svg';
import { createTodo } from '../redux/actions';

export default function ModalTodo({ onClose, id }) {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState('');
  const dispatch = useDispatch();
  const addTodo = () => {
    dispatch(createTodo(id, { title, priority }));
    setTitle('');
    setPriority('');
    onClose(false);
  };
  return (
    <>
      <div class='fixed z-50 inset-0 bg-gray-500 bg-opacity-75'></div>
      <div className='fixed z-50 inset-0 overflow-y-auto'>
        <div
          data-cy='modal-add'
          className='flex items-center justify-center min-h-screen'
        >
          <div className='bg-white rounded-lg shadow-lg '>
            <div className='flex  flex-row items-center justify-between border-b border-slate-400 p-6'>
              <p data-cy='modal-add-title' className='text-lg font-bold'>
                Tambah List Item
              </p>
              <Close
                data-cy='modal-add-close-button'
                className='cursor-pointer'
                onClick={() => onClose(false)}
              />
            </div>

            <div className='flex   p-8 flex-col'>
              <div className='my-1'>
                <p className=' text-xs mb-1 font-semibold'>NAMA LIST ITEM</p>
                <input
                  onChange={(e) => setTitle(e.target.value)}
                  data-cy='modal-add-name-input'
                  id='item-name'
                  placeholder='Tambahkan nama list item'
                  className='block w-[550px]  h-12 lg:h-14  px-4 lg:px-6 rounded-lg outline-none transition border hover:border-[#16ABF8] border-neutral-400 focus:border-[#16ABF8]'
                  value={title}
                />
              </div>
              <div className='my-1 flex flex-col'>
                <label
                  for='priority-select'
                  className=' text-xs mb-1 font-semibold'
                >
                  PRIORITY
                </label>

                <select
                  className='p-2 w-36 border border-neutral-400 rounded-lg h-12'
                  name='priority'
                  id='priority-select'
                  onChange={(e) => setPriority(e.target.value)}
                >
                  <option value=''>Pilih priority</option>
                  <option value='very-high'>Very High</option>
                  <option value='high'>High</option>
                  <option value='medium'>Medium</option>
                  <option value='low'>Low</option>
                  <option value='very-low'>Very Low</option>
                </select>
              </div>
            </div>
            <div className='border-t border-neutral-400 w-full flex p-6 justify-end'>
              <button
                data-cy='modal-add-save-button'
                onClick={addTodo}
                className={`rounded-3xl py-2  w-1/3 md:w-1/4   px-4 md:px-8 bg-sky-500 text-white ${
                  !priority && !title ? 'opacity-50' : 'opacity-100'
                } `}
                disabled={!priority && !title ? true : false}
              >
                Simpan
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
