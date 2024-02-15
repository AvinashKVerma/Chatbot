import React, { useContext, useState } from "react";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { MdOutlineFeedback } from "react-icons/md";
import ChatContext from "../../context/ChatContext";

const Feedback = ({ setMessages, setHelpbtn }) => {
  const [feedback, setFeedBack] = useState("");
  const [feedbackState, setFeedBackState] = useState(false);
  const { userId, setField, setCorrection } = useContext(ChatContext);
  const handleFeedback = async () => {
    console.log(userId);
    const data = {
      user_id: userId,
      feedback_message: feedback,
    };
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/feedback`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.status === 200) {
      setFeedBackState(false);
      const responseData = await response.json();
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: responseData.message, sender: "assistant" },
      ]);
    }
  };
  return (
    <>
      {feedbackState && (
        <div className="px-6">
          <p className="text-[#041871] font-semibold text-center">
            Write Your Feedback
          </p>
          <textarea
            className="w-full mt-2 border"
            onChange={(e) => setFeedBack(e.target.value)}
          ></textarea>
          <div className="w-full flex justify-end mt-2">
            <button
              className="bg-blue-400 p-1 rounded-md"
              onClick={handleFeedback}
            >
              Submit
            </button>
            <button
              className="bg-blue-400 p-1 rounded-md ml-2"
              onClick={() => setFeedBackState(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
      <div className="ml-2">
        <div
          className="text-[#027BFF] p-1 rounded-md flex items-center cursor-pointer"
          onClick={() => setFeedBackState(true)}
        >
          <MdOutlineFeedback className="mr-2 items-center" /> Feedback
        </div>
        <div
          className="text-[#027BFF] p-1 rounded-md flex items-center cursor-pointer"
          onClick={() => {
            setMessages([]);
            setHelpbtn(false);
            setField("");
            setCorrection({
              user_id: "",
              problem: "",
              qIndex: 0,
              incorrectData: "",
              correctData: "",
              docState: false,
              proof: "",
            });
          }}
        >
          <RiDeleteBin5Fill className="mr-2 items-center" /> Clear Chat
        </div>
      </div>
    </>
  );
};

export default Feedback;
