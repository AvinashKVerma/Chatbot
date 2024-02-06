import React, { useState } from "react";
import ChatContext from "./ChatContext";

const UserContextProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [paymentBtn, setPaymentBtnBtn] = useState(false);
  const [userId, setUserId] = useState("");
  const [helpBtn, setHelpbtn] = useState(false);
  const [helpSubBtn, setHelpSubBtn] = useState("");
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
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export default UserContextProvider;
