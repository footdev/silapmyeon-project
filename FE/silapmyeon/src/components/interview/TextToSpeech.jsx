import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { completeSpeech, tts, questionCount } from "../../atoms/atoms";
import styles from "./TextToSpeech.module.css"; // CSS 파일 경로에 주의

const TextToSpeech = ({ question }) => {
  const synthesis = window.speechSynthesis;

  const [completeSpeechState, setCompleteSpeechState] =
    useRecoilState(completeSpeech);
  const [ttsState, setTtsState] = useRecoilState(tts);
  const [qCount, setQCount] = useRecoilState(questionCount);

  const speakText = () => {
    if (synthesis.speaking) {
      synthesis.cancel();
    }

    const utterance = new SpeechSynthesisUtterance(question);
    utterance.lang = "ko-KR";
    utterance.addEventListener("end", (event) => {
      setCompleteSpeechState(true);
      setTtsState(false);
    });

    synthesis.speak(utterance);
  };

  useEffect(() => {
    if (ttsState) {
      speakText();
    }
  }, [ttsState]);

  return (
    <div>
      <div className={styles.questionText}>{question}</div>
      <br />
    </div>
  );
};

export default TextToSpeech;
