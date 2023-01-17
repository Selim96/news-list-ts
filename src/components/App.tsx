import React, {lazy, Suspense} from 'react';
import { Route, Routes } from "react-router-dom";
import Loader from './Loader';
import Homepage from './Homepage';

const App: React.FC =() => {
  return (
    <>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={ <Homepage/>} />
          <Route path='/:id' />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
