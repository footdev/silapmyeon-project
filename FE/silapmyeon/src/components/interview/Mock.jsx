import { useRef, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import axios from "axios";
import AltCam from "./cam.png";
import SpeechToText from "./SpeechToText";
import TextToSpeech from "./TextToSpeech";
import { questionCount, tts, stt, completeSpeech } from "../../atoms/atoms";

function Mock() {
  const [qCount, setQCount] = useRecoilState(questionCount);
  const [ttsState, setTtsState] = useRecoilState(tts);
  const [sttState, setSttState] = useRecoilState(stt);
  const [completeSpeechState, setCompleteSpeechState] =
    useRecoilState(completeSpeech);

  const [question, setQuestion] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [timer, setTimer] = useState(0);

  function handleNextButton() {
    setQCount((prev) => prev + 1);
    setTtsState(true);
    setSttState(true);
    setCompleteSpeechState(false);
  }

  function handleSTTData(time) {
    setTimer(time);
  }

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const remainingSeconds = (seconds % 60).toString().padStart(2, "0");
    return `${minutes}:${remainingSeconds}`;
  };

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/interview/" + "1").then((response) => {
      console.log(response.data.question);
      setQuestion(response.data.question);
      setIsLoading((prev) => !prev);
    });
  }, []);

  return (
    <div>
      <h1>모의</h1>
      <div>
        <h3>질문 횟수</h3>
        <h2>{qCount}</h2>
      </div>
      <div>
        <p>타이머: {formatTime(timer)}</p>
        <img width={640} height={360} src={AltCam} alt="cam" />
      </div>
      <div style={{ display: "none" }}>
        {qCount !== 0 ? <TextToSpeech question={question[qCount]} /> : null}
        {qCount !== 0 ? <SpeechToText onData={handleSTTData} /> : null}
      </div>
      {qCount === 5 ? (
        <button>종료</button>
      ) : (
        <button
          onClick={handleNextButton}
          disabled={isLoading || ttsState ? true : false}
        >
          {qCount !== 0 ? "다음" : "시작"}
        </button>
      )}
    </div>
  );
}

export default Mock;
