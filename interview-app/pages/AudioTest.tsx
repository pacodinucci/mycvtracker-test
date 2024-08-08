import React, { useState, useEffect } from 'react';
import AudioTestBtn from '../components/AudioPreviewTester';
import "react-responsive-modal/styles.css";
import { createRoot } from 'react-dom/client';
import Styles from '../styles/Audio.module.css';

const AudioTest = () => {
    const [displayAudio, setDisplayAudio] = useState(false);
    const [show, setShow] = useState(false);

    useEffect(() => {
        // This code will only run on the client side
        const TestAudioSectionPreview = document.getElementById('TestAudioSection');
        const btn = document.getElementById('btn');

        const GiveAudio = () => {
            if (TestAudioSectionPreview) {
                const root = createRoot(TestAudioSectionPreview);
                root.render(
                    <div>
                        <AudioTestBtn />
                    </div>
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
                <button id='btn' className={Styles.interviewbtn}>Before you start Test your audio</button>
            </div>
        </>
    );
};

export default AudioTest;
