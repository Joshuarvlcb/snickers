import React from "react";
import Cookie from "js-cookie";
const login = () => {
  return (
    <>
      <h1>login </h1>
      <input type="text" />
      <input type="text" />
      <button
        onClick={() =>
          Cookie.set("token", "oihdsfkdskfnoksdfnojnefdo38732984793824")
        }
      >
        submit
      </button>
    </>
  );
};

export default login;
