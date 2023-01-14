import React, {lazy, Suspense} from 'react';
import { Route, Routes } from "react-router-dom";
import Loader from './Loader';

function App() {
  return (
    <>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/"  />
          <Route path='/:id' />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
