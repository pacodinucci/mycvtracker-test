import React, { useEffect } from "react";
import { createRoot } from 'react-dom/client';
import VideoTestBtn from '../components/VideoPreviewTest';
import AudioTestBtn from '../components/AudioPreviewTester';
import Styles from '../styles/Audio.module.css';

const ErrorHandle = () => {
  const DoubleTest = typeof document !== 'undefined' ? document.getElementById("DoubleTest") : null;

  

  return (
    <>
      <div className={Styles.error_message} id="DoubleTest">
        <h1  >404</h1>
        <p >Page not Found</p>
      </div>
    </>
  );
};

export default ErrorHandle;
