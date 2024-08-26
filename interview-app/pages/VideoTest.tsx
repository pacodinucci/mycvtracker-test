import React, { useState, useEffect } from 'react';
import VideoTestBtn from '../components/VideoPreviewTest';
import "react-responsive-modal/styles.css";
import { createRoot } from 'react-dom/client';
import Styles from '../styles/Audio.module.css';
const token = Array.from({ length: 32 }, () => Math.random().toString(36)[2]).join('');
console.log(token);
const VideoTest = () => {

    const [displayAudio, setDisplayAudio] = useState(false);

    const baseUrl = "http://localhost:3001/interview-app/interview";
    // const token ="4a979b61bfc749a7bb5a65eafc2aff65"
    //const token ="a7873dbcc4b2432daf47e63440316d68"
    const interviewType = "reactjs01_nodejs01"; // You might want to get this dynamically as well if neede

   
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

                    < VideoTestBtn />
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
