import React from "react";

const Issuebtn = ({
  setIssueBtn,
  issueBtn,
  setMessages,
  setSelectedBtn,
  setPaymentBtnBtn,
  typewriterEffect,
  setWriting,
}) => {
  const handleIssueBtn = async () => {
    const userMessage = { text: issueBtn, sender: "user" };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    try {
      const url = `${process.env.REACT_APP_BASE_URL}/webhook`;
      const data = {
        message: {
          text: issueBtn,
        },
      };

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }

      const responseData = await response.json();

      const assistantMessage = {
        text: responseData.message.trim(),
        sender: "assistant",
      };

      setMessages((prevMessages) => [
        ...prevMessages,
        { text: assistantMessage.text, sender: "assistant" },
      ]);
      setWriting(true);
      // Apply typewriter effect to assistant message
      typewriterEffect(assistantMessage.text, setMessages);
    } catch (error) {
      console.error("Error:", error.message);
    }
    setIssueBtn("");
  };
  return (
    <div className="mt-2 flex flex-col items-end">
      <button
        className="bg-blue-200 px-2 rounded-lg mb-2 w-1/3"
        onClick={() => {
          setIssueBtn("Payment_Procedure");
          setSelectedBtn("");
          setPaymentBtnBtn(false);
          handleIssueBtn();
        }}
      >
        Procedure
      </button>
      <button
        className="bg-blue-200 px-2 rounded-lg mb-2 w-1/3"
        onClick={() => {
          setIssueBtn("Payment_Failure");
          setSelectedBtn("");
          setPaymentBtnBtn(false);
          handleIssueBtn();
        }}
      >
        Failure
      </button>
      <button
        className="bg-blue-200 px-2 rounded-lg mb-2 w-1/3"
        onClick={() => {
          setIssueBtn("Double_Payment");
          setSelectedBtn("");
          setPaymentBtnBtn(false);
          handleIssueBtn();
        }}
      >
        Double Payment
      </button>
      <button
        className="bg-blue-200 px-2 rounded-lg w-1/3"
        onClick={() => {
          setIssueBtn("Payment_Auto-reverse");
          setSelectedBtn("");
          setPaymentBtnBtn(false);
          handleIssueBtn();
        }}
      >
        Auto-reverse
      </button>
    </div>
  );
};

export default Issuebtn;
