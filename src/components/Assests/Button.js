import React from "react";

export const Button = ({ btnTitle, setHelpbtn, setHelpSubBtn }) => {
  return (
    <button
      className="bg-blue-200 rounded-md mt-1"
      onClick={() => {
        setHelpbtn(false);
        setHelpSubBtn(btnTitle);
        // setSelectedBtn("");
        // setPaymentBtnBtn(false);
        // handleIssueBtn();
      }}
    >
      {btnTitle}
    </button>
  );
};
