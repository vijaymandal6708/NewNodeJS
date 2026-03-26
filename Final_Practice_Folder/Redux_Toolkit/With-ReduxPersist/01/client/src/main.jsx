import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import {Provider} from "react-redux";
import {persistor, store} from './Redux-toolkit/store.js';
import { PersistGate } from 'redux-persist/integration/react';


createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App></App>
    </PersistGate>
  </Provider>
)
