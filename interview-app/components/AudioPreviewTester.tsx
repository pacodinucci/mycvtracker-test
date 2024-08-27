import React, { useEffect } from 'react';
import { useReactMediaRecorder } from 'react-media-recorder';
import Styles from '../styles/Audio.module.css';
import { useRouter } from "next/router";

type Props = {
  Url: string;
};

const AudioPreviewTester = () => {
  const interviewMode = false;

  const GoToInterview = () => {
    const interviewMode = true
    if (interviewMode === true) {
      window.location.href = '/interview-app/interview'; // Redirect to the interview page
    }
  }



  const { startRecording, stopRecording, mediaBlobUrl } = useReactMediaRecorder({ audio: true });

  return (
    <>
      <h1 className={Styles.text}>When you're ready, test your audio</h1>
      <br />
      <button onClick={startRecording} className={Styles.startRecording}>Start Recording</button>
      <br /><br />
      <button onClick={stopRecording} className={Styles.startRecording}>Stop Recording</button>
      <br /><br /> <br />
      <div>

        {mediaBlobUrl && (
          <audio
            src={mediaBlobUrl}
            controls
            className={Styles.audioplayer}
          />
        )}

        <a href='#' target="_blank" rel="noopener noreferrer" className={Styles.startRecording} type="button">Proceed to interview</a>

      </div>
    </>
  );
};

export default AudioPreviewTester;
