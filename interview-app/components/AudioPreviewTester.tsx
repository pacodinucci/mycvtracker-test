import React from 'react';
import { useReactMediaRecorder } from 'react-media-recorder';
import Webcam from 'react-webcam';
import { AudioRecorder, useAudioRecorder } from 'react-audio-voice-recorder';
import { Box, Highlight, List, Stack, Title } from "@mantine/core";
import Styles from '../styles/Audio.module.css'
import { useRouter } from "next/router";



const AudioPreviewTester = () => {
  const { status, startRecording, stopRecording, mediaBlobUrl } = useReactMediaRecorder({ audio: true });
  //const router = useRouter();

  
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
          className={Styles.audioplayer} // Apply the CSS class
        />
        
      )}
           <button><a href="http://localhost:3005/interview-app/interview"></a>Proceed to interview</button>
    </div>
    </>
  );
};

  

export default AudioPreviewTester;
