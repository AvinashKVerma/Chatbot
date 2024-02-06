import React, { useState, useEffect, useRef, useContext } from "react";
import { IoIosHelpCircle } from "react-icons/io";
import { RiSendPlaneFill } from "react-icons/ri";
import { FaRegStopCircle } from "react-icons/fa";
import "./Chat.css";
import Message from "../Message";
import Issuebtn from "../Issuebtn";
import SpeechToTextButton from "../hooks/SpeechToTextButton";
import { collgeList } from "../Assests/Constants";
import { getCookie, setCookie } from "../configurations/cookies";
import Feedback from "./Feedback";
import ChatContext from "../../context/ChatContext";
import HelpButton from "./HelpButton";

export const Chat = () => {
  const {
    messages,
    setMessages,
    paymentBtn,
    setPaymentBtnBtn,
    userId,
    setUserId,
    setHelpbtn,
    setHelpSubBtn,
  } = useContext(ChatContext);
  const [inputText, setInputText] = useState("");
  const [selectedBtn, setSelectedBtn] = useState("");
  const [issueBtn, setIssueBtn] = useState("");
  const [initialMsg, setInitialMsg] = useState(false);
  const [clgList, setClgList] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [writing, setWriting] = useState(false);
  const [user, setUser] = useState({
    name: "",
    email: "",
  });
  const isSpeechRecognitionSupported =
    "SpeechRecognition" in window || "webkitSpeechRecognition" in window;

  const writingRef = useRef(false);

  useEffect(() => {
    const getCookieData = JSON.parse(getCookie("userInfo"));
    if (getCookieData) {
      setUser({
        name: getCookieData.user_name,
        email: getCookieData.user_email,
      });
      (async () => {
        const url = "http://192.168.88.38:5005/New_user";
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(getCookieData),
        });
        const responseData = await response.json();
        if (
          responseData.message ===
          `Hello, ${getCookieData.user_name}, how can I help you today?`
        ) {
          setInitialMsg(true);
          setMessages((prevMessages) => [
            ...prevMessages,
            { text: responseData.message, sender: "assistant" },
          ]);
        }
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const typewriterEffect = (text, onTypingComplete) => {
    let i = 0;
    const delay = 50;
    setMessages((prevMessages) => [
      ...prevMessages,
      {
        text: "",
        sender: "assistant",
      },
    ]);

    function typeNextChar() {
      if (i < text.length && writingRef.current) {
        const updatedMessage = {
          text: text.slice(0, i + 1),
          sender: "assistant",
        };

        setMessages((prevMessages) => [
          ...prevMessages.slice(0, -1), // Remove the last message
          updatedMessage,
        ]);

        i++;
        setTimeout(typeNextChar, delay);
      } else {
        // Typing is complete or stopped, execute the callback
        onTypingComplete();
      }
    }

    typeNextChar(); // Start the typing process
  };

  const stopTypingEffect = () => {
    writingRef.current = false; // Update the mutable object
  };

  const handleSendMessage = async (input) => {
    if (!input) {
      if (inputText.trim() === "") return;
    }

    const userMessage = { text: input ? input : inputText, sender: "user" };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setLoading(true);

    try {
      const url = "http://192.168.88.38:5005/webhook";
      const data = {
        message: {
          text: input ? input : inputText,
        },
        user_email: user.email, // Add this line to include user_email in the payload

        user_id: userId,
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
      let responseData;

      if (response.status === 200) {
        writingRef.current = true;
        responseData = await response.json();
      }
      const assistantMessage = {
        text: responseData.message.trim(),
        sender: "assistant",
      };
      if (assistantMessage.text === "Choose Payment purpose:-") {
        setPaymentBtnBtn(true);
      }
      if (
        assistantMessage.text ===
        "I can help you with your to solve your querry about university. You can ask me things like:"
      ) {
        setHelpSubBtn("");
        setHelpbtn(true);
      } else {
        setHelpbtn(false);
      }
      if (
        assistantMessage.text ===
        "Thanks for providing your name and email. You can now start the chat!"
      ) {
        setInitialMsg(true);
      }
      if (
        assistantMessage.text ===
        "Please provide a valid name and email to start the chat."
      ) {
        setInitialMsg("invalid");
      }
      // setMessages((prevMessages) => [
      //   ...prevMessages,
      //   { text: assistantMessage.text, sender: "assistant" },
      // ]);

      // Apply typewriter effect to assistant message
      setWriting(true);
      typewriterEffect(assistantMessage.text, () => {
        setWriting(false); // Set writing to false when typing is complete
      });
    } catch (error) {
      console.error("Error:", error.message);
    }

    setLoading(false);
    setInputText("");
  };

  const handleFirstMsg = async () => {
    try {
      const url = "http://192.168.88.38:5005/start_chat";
      const data = {
        user_name: user.name,
        user_email: user.email,
      };

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const responseData = await response.json();

      if (response.status === 400) {
        window.alert(responseData.error);
      }

      if (
        responseData.message === `Hey, ${user.name} How can I assist you today?`
      ) {
        const setCookieData = JSON.stringify({
          user_id: responseData.user_id,
          user_name: user.name,
          user_email: user.email,
        });

        setCookie("userInfo", setCookieData);
        setInitialMsg(true);
        setHelpSubBtn("");
        setHelpbtn(true);
        setUserId(responseData.user_id);
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: responseData.message, sender: "assistant" },
        ]);
      }
      if (
        responseData.message ===
        `Hey, ${user.name} Welcome back! I'm here to help. Feel free to ask me anything.`
      ) {
        const setCookieData = JSON.stringify({
          user_id: responseData.user_id,
          user_name: user.name,
          user_email: user.email,
        });
        setCookie("userInfo", setCookieData);
        setInitialMsg(true);
        setHelpSubBtn("");
        setHelpbtn(true);
        setUserId(responseData.user_id);
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: responseData.message, sender: "assistant" },
        ]);
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  return (
    <div className="max-w-md mx-auto p-2 pb-0 bg-gray-100 rounded-md shadow-md flex flex-col h-full">
      <div className="bg-white pt-2 pb-2">
        <h1 className="text-4xl font-semibold mb-4 text-center text-purple-700">
          AssistantX
        </h1>
        <div className="mb-4 text-sm text-gray-600 text-center">
          Please ask about the education domain only.
        </div>
      </div>
      <div className="message-container max-h-[400px] overflow-y-scroll p-2">
        {initialMsg !== true && (
          <div className="flex container flex-col w-full bg-[#f4f6f6] rounded-lg p-3 box-border">
            <span className="my-1">
              Hey! How can I help you today? Please provide your email and name.
            </span>
            <input
              className="my-1 border p-1 border-[#e6ebea] rounded-md"
              type="text"
              value={user.name}
              onChange={(e) => {
                setUser((prevData) => ({
                  ...prevData,
                  name: e.target.value,
                }));
              }}
              placeholder="Name"
            />
            <input
              className="my-1 border p-1 border-[#e6ebea] rounded-md"
              type="text"
              value={user.email}
              onChange={(e) => {
                setUser((prevData) => ({
                  ...prevData,
                  email: e.target.value,
                }));
              }}
              placeholder="Email"
            />
            <button
              className="text-[#96aab4] border border-[#e6ebea] rounded-md w-12 self-center"
              onClick={handleFirstMsg}
            >
              Save
            </button>
          </div>
        )}
        {messages.map((message, index) => (
          <Message key={index} text={message.text} sender={message.sender} />
        ))}
        {loading && (
          <div className="message text-left p-2 my-1 rounded-md bg-red-200 text-gray-800">
            Loading...
          </div>
        )}
        {paymentBtn === true && (
          <div className="flex flex-col">
            <button
              className="bg-blue-200 rounded-md mt-1"
              onClick={() => setSelectedBtn("Examination Form")}
            >
              Examination Form
            </button>
            {selectedBtn === "Examination Form" && (
              <Issuebtn
                setWriting={setWriting}
                setSelectedBtn={setSelectedBtn}
                setIssueBtn={setIssueBtn}
                issueBtn={issueBtn}
                setMessages={setMessages}
                typewriterEffect={typewriterEffect}
                setPaymentBtnBtn={setPaymentBtnBtn}
              />
            )}
            <button
              className="bg-blue-200 rounded-md mt-1"
              onClick={() => setSelectedBtn("Admission Form")}
            >
              Admission Form
            </button>
            {selectedBtn === "Admission Form" && (
              <Issuebtn
                setWriting={setWriting}
                setSelectedBtn={setSelectedBtn}
                setIssueBtn={setIssueBtn}
                issueBtn={issueBtn}
                setMessages={setMessages}
                typewriterEffect={typewriterEffect}
                setPaymentBtnBtn={setPaymentBtnBtn}
              />
            )}
            <button
              className="bg-blue-200 rounded-md mt-1"
              onClick={() => setSelectedBtn("Admit Card")}
            >
              Admit Card
            </button>
            {selectedBtn === "Admit Card" && (
              <Issuebtn
                setWriting={setWriting}
                setSelectedBtn={setSelectedBtn}
                setIssueBtn={setIssueBtn}
                issueBtn={issueBtn}
                setMessages={setMessages}
                typewriterEffect={typewriterEffect}
                setPaymentBtnBtn={setPaymentBtnBtn}
              />
            )}
          </div>
        )}
        <HelpButton setClgList={setClgList} />
        {clgList && (
          <div className="flex flex-col">
            {collgeList.map((ele, i) => {
              return (
                <button
                  key={i}
                  className="bg-blue-200 px-2 rounded-lg mb-2 "
                  onClick={() => {
                    setClgList(false);
                    handleSendMessage(ele);
                  }}
                >
                  {ele}
                </button>
              );
            })}
          </div>
        )}
      </div>
      <div className="bg-white p-0 mt-auto">
        {isDropdownOpen && (
          <Feedback setMessages={setMessages} setHelpbtn={setHelpbtn} />
        )}
        <div className={`mb-2`}>
          <div
            onClick={() => setDropdownOpen(!isDropdownOpen)}
            className="flex justify-between items-center px-4 mb-1 cursor-pointer p-2 rounded-md"
          >
            <p className="text-[#027BFF] text-xs font-normal">
              {isDropdownOpen ? "Hide Option" : "Choose Option"}
            </p>
            <button className="ml-2 mr-2">
              <span className="mr-1"></span>
              <i
                className="arrow ml-2"
                style={{
                  transform: isDropdownOpen
                    ? "rotate(225deg)"
                    : "rotate(45deg)",
                  // transform: isDropdownOpen
                  //   ? "rotate(-135deg)"
                  //   : "rotate(45deg)",
                }}
              ></i>
            </button>
          </div>
          <div className="flex">
            <button
              className="flex justify-center items-center text-white"
              onClick={() => {
                setHelpSubBtn("");
                setClgList(false);
                handleSendMessage("help");
              }}
              title="HELP"
            >
              <IoIosHelpCircle fontSize={"45px"} color="#93C5FD" />
            </button>
            <div className="flex border border-gray-400 w-[90%] p-1 rounded-md bg-white">
              <div
                className={isSpeechRecognitionSupported ? "w-4/5" : "w-[90%]"}
              >
                <input
                  className="flex-grow p-2 rounded-l-md focus:ring focus:border-purple-500 w-full"
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSendMessage();
                    }
                  }}
                  placeholder="Type your message..."
                />
              </div>
              <div className="flex">
                {writing ? (
                  <button
                    className="px-[10px] rounded-full mr-1 bg-blue-300"
                    onClick={stopTypingEffect}
                  >
                    <FaRegStopCircle fontSize={"20px"} color="white" />
                  </button>
                ) : (
                  <button
                    className="px-[10px] rounded-full mr-1 ml-2 bg-blue-300"
                    onClick={() => handleSendMessage()}
                  >
                    <RiSendPlaneFill fontSize={"20px"} color="white" />
                  </button>
                )}
                {isSpeechRecognitionSupported && (
                  <SpeechToTextButton handleSendMessage={handleSendMessage} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
