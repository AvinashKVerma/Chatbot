import React from "react";

const CorrectionForm = ({ field }) => {
  return (
    <div className="flex flex-wrap">
      <label className="p-2 mb-2 w-full">
        Incorrect Mother's Name
        <input type="text" className="ml-2 border border-black" />
      </label>
      <label className="p-2 w-full">
        Correct Mother's Name
        <input type="text" className="ml-2 border border-black" />
      </label>
      <label className="p-2 w-full">
        College Code
        <input type="text" className="ml-2 border border-black" />
      </label>
      <label className="p-2 w-full">
        Registration Number
        <input type="text" className="ml-2 border border-black" />
      </label>
    </div>
  );
};

export default CorrectionForm;
