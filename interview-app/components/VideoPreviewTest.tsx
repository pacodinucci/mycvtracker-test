import React, { useState, useEffect, useCallback, useRef} from "react";
import { useReactMediaRecorder } from 'react-media-recorder';
import Webcam from 'react-webcam';
import VideoTest from '../pages/VideoTest';
import { ST } from 'next/dist/shared/lib/utils';
import { useNavigate } from 'react-router-dom';
type Operation = "startInterview" | "loading" | "recording" | "countdown" | "stopped";
import Styles from '../styles/Video.module.css';
import Style from '../styles/Audio.module.css';
type Link = {
  Url: string;
};
import { Flex, Button } from '@mantine/core';

const VideoPreviewTester= (URL: any) => {
    const { status, startRecording, stopRecording, mediaBlobUrl } = useReactMediaRecorder({ video: true });
    const video=document.getElementById("video")
    const videoConstraints = {
        width: 500,
        height: 380,
        facingMode: "user"
    };
    const [show, setShow] = useState(true);
    const [hasPermission, setHasPermission] = useState<boolean | null>(null);
    const [operation, setOperation] = useState<Operation>("startInterview");
    const [proceedbtn, setProceedBtn] =useState(false)

    useEffect(() => {
        const StartRecordbtn = document.getElementById("StartRecord");
        const StopRecordbtn = document.getElementById("StopRecord");

        StartRecordbtn?.addEventListener("click", ()=>{
          startRecording()
          setShow(true)
          setProceedBtn(false)
        });

        StopRecordbtn?.addEventListener("click", ()=>{
          setShow(false)
          stopRecording()
          setProceedBtn(true)
        });
        // Cleanup event listeners on component unmount
        return () => {
            StartRecordbtn?.removeEventListener("click", startRecording);
            StopRecordbtn?.removeEventListener("click", stopRecording);
        };
    }, [startRecording, stopRecording]);

    return (
     
      <>
      
        <div className={Style.audioSection}>
            <h1 className={Styles.text} >Test Your Video When You're Ready</h1>
            <Flex
      mih={50}
      gap="xl"
      justify="center"
      align="center"
      direction="row"
      wrap="wrap"
    >
            <button id="StartRecord" className={`${Styles.startButton} ${Styles.button} ${Styles.text} ${Styles.buttonContainer}`}>Start Recording</button>
            <button id="StopRecord" className= {`${Styles.stopButton} ${Styles.button}  ${Styles.text} ${Styles.buttonContainer}`}>Stop Recording</button>
         </Flex>
            {/* Display the recorded video */}
            {!show &&(
              <>
  <Flex
      mih={50}
      gap="xl"
      justify="center"
      align="center"
      direction="column"
      wrap="wrap"
    >
            {mediaBlobUrl && <video id='video' className={Styles.videoSize} src={mediaBlobUrl} controls />}
    </Flex>
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

       <br/>
       
       {proceedbtn && (
        <>
       <button >
       <a href={URL} target="_blank" rel="noopener noreferrer" className={Styles.linkText}>Proceed to interview</a>
      </button>
      </>
       )}

    </>
    
  )}
export default VideoPreviewTester;
