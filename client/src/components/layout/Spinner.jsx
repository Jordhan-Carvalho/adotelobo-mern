import React from "react";
import spinner from "../../img/spinner.gif";

const Spinner = () => {
  return (
    <>
      <img src={spinner} className="loader__image" alt="Loading..." />
    </>
  );
};

export default Spinner;
