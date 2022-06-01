// scroll bar
import 'simplebar/src/simplebar.css';

import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

//
import App from './App';
// import * as serviceWorker from './serviceWorker';
import reportWebVitals from './reportWebVitals';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-toastify/dist/ReactToastify.css';
// ----------------------------------------------------------------------
import { Provider } from 'react-redux';
import store from './store';
// import { Toaster } from 'react-hot-toast';
// toast.configure();

ReactDOM.render(
  <HelmetProvider>
    <BrowserRouter>
      <Provider store={store}>
        {/* <Toaster position="top-center" reverseOrder={false} /> */}
        <ToastContainer />
        <App />
      </Provider>
    </BrowserRouter>
  </HelmetProvider>,
  document.getElementById('root')
);

// If you want to enable client cache, register instead.
// serviceWorker.unregister();
reportWebVitals();
