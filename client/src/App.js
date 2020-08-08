import React, { Fragment } from "react";
import "./App.css";

//components
import InputQuiz from "./components/quiz/inputQuiz";
import ListQuiz from "./components/quiz/listQuiz";

function App() {
  return (
    <Fragment>
      <div className="container">
        <InputQuiz />
        <ListQuiz />
      </div>
    </Fragment>
  );
}

export default App;
