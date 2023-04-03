import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { getAllActivity } from './redux/actions';
import Header from './components/Header';
import Activity from './pages/Activity';
import './index.css';
import MainHeader from './components/MainHeader';
import Home from './pages/Home';
import Modal from './components/ModalActivity';
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllActivity());
  }, []);

  return (
    <div className='App  w-screen h-full pb-10'>
      <Header />
      <MainHeader />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/activity/:id' element={<Activity />} />
        <Route path='/activity-delete/:id' element={<Modal />} />
      </Routes>
    </div>
  );
}

export default App;
