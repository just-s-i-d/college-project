import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { UserProvider } from './components/context/usercontext.component';
import { CurrentUserProvider } from './components/context/currentusercontext.component';
import { ResultProvider } from './components/context/result.component';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <CurrentUserProvider>
        <UserProvider>
          <ResultProvider>
              <App />
              <ToastContainer
              position="top-center"
              autoClose={2000}/>
          </ResultProvider>
        </UserProvider>
      </CurrentUserProvider>
    </BrowserRouter >
  </React.StrictMode >
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
