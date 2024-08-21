
import React, { useState, useEffect, useContext,useCallback, useMemo } from "react";
import { createRoot } from 'react-dom/client';
import Styles from '../styles/Audio.module.css';
import AudioTestBtn from '../components/AudioPreviewTester';
import { useRouter } from 'next/router';
import { useUserState } from '../hooks/useUserState';
import styles from "../styles/questionAdd.module.css";
import Interview from './interview_details';

const router = useRouter();

const interviewMode = router.query.interviewMode;
const Urlnavigator= "http://localhost:3004/interview-app/interview?token=abcdjkdfkd&interviewType=REACTJS01&interviewMode=AUDIO"

const StartInterview = () => {
 
//  const { token } = useUserState(); // Fetch the token dynamically
  //const router = useRouter();
 //console.log(router.query.token)
 
  
const RedirectionToPage =()=>{
  let lastparam = Urlnavigator.split('&')
  let interviewparam = lastparam[lastparam.length -1]
  let interviewEquiv = interviewparam.split('=')
  let finalparam =interviewEquiv[interviewEquiv.length -1]
  console.log(finalparam)
  
  if(finalparam){
    switch (finalparam){
      case 'AUDIO':
        router.push('/AudioTest'); // Redirect to another page
        break
  
      case 'VIDEO':
        router.push('/VideoTest'); // Redirect to another page
        break
  
    
      default:
        router.push('/'); // Redirect to another page
      break;
    }
  }
}


  
  useEffect(() => {
    /*    if (interviewMode === 'Test') {
         router.push('/AudioTest'); // Redirect to another page
       }*/
      RedirectionToPage()
     }, [interviewMode, router]);
   
}

export default StartInterview;

//http://localhost:3004/interview-app/interview?token=abcdjkdfkd&interviewType=REACTJS01&interviewMode=VIDEO
//http://localhost:3004/interview-app/interview?token=abcdjkdfkd&interviewType=REACTJS01&interviewMode=VIDEO
//http://localhost:3004/interview-app/interview?token=abcdjkdfkd&interviewType=REACTJS01&interviewMode=MCQ