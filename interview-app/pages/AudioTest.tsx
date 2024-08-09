import React, { useRef, useState, useEffect } from 'react';

import AudioTestBtn from '../components/AudioPreviewTester';
import "react-responsive-modal/styles.css";
import { createRoot } from 'react-dom/client';
import Styles from '../styles/Audio.module.css'
import { text } from 'stream/consumers';

import { useAudioRecorder } from 'react-audio-voice-recorder';

const AudioTest = () => {
    const [displayAudio, SetDisplayAudio] = useState(false);

    const [show, setShow] = useState(false);
    
  
   const GiveAudio = ()=>{
        const TestAudioSectionPreview = document.getElementById('TestAudioSection');
        

        if (TestAudioSectionPreview) {
          const root = createRoot(TestAudioSectionPreview);
          root.render(
              
      
                  <div>
                     <AudioTestBtn/>
                     </div>
                  )
        }  
        };
     
    
 

  
return(
    <>  
    <div id='TestAudioSection' className={Styles.audioSection}>
   
        <h1>Hi</h1>
        <h1>Test your audio before you start your interview 
        </h1>
        <button onClick={GiveAudio} className={Styles.interviewbtn} >Start Interview</button>
    </div>
    </>
    
    )

}
   

                      


export  default AudioTest


