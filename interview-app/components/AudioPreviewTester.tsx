import React, { useRef, useState, useEffect } from 'react';
import { useReactMediaRecorder } from 'react-media-recorder';
import Webcam from 'react-webcam';
import { AudioRecorder, useAudioRecorder } from 'react-audio-voice-recorder';
import { Box, Highlight, List, Stack, Title } from "@mantine/core";
import Styles from '/Users/bradleyamankwah/Downloads/interview-app/styles/Audio.module.css'




const AudioTestBtn = () => {
  const recorderControls = useAudioRecorder();
  const TestAudioSectionPreview = document.getElementById('TestAudioSection');

    const addAudioElement = (blob:Blob) => {
        const url = URL.createObjectURL(blob);
        const audio = document.createElement('audio');
        audio.src = url;
        audio.controls = true;
        document.body.appendChild(audio);
        TestAudioSectionPreview?.appendChild(audio)
        audio.classList.add("audiopos")
      };


      return (
      
        <>
       
          <div>
          <AudioRecorder
            onRecordingComplete={(blob) => addAudioElement(blob)}
            recorderControls={recorderControls}
            showVisualizer={true}
          />
          <button onClick={recorderControls.stopRecording}>Stop recording</button>
          </div>
          
        </>
      );
    };
  
    





export default AudioTestBtn