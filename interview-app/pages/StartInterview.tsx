import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Alert, Button, Container, Header, Box, Modal, Flex, Title, Progress, Text, LoadingOverlay } from "@mantine/core";
import { useRouter } from "next/router";
import AudioController from "../components/AudioController";
import { getCandidateDetails, getMyQuestions } from "../apis/mycvtracker/questions";
import { Candidatedata, Question } from "../types/question_types";
import Instructions from "../components/Instructions";
import { submitAnswer } from "../apis/mycvtracker/submit_interview";
import styles from "../styles/questionAdd.module.css";
import AudioController_new from "../components/AudioController_new";
import { useUserState } from "../hooks/useUserState";
import { authRoutes } from "../data/route";

import AudioTest from "./AudioTest";
import { InterviewMode } from "../types/assignInterview_types";




type Operation = "startInterview" | "loading" | "recording" | "countdown" | "stopped";
type play = "play_rec" | "stop_recording" | "uploading";
const StartInterview = () => {
  const router = useRouter();
  const [token, setToken] = useState("");
  const [types, setTypes] = useState<string[]>([]);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [demoquestions, setDemoQuestions] = useState<Question[]>([]);
  const [currectQuestion, setCurrentQuestion] = useState(-1);
  const [countDownTimer, setCountDownTimer] = useState(5);
  const [countdownInterval, setCountdownInterval] = useState<NodeJS.Timer | null>(null);
  const [operation, setOperation] = useState<Operation>("startInterview");
  const [showInstructions, setShowInstructions] = useState(false);
  const [recorder, setRecorder] = useState<MediaRecorder | null>(null);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [play, setPlay] = useState<play>("play_rec");
  const { user, isLoading: isLoadingUser } = useUserState();
  const [candidate, setCandidate] = useState<Candidatedata>({timeBetweenQuestions: 60} as Candidatedata);
  const [isPreparing, setIsPreparing] = useState(false);

  const interviewMode = router.query.interviewMode;
const Urlnavigator= "http://localhost:3004/interview-app/StartInterview?token=abcdjkdfkd&interviewType=REACTJS01&interviewMode=MCQ"

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
      case 'MCQ':
        router.push('/_mcq'); // Redirect to another page
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

//http://localhost:3000/interview-app/shared-candidate/getVideoResults?token=37aa704e512145a9a9d8f709c9483222&interviewType=reactjs01_nodejs01

//http://localhost:3001/interview-app/interview?token=37aa704e512145a9a9d8f709c9483222&interviewType=reactjs01_nodejs01&interviewMode=Test

//http://localhost:3004/interview-app/StartInterview?token=abcdjkdfkd&interviewType=REACTJS01&interviewMode=VIDEO
//http://localhost:3004/interview-app/interview?token=abcdjkdfkd&interviewType=REACTJS01&interviewMode=VIDEO
//http://localhost:3004/interview-app/interview?token=abcdjkdfkd&interviewType=REACTJS01&interviewMode=MCQ