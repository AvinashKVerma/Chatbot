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
    incorrectData: "",
    correctData: "",
    college_name: "",
    college_code: "",
    branch: "",
    year: "",
    semester: "",
  });
  const [field, setField] = useState("");
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
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export default UserContextProvider;
