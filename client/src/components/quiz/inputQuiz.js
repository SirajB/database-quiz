import React, { Fragment, useState } from "react";

const InputQuiz = () => {
  const [quizTitle, setQuizTitle] = useState("");

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { quizTitle };
      const response = await fetch("http://localhost:3000/quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      window.location = "/";
    } catch (error) {
      console.error(error.message);
    }
  };
  return (
    <Fragment>
      <h1 className="text-center mt-5">Quiz Portal</h1>
      <form className="d-flex mt-5" onSubmit={onSubmitForm}>
        <input
          type="text"
          className="form-control"
          placeholder="Quiz Title"
          value={quizTitle}
          onChange={(e) => setQuizTitle(e.target.value)}
        ></input>
        <button className="btn btn-success">Add</button>
      </form>
    </Fragment>
  );
};

export default InputQuiz;
