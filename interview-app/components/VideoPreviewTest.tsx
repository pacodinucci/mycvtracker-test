import React, { useState, useEffect } from 'react';
import { useReactMediaRecorder } from 'react-media-recorder';
import Styles from '../styles/Audio.module.css';
import Webcam from 'react-webcam';
import VideoTest from '../pages/VideoTest';
import { ST } from 'next/dist/shared/lib/utils';
import { useNavigate } from 'react-router-dom';


const VideoPreviewTester = () => {
    const { status, startRecording, stopRecording, mediaBlobUrl } = useReactMediaRecorder({ video: true });
    const video=document.getElementById("video")
    const videoConstraints = {
        width: 500,
        height: 380,
        facingMode: "user"
    };
    const [show, setShow] = useState(true);


    useEffect(() => {
        const StartRecordbtn = document.getElementById("StartRecord");
        const StopRecordbtn = document.getElementById("StopRecord");

        StartRecordbtn?.addEventListener("click", ()=>{
          startRecording()
          setShow(true)
         
        });
        StopRecordbtn?.addEventListener("click", ()=>{
          setShow(false)

          
          stopRecording()});

        // Cleanup event listeners on component unmount
        return () => {
            StartRecordbtn?.removeEventListener("click", startRecording);
            StopRecordbtn?.removeEventListener("click", stopRecording);
        };
    }, [startRecording, stopRecording]);

    return (
     
      <>
      
        <div className={Styles.audioSection}>
            <h1>Test Your Video When You're Ready</h1>
            
            <button id="StartRecord">Start Recording</button>
            <button id="StopRecord">Stop Recording</button>
           
            {/* Display the recorded video */}
            {!show &&(
              <>
            {mediaBlobUrl && <video id='video' className={Styles.videoSize} src={mediaBlobUrl} controls />}
          


            </>
            )}
        </div>

        {show && (
        <>
        <Webcam
          videoConstraints ={videoConstraints}
          audio={true}
        />
       </>)}
       <br />
       <button ><a href="http://localhost:3001/interview-app/VideoInterview">Are you happy with the Test </a></button>

        </>
    );
};

export default VideoPreviewTester;
