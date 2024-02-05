import React, { useState } from "react";
import ChatContext from "./ChatContext";

const UserContextProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [paymentBtn, setPaymentBtnBtn] = useState(false);
  const [userId, setUserId] = useState("");
  return (
    <ChatContext.Provider
      value={{
        messages,
        setMessages,
        paymentBtn,
        setPaymentBtnBtn,
        userId,
        setUserId,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export default UserContextProvider;
