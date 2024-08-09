import React from 'react';
import { useReactMediaRecorder } from 'react-media-recorder';
import Webcam from 'react-webcam';
import { AudioRecorder, useAudioRecorder } from 'react-audio-voice-recorder';
import { Box, Highlight, List, Stack, Title } from "@mantine/core";
import Styles from '../interview-app/styles/Audio.module.css'


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
