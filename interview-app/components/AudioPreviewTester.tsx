import React from 'react';
import { useReactMediaRecorder } from 'react-media-recorder';
import Webcam from 'react-webcam';
import { AudioRecorder, useAudioRecorder } from 'react-audio-voice-recorder';
import { Box, Highlight, List, Stack, Title } from "@mantine/core";
import Styles from '../styles/Audio.module.css'



const AudioPreviewTester = () => {
  const { status, startRecording, stopRecording, mediaBlobUrl } = useReactMediaRecorder({ audio: true });

  return (
    <>
    <h1 className={Styles.text}>When your ready test your audio</h1>
    <br/>
    <button onClick={startRecording} className={Styles.startRecording}>Start Recording</button> 
    <br/><br/>
      {/* /* <button id="testBtn" onClick={startRecording}>Start Recording</button> */ }
      <button onClick={stopRecording} className={Styles.startRecording}>Stop Recording</button>
      <br/><br/> <br/>

      {/* Display the recorded audio */}
      {/* {mediaBlobUrl && <audio src={mediaBlobUrl} controls />} */}
      <div>
      {mediaBlobUrl && (
        <audio
          src={mediaBlobUrl}
          controls
          className={Styles['audio-player']} // Apply the CSS class
        />
      )}
    </div>
    </>
  );
};

export default AudioPreviewTester;