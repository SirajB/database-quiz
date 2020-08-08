import React, { Fragment, useEffect, useState } from "react";
import EditQuiz from "./editQuiz";

const ListQuiz = () => {
  const [quizzes, setQuiz] = useState([]);

  //delete quiz

  const deleteQuiz = async (id) => {
    try {
      const deleteQuiz = await fetch(`http://localhost:3000/quiz/${id}`, {
        method: "DELETE",
      });

      setQuiz(quizzes.filter((quiz) => quiz.id !== id));
    } catch (error) {
      console.error(error.message);
    }
  };

  const getQuizzes = async () => {
    try {
      const response = await fetch("http://localhost:3000/quiz");
      const jsonData = await response.json();

      setQuiz(jsonData);
    } catch (error) {
      console.error(error.message);
    }
  };
  useEffect(() => {
    getQuizzes();
  }, []);

  console.log(quizzes);

  return (
    <Fragment>
      <table className="table mt-5 text-center">
        <thead>
          <tr>
            <th>Quiz Name</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {/* <tr>
            <td>John</td>
            <td>Doe</td>
            <td>john@example.com</td>
          </tr> */}
          {quizzes.map((quiz) => (
            <tr key={quiz.id}>
              <td>{quiz.title}</td>
              <td>
                <EditQuiz quiz={quiz} />
              </td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteQuiz(quiz.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Fragment>
  );
};

export default ListQuiz;
