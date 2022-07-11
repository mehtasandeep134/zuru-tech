import React from 'react';
import { renderRoutes } from 'react-router-config';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import routes from 'routes';

function App() {
  return (
    <>
      <BrowserRouter>{renderRoutes(routes)}</BrowserRouter>
      <ToastContainer />
    </>
  );
}

export default App;
