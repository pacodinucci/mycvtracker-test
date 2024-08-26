import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Alert, Button, Container, Header, Box, Modal, Flex, Title, Progress, Text, LoadingOverlay } from "@mantine/core";
import AudioController from "../components/AudioController";
import { getCandidateDetails, getMyQuestions } from "../apis/mycvtracker/questions";
import { Candidatedata, Question } from "../types/question_types";
import Instructions from "../components/Instructions";
import { submitAnswer } from "../apis/mycvtracker/submit_interview";
import AudioController_new from "../components/AudioController_new";
import { useUserState } from "../hooks/useUserState";
import { authRoutes } from "../data/route";
import AudioTest from "./AudioTest";
import { InterviewMode } from "../types/assignInterview_types";
import Interview from "./interview_details";

import { useRouter } from "next/router";


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
  const [candidate, setCandidate] = useState<Candidatedata>({ timeBetweenQuestions: 60 } as Candidatedata);
  const [isPreparing, setIsPreparing] = useState(false);

  
  const interviewMode = router.query.interviewMode;
  const currentfullUrl = router.asPath;


  const redirectToErrorPage = () => {
    router.push('/ErrorPage');
  }

const getInterviewType =()=>{
  let lastparam = currentfullUrl.split('&')
  let interviewparam = lastparam[1]
  let interviewEquiv = interviewparam.split('=')
  let finalparam = interviewEquiv[interviewEquiv.length - 1]
  
  console.log(lastparam)
  console.log(interviewparam)
  console.log(interviewEquiv)
  console.log(finalparam)
  return finalparam;

}


  const checkMissingParams = () => {
    let urlParamList = currentfullUrl.split('?');
    let urlParamSub = urlParamList[urlParamList.length - 1].split('&');
    if (urlParamSub.length == 0) redirectToErrorPage();

    let token = urlParamSub[0].split('=');
    let tokenStr = token[token.length - 1];
    let interviewType = urlParamSub[1].split('=');
    let interviewTypeStr = interviewType[interviewType.length - 1];
    let interviewModeParam = urlParamSub[urlParamSub.length - 1].split('=');
    let interviewModeStr = interviewModeParam[interviewModeParam.length - 1];
    if (!tokenStr || !interviewTypeStr || !interviewModeStr) {
      redirectToErrorPage();
    }
  }


  const RedirectionToPage = () => {
    let lastparam = currentfullUrl.split('&')
    let interviewparam = lastparam[lastparam.length - 1]
    let interviewEquiv = interviewparam.split('=')
    let finalparam = interviewEquiv[interviewEquiv.length - 1]

    if (finalparam) {
      switch (finalparam) {
        case 'AUDIO':
          router.push('/AudioTest'); // Redirect to another page
          query: { mode: finalparam }
          break

        case 'VIDEO':
          router.push('/VideoTest'); // Redirect to another page
          query: { mode: finalparam }
          break
        case 'MCQ':
          router.push('/_mcq'); // Redirect to another page
          query: { mode: finalparam }
          break
        default:
          router.push('/'); // Redirect to another page
          break;
      }
    } else {
      redirectToErrorPage(); // Redirect to another page
    }
  }

  useEffect(() => {
    /*    if (interviewMode === 'Test') {
         router.push('/AudioTest'); // Redirect to another page
       }*/
         getInterviewType()
    checkMissingParams();
    RedirectionToPage()
  }, [interviewMode, router]);
}


export default StartInterview;

//http://localhost:3000/interview-app/shared-candidate/getVideoResults?token=37aa704e512145a9a9d8f709c9483222&interviewType=reactjs01_nodejs01

//http://localhost:3001/interview-app/interview?token=37aa704e512145a9a9d8f709c9483222&interviewType=reactjs01_nodejs01&interviewMode=Test

//http://localhost:3006/interview-app/StartInterview?token=abcdjkdfkd&interviewType=REACTJS01&interviewMode=VIDEO
//http://localhost:3004/interview-app/interview?token=abcdjkdfkd&interviewType=REACTJS01&interviewMode=VIDEO
//http://localhost:3004/interview-app/interview?token=abcdjkdfkd&interviewType=REACTJS01&interviewMode=MCQ