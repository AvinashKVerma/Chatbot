import React, { useContext } from "react";
import ChatContext from "../../context/ChatContext";
import { apiRequest } from "../configurations/api";
import { typewriterEffect } from "../configurations/typerWriter";

const Button = ({ btnTitle, setHelpbtn }) => {
  const {
    setMessages,
    setLoading,
    user,
    userId,
    setInputText,
    writingRef,
    setWriting,
    setField,
    setCorrection,
    setCorrectionForm,
  } = useContext(ChatContext);

  const typingMessage = (assistantMessage) => {
    setWriting(true);
    typewriterEffect(
      assistantMessage.text,
      () => setWriting(false),
      setMessages,
      writingRef
    );
    setLoading(false);
  };

  const handleButtonClick = async (btnTitle) => {
    if (
      btnTitle === "Mother name correction" ||
      btnTitle === "Father name correction" ||
      btnTitle === "DOB correction"
    ) {
      setCorrection((prevData) => ({ ...prevData, problem: btnTitle }));
      setCorrectionForm(true);
      return;
    }
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: btnTitle, sender: "user" },
    ]);
    setLoading(true);

    const data = {
      message: { text: btnTitle },
      user_email: user.email,
      user_id: userId,
    };
    const assistantMessage = { text: "", sender: "assistant" };

    try {
      const response = await apiRequest("webhook", data, "POST");

      if (response) {
        if (response.message) {
          assistantMessage.text = response.message;
          if (response.message === "wrong mother name") {
            setField("Mother's Name");
          }
          if (response.message === "wrong father name") {
            setField("Father's Name");
          }
          if (response.message === "wrong dob") {
            setField("DOB");
          }
          // return;
        }
        if (response.buttons) {
          setHelpbtn(response.buttons);
        } else {
          writingRef.current = true;
          assistantMessage.text = response.message.trim();
        }
      }

      if (assistantMessage.text !== "") {
        typingMessage(assistantMessage);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
      setInputText("");
    }
  };

  return (
    <>
      <button
        className="bg-blue-200 rounded-md mt-1"
        onClick={() => {
          setHelpbtn(false);
          handleButtonClick(btnTitle);
        }}
      >
        {btnTitle}
      </button>
    </>
  );
};

export default Button;
