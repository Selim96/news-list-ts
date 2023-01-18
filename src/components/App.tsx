import React, {lazy, Suspense} from 'react';
import { Route, Routes } from "react-router-dom";
import Loader from './Loader';
const Homepage = lazy(() => import("./Homepage/Homepage"));
const Detailspage = lazy(() => import("./Detailspage/Detailspage"));

const App: React.FC =() => {
  return (
    <>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={ <Homepage/>} />
          <Route path='/:id' element={<Detailspage/>} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
