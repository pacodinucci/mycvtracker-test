import React from 'react';
import { createRoot } from 'react-dom/client';
import Styles from '../styles/Audio.module.css';
import AudioTestBtn from '../components/AudioPreviewTester';
import { Badge } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { Flex, Button } from '@mantine/core';

const AudioTest = () => {
  const media = useMediaQuery("(min-width: 767px)");
  const regulartn = Styles.audioSection
  const GiveAudio = () => {
    const token = Array.from({length: 32}, () => Math.random().toString(36)[2]).join('');
    const baseUrl = "http://localhost:3001/interview-app/interview";
    const interviewType = "reactjs01_nodejs01"; // You might want to get this dynamically as well if needed
    

    // Construct the URL with the dynamic token
    const fullUrl = `${baseUrl}?token=${token}&interviewType=${interviewType}`;
    console.log(fullUrl);
    
    const TestAudioSectionPreview = document.getElementById('TestAudioSection');

    if (TestAudioSectionPreview) {
      const root = createRoot(TestAudioSectionPreview);
      root.render(
        <div>
          <AudioTestBtn  />
        </div>
      );
    }
  };

  return (
    <>
      <div id='TestAudioSection' className={Styles.audioSection}>
        <h1>Hi</h1>
        <h1>Test your audio before you start your interview</h1>
      {}  
 
           <Flex
           mih={50}
    
           gap="xl"
           justify="center"
           align="center"
           direction="column"
           wrap="wrap"
         >
        <Button onClick={GiveAudio} className={Styles.start_int_svg}>Test your Audio</Button>     
        </Flex> 
      </div>
    </>
  );
};

export default AudioTest;
