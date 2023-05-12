import React, {lazy, Suspense} from 'react';
import { Route, Routes } from "react-router-dom";
import Loader from './components/Loader';
import Header from './components/Header';
import { useAppSelector } from './redux/hooks';
import allSelectors from './redux/selectors';
import Modal from './components/Modal';
const Homepage = lazy(() => import("./Pages/Homepage"));
const Detailspage = lazy(() => import("./Pages/Detailspage"));
const Reportspage = lazy(() => import("./Pages/Reportspage"));
const Blogpage = lazy(() => import("./Pages/Blogpage"));


const App: React.FC = () => {
  const isModalOpen = useAppSelector(allSelectors.getModal)

  return (
    <>
      <Header />
      {isModalOpen && <Modal/>}
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/reports" element={<Reportspage />} />
          <Route path="/blog" element={<Blogpage />} />
          <Route path='/:id' element={<Detailspage />} />
        </Routes>
      </Suspense>
    </>
  );
};

export default App;
