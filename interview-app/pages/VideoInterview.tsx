import React, { useState, useEffect, useCallback, useMemo } from "react";
import {
  Alert,
  Button,
  Container,
  Header,
  Box,
  Modal,
  Flex,
  Title,
  Progress,
  Text,
  LoadingOverlay,
} from "@mantine/core";
import { useRouter } from "next/router";
import AudioController from "../components/AudioController";
import {
  getCandidateDetails,
  getMyQuestions,
} from "../apis/mycvtracker/questions";
import { Candidatedata, Question } from "../types/question_types";
import Instructions from "../components/Instructions";
import { submitAnswer } from "../apis/mycvtracker/submit_interview";
import styles from "../styles/questionAdd.module.css";
import AudioController_new from "../components/AudioController_new";
import { useUserState } from "../hooks/useUserState";
import { authRoutes } from "../data/route";
import VideoTest from "./VideoTest";
import { useNavigate, useSearchParams } from 'react-router-dom';

type Operation =
  | "startInterview"
  | "loading"
  | "recording"
  | "countdown"
  | "stopped";
type play = "play_rec" | "stop_recording" | "uploading";

const Interview_app = () => {
  const router = useRouter();
  const {interviewMode} = router.query

  const [token, setToken] = useState("");
  const [types, setTypes] = useState<string[]>([]);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currectQuestion, setCurrentQuestion] = useState(-1);
  const [countDownTimer, setCountDownTimer] = useState(5);
  const [countdownInterval, setCountdownInterval] =
    useState<NodeJS.Timer | null>(null);
  const [operation, setOperation] = useState<Operation>("startInterview");
  const [showInstructions, setShowInstructions] = useState(false);
  const [recorder, setRecorder] = useState<MediaRecorder | null>(null);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [play, setPlay] = useState<play>("play_rec");
  const { user, isLoading: isLoadingUser } = useUserState();
  const [candidate, setCandidate] = useState<Candidatedata>({
    timeBetweenQuestions: 60,
  } as Candidatedata);
  const [isPreparing, setIsPreparing] = useState(false);

  const firstQuestion = 0;
  const lastQuestion = questions.length - 1;
  const randomQuestion = useMemo(() => {
    if (questions.length < 3) {
      return;
    }
    let random;
    do {
      random = Math.floor(Math.random() * questions.length);
    } while (random === firstQuestion || random === lastQuestion);
    return random;
  }, [questions.length]);

  useEffect(() => {
    const initialize = async () => {
      console.log("Current Question:", currectQuestion);
      console.log("First Question:", firstQuestion);
      console.log("Last Question:", lastQuestion);
      console.log("Random Question:", randomQuestion);
      if (router.query.token && !Array.isArray(router.query.token)) {
        setIsPreparing(true);
        const candToken = router.query.token;
        setToken(candToken);
        router.replace(router.asPath, router.route, { shallow: true });

        try {
          const response = await getCandidateDetails("", candToken);
          setCandidate(response);
        } catch (e: any) {
          console.log(e);
        } finally {
          setIsPreparing(false);
          setTimeout(() => {
            setShowInstructions(true);
          }, 100);
        }
      }

      if (router.query.interviewType) {
        setTypes(
          Array.isArray(router.query.interviewType)
            ? router.query.interviewType
            : [router.query.interviewType]
        );
      }
    };

    const initializeMedia = async () => {
      try {
        const isSpecialQuestion =
          currectQuestion === firstQuestion ||
          currectQuestion === lastQuestion ||
          currectQuestion === randomQuestion;
        const constraints = isSpecialQuestion
          ? { audio: true, video: true }
          : { audio: true };
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        console.log("getUserMedia call was successful");
        setHasPermission(true);
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorder.addEventListener("dataavailable", (event) => {
          console.log(event);
          setAudioBlob(event.data);
        });
        setRecorder(mediaRecorder);
      } catch (error) {
        console.error("Error in getUserMedia call:", error);
        setHasPermission(false);
      }
    };

    initialize();
    initializeMedia();

    if (user === null && !isLoadingUser) {
      document.addEventListener("contextmenu", (event) => {
        event.preventDefault();
      });

      document.onkeydown = function (e) {
        if (
          e.ctrlKey &&
          (e.keyCode === 67 ||
            e.keyCode === 86 ||
            e.keyCode === 85 ||
            e.keyCode === 16 ||
            e.keyCode === 73 ||
            e.keyCode === 117)
        ) {
          return false;
        } else {
          return true;
        }
      };
    }
  }, [
    user,
    isLoadingUser,
    currectQuestion,
    firstQuestion,
    lastQuestion,
    randomQuestion,
    router,
  ]);

  const startCountdown = useCallback(() => {
    setCountDownTimer(10);
    const time = setInterval(() => {
      setCountDownTimer((prev) => prev - 1);
    }, 1000);
    setCountdownInterval((prev) => {
      if (prev !== null) clearInterval(prev);
      return time;
    });
    setOperation("countdown");
  }, []);

  const startRecording = useCallback(() => {
    const { timeBetweenQuestions } = candidate;
    setOperation("recording");
    setPlay("play_rec");
    setCountDownTimer(timeBetweenQuestions);
    if (recorder) {
      recorder.start((timeBetweenQuestions + 3) * 1000);
    } else {
      console.log("error");
    }
  }, [candidate, recorder]);

  const uploadData = useCallback(
    async (data: Blob | null, duration: number, question: number) => {
      if (data === null) return;
      if (questions.length === 0 || question === -1) return;
      try {
        const url = URL.createObjectURL(data);
        console.log(url);
        const fd = new FormData();
        fd.append(
          "file",
          data,
          `${new Date().toISOString()}.${
            currectQuestion === firstQuestion ||
            currectQuestion === lastQuestion ||
            currectQuestion === randomQuestion
              ? "mov"
              : "wav"
          }`
        );
        fd.set("Candidate", token);
        fd.set("questionId", questions[question].id.toString());
        fd.set("attemptTime", duration.toString());
        setIsUploading(true);
        const response = await submitAnswer(fd);
        setAudioBlob(null);
        setOperation("countdown");
        startCountdown();
        setCurrentQuestion((prev) => prev + 1);
      } catch (e) {
        console.log("error");
      } finally {
        setIsUploading(false);
      }
    },
    [
      token,
      questions,
      startCountdown,
      currectQuestion,
      firstQuestion,
      lastQuestion,
      randomQuestion,
    ]
  );

  const stopRecording = useCallback(() => {
    if (recorder) recorder.stop();
    setPlay("stop_recording");
    setOperation("recording");
    setCountdownInterval((prev) => {
      if (prev !== null) clearInterval(prev);
      return null;
    });
    uploadData(audioBlob, countDownTimer, currectQuestion);
  }, [recorder, uploadData, audioBlob, countDownTimer, currectQuestion]);

  const startInterview = useCallback(
    (startfrom: number) => {
      setCurrentQuestion(startfrom);
      startCountdown();
    },
    [startCountdown]
  );

  useEffect(() => {
    if (countDownTimer <= 0) {
      if (operation === "countdown") {
        startRecording();
      } else if (operation === "recording") {
        stopRecording();
      }
    }
  }, [countDownTimer, startRecording, operation, stopRecording]);

  const getQuestions = useCallback(async (token: string, types: string[]) => {
    try {
      const audioQuestions: Question[] = await getMyQuestions(
        token,
        types.join("_")
      );
      if (audioQuestions) {
        const currentQuesIdx = audioQuestions.findIndex(
          (question) => !question.answered
        );
        startInterview(
          currentQuesIdx !== -1 ? currentQuesIdx : audioQuestions.length
        );
        setQuestions(audioQuestions);
      }
    } catch (e: any) {
      setToken("");
      console.log(e);
    }
  }, []);

  const handleStartInterview = useCallback(
    (token: string, types: string[]) => {
      if (hasPermission && types.length > 0 && token.length > 2) {
        setOperation("loading");
        getQuestions(token, types);
      } else {
        // Throw Error
      }
    },
    [hasPermission, getQuestions]
  );

  const skipQuestion = useCallback(() => {
    stopRecording();
    startCountdown();
    setCurrentQuestion((prev) => prev + 1);
  }, [startCountdown, stopRecording]);


  if (questions.length > 0 && currectQuestion >= questions.length) {
    return (
      <Container>
        <Title order={1} align="center">
          Thank you for attending the interview
        </Title>
        <Title order={3} align="center">
          Our team will evalute the answers and get back to you
        </Title>
        <Title order={6} align="center">
          If you have any doubts, you can contact us at info@mycvtracker.com
        </Title>
      </Container>
    );
  }

  const { timeBetweenQuestions } = candidate;
  const itwQuestion = questions[currectQuestion];

  return (
    <Box>
      <LoadingOverlay visible={isPreparing} zIndex={99999} />
      <Modal
        opened={showInstructions && !isPreparing}
        onClose={() => setShowInstructions(false)}
        size="xl"
      >
        <Instructions timeBetweenQuestions={timeBetweenQuestions} />
      </Modal>
      <Box pt={85} />
      <Header
        fixed={true}
        height={140}
        mt={70}
        p={0}
        style={{ zIndex: 9, maxHeight: 500, height: 555 }}
      >
        <Flex direction="column" p="sm">
          <Flex direction="row" align="center" justify="space-between" gap="lg">
            {operation !== "startInterview" && (
              <Flex style={{ width: "100%" }} direction="column">
                <Progress
                  value={(currectQuestion / questions.length) * 100}
                  style={{
                    width: "100%",
                    maxWidth: 300,
                    height: 12,
                    marginTop: 10,
                    marginLeft: 10,
                  }}
                  size="sm"
                />
                <Text
                  fz="sm"
                  className={styles.quetion_bold}
                  style={{ marginLeft: 10 }}
                >{`Question  : ${currectQuestion + 1} of ${
                  questions.length
                }`}</Text>
              </Flex>
            )}
            {!isPreparing && operation === "startInterview" && (
              <Button
                size="xs"
                className={styles.instructions_btn}
                onClick={() => setShowInstructions(true)}
                style={{ alignSelf: "flex-end" }}
              >
                Show Instructions
              </Button>
            )}
          </Flex>

          <div className={styles.quetion_fsize}>
            {currectQuestion > -1 && itwQuestion?.question}
          </div>

          <AudioController_new
            operation={operation}
            totalQuestions={questions.length}
            currectQuestion={currectQuestion}
            timeLeft={countDownTimer}
            isUploading={isUploading}
            startInterview={() => handleStartInterview(token, types)}
            stopRecording={stopRecording}
            skipQuestion={skipQuestion}
            blob={audioBlob}
            uploadAnswer={() =>
              uploadData(audioBlob, countDownTimer, currectQuestion)
            }
            play={play}
          />
        </Flex>
      </Header>
      <Container style={{ marginTop: 50 }}>
        {token.length < 1 && (
          <Alert title="Invalid Token" color="red">
            Invalid Token, Please Check the link. Please check the link.
          </Alert>
        )}
        {types.length < 1 && (
          <Alert title="No Interview Types" color="red">
            No Interview types detected. Please check the link.
          </Alert>
        )}
        {hasPermission === false && (
          <Alert title="No Permission" color="red">
            Please provide permissions for audio
          </Alert>
        )}
        {hasPermission === null && (
          <Alert title="Checking Permission" color="blue">
            Requesting Permission for Audio, please click allow.
          </Alert>
        )}
      </Container>
    </Box>
  );
};

export default Interview_app;

// http://localhost:3000/interview-app/VideoInterview?token=ab9d954496da446d8c2d0b85bd49adf8&interviewType=reactjs01

// http://localhost:3000/interview-app/shared-candidate/getVideoResults?token=ab9d954496da446d8c2d0b85bd49adf8&interviewType=reactjs01
