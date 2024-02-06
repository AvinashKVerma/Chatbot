import React, { useContext } from "react";
import { Button } from "../Assests/Button";
import ChatContext from "../../context/ChatContext";
import { helpButton } from "../Assests/Constants";

const HelpButton = ({ setClgList }) => {
  const { helpBtn, helpSubBtn, setHelpSubBtn, setHelpbtn } =
    useContext(ChatContext);

  return (
    <>
      {helpBtn === true && (
        <div className="flex flex-col">
          {Object.keys(helpButton).map((btnTitle, i) => (
            <Button
              key={i}
              btnTitle={btnTitle}
              setHelpbtn={setHelpbtn}
              setHelpSubBtn={setHelpSubBtn}
            />
          ))}
        </div>
      )}
      {helpSubBtn && (
        <div className="mt-2 flex flex-col items-end">
          {helpButton[helpSubBtn].map((buttonText, j) => (
            <div key={j}>
              <button
                className="bg-blue-200 px-2 rounded-lg mb-2 w-1/2"
                onClick={() => {
                  setHelpbtn(false);
                  setClgList(true);
                }}
              >
                {buttonText}
              </button>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default HelpButton;
