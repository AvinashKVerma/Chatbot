import React, { useContext } from "react";
import Button from "../Assests/Button";
import ChatContext from "../../context/ChatContext";
import CorrectionForm from "./CorrectionForm";

const HelpButton = () => {
  const { helpBtn, setHelpSubBtn, setHelpbtn, correctionForm } =
    useContext(ChatContext);
  return (
    <>
      {Array.isArray(helpBtn) && (
        <div className="flex flex-col">
          {helpBtn.map((btnTitle, i) => {
            return (
              <Button
                key={i}
                btnTitle={btnTitle}
                setHelpbtn={setHelpbtn}
                setHelpSubBtn={setHelpSubBtn}
              />
            );
          })}
        </div>
      )}
      {correctionForm && <CorrectionForm />}
    </>
  );
};

export default HelpButton;
