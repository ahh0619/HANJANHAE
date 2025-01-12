'use client';

import '@/styles/toast-custom.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ToastProvider = () => {
  return (
    <ToastContainer
      position="bottom-center"
      autoClose={1500}
      hideProgressBar
      closeOnClick
      closeButton={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      className="custom-toast-container"
      toastClassName="custom-toast"
    />
  );
};

export default ToastProvider;
