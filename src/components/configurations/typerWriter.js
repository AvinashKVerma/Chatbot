export const typewriterEffect = (
  text,
  onTypingComplete,
  setMessages,
  writingRef
) => {
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
