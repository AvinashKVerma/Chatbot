import { useContext, useEffect } from "react";
import ChatContext from "../../context/ChatContext";
import { problemStatement } from "../Assests/Constants";
import { typewriterEffect } from "../configurations/typerWriter";
import { correctionApi } from "../configurations/api";

const CorrectionForm = () => {
  const {
    correction,
    setCorrection,
    setMessages,
    setWriting,
    writingRef,
    setQuestion,
    question,
    setLoading,
    setInputText,
    userId,
  } = useContext(ChatContext);
  const inputState = problemStatement[correction.problem];

  useEffect(() => {
    setQuestion([
      `Enter Your Incorrect ${inputState[1]}`,
      `Enter Your Correct ${inputState[1]}`,
      "Upload a document of proof",
    ]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (
      question[correction.qIndex] !== "" &&
      question[correction.qIndex] !== undefined
    ) {
      setWriting(true);
      typewriterEffect(
        question[correction.qIndex],
        () => {
          setWriting(false); // Set writing to false when typing is complete
        },
        setMessages,
        writingRef
      );
      setLoading(false);
      setInputText("");
      if (question[correction.qIndex] === "Upload a document of proof") {
        setCorrection((prevData) => ({ ...prevData, docState: true }));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [correction.qIndex, question]);

  useEffect(() => {
    if (correction.proof !== "") {
      (async () => {
        const data = {
          user_id: userId,
          problem_statement: correction.problem,
          wrong_data: correction.incorrectData,
          right_data: correction.correctData,
          proof: correction.correctData,
        };
        console.log(correction);
        const response = await correctionApi(data, inputState[0]);
        console.log(response);
      })();
    }
  }, [correction.proof]);
};

export default CorrectionForm;
