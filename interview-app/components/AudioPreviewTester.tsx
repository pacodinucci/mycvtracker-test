import React from 'react';
import { useReactMediaRecorder } from 'react-media-recorder';

const AudioPreviewTester = () => {
  const { status, startRecording, stopRecording, mediaBlobUrl } = useReactMediaRecorder({ audio: true });

  return (
    <>
    <h1>When your ready test your audio</h1>
      <button id="testBtn" onClick={startRecording}>Start Recording</button>
      <button id="testbtn2" onClick={stopRecording}>Stop Recording</button>
      <br/>

      {/* Display the recorded audio */}
      {mediaBlobUrl && <audio src={mediaBlobUrl} controls />}
    </>
  );
};

export default AudioPreviewTester;
