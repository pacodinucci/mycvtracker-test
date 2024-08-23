import React, { useState, useEffect } from 'react';
import VideoTestBtn from '../components/VideoPreviewTest';
import "react-responsive-modal/styles.css";
import { createRoot } from 'react-dom/client';
import Styles from '../styles/Audio.module.css';
import Webcam from 'react-webcam';
import { BrowserRouter } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useRouter } from 'next/router';

const token = Array.from({length: 32}, () => Math.random().toString(36)[2]).join('');
console.log(token);
const VideoTest = () => {
    const router = useRouter();
  const { mode } = router.query;


    const [displayAudio, setDisplayAudio] = useState(false);
  
     const baseUrl = "http://localhost:3001/interview-app/interview";

    const interviewType = "reactjs01_nodejs01"; // You might want to get this dynamically as well if neede

    useEffect(() => {
        console.log("Mode:", mode); // This should log 'AUDIO'
      }, [mode]);
    // Construct the URL with the dynamic token
    const fullUrl = `${baseUrl}?token=${token}&interviewType=${interviewType}`;
    console.log(fullUrl);

    useEffect(() => {
        // This code will only run on the client side
        const TestAudioSectionPreview = document.getElementById('TestAudioSection');
        const btn = document.getElementById('btn');

        const GiveAudio = () => {
            if (TestAudioSectionPreview) {
               
                const root = createRoot(TestAudioSectionPreview);
                root.render(
                
< VideoTestBtn URL={fullUrl} />
                        );
            }
        };

        // Add event listener
        if (btn) {
            btn.addEventListener('click', GiveAudio);
        }

        // Cleanup event listener
        return () => {
            if (btn) {
                btn.removeEventListener('click', GiveAudio);
            }
        };
    }, []); // Empty dependency array means this effect runs once when the component mounts

    return (
        
        <>
           
            <div id='TestAudioSection' className={Styles.audioSection}>
                <h1>Hi</h1>
                <h1>Test your audio before you start your interview</h1>
                
                <button id='btn' className={Styles.startRecording}>Before you start Test your Video</button>


            </div>
        </>
    );
};

export default VideoTest;
