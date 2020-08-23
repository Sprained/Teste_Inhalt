import React from 'react';

import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from './Store';

import Routes from './routes';
import Global from './Global/global';
import Sidebar from './Components/Sidebar/sidebar'

function App() {
  const token = localStorage.getItem('inhalt-token');
  return (
    <Provider store={store}>
      <BrowserRouter>
        {
          token ? (
            <Sidebar />
          ) : (
            <>
            </>
          )
        }
        <Routes />
      </BrowserRouter>
      <Global />
    </Provider>
  );
}

export default App;
