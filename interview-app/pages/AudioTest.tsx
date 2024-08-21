import React from 'react';
import { createRoot } from 'react-dom/client';
import Styles from '../styles/Audio.module.css';
import AudioTestBtn from '../components/AudioPreviewTester';
import { useRouter } from 'next/router';
import { useUserState } from '../hooks/useUserState';
import styles from "../styles/questionAdd.module.css";

const AudioTest = () => {
 
//  const { token } = useUserState(); // Fetch the token dynamically
  //const router = useRouter();
 //console.log(router.query.token)
 
  const GiveAudio = () => {
    const token = Array.from({length: 32}, () => Math.random().toString(36)[2]).join('');
    console.log(token);
    const baseUrl = "http://localhost:3001/interview-app/interview";
   // const token ="4a979b61bfc749a7bb5a65eafc2aff65"
   //const token ="a7873dbcc4b2432daf47e63440316d68"
    const interviewType = "reactjs01_nodejs01"; // You might want to get this dynamically as well if needed
    

    // Construct the URL with the dynamic token
    const fullUrl = `${baseUrl}?token=${token}&interviewType=${interviewType}`;
    console.log(fullUrl);
    
    const TestAudioSectionPreview = document.getElementById('TestAudioSection');

    if (TestAudioSectionPreview) {
      const root = createRoot(TestAudioSectionPreview);
      root.render(
        <div>
          <AudioTestBtn Url={fullUrl} />
        </div>
      );
    }
  };

  return (
    <>
      <div id='TestAudioSection' className={Styles.audioSection}>
        <h1>Hi</h1>
        <h1>Test your audio before you start your interview</h1>
        <button onClick={GiveAudio} className={Styles.start_int_svg}>Test your Audio</button>
      </div>
    </>
  );
};

export default AudioTest;
