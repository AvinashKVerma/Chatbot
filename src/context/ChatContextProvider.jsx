import React, { useState, useRef } from "react";
import ChatContext from "./ChatContext";

const UserContextProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [paymentBtn, setPaymentBtnBtn] = useState(false);
  const [userId, setUserId] = useState("");
  const [helpBtn, setHelpbtn] = useState(false);
  const [helpSubBtn, setHelpSubBtn] = useState("");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({
    name: "",
    email: "",
  });

  const [writing, setWriting] = useState(false);
  const writingRef = useRef(false);
  const [inputText, setInputText] = useState("");
  const [correction, setCorrection] = useState({
    user_id: "",
    problem: "",
    qIndex: 0,
    incorrectData: "",
    correctData: "",
    docState: false,
    proof: "",
  });
  const [field, setField] = useState("");
  const [api, setApi] = useState("");
  const [correctionForm, setCorrectionForm] = useState(false);
  const [question, setQuestion] = useState("");
  return (
    <ChatContext.Provider
      value={{
        messages,
        setMessages,
        paymentBtn,
        setPaymentBtnBtn,
        userId,
        setUserId,
        helpBtn,
        setHelpbtn,
        helpSubBtn,
        setHelpSubBtn,
        loading,
        setLoading,
        user,
        setUser,
        inputText,
        setInputText,
        writingRef,
        writing,
        setWriting,
        correction,
        setCorrection,
        field,
        setField,
        api,
        setApi,
        correctionForm,
        setCorrectionForm,
        question,
        setQuestion,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export default UserContextProvider;
