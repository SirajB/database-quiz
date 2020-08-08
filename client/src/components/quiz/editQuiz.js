import React, { Fragment, useState } from "react";

const EditQuiz = ({ quiz }) => {
  const [title, setTitle] = useState(quiz.title);

  //edit quiz
  const updateQuiz = async (e) => {
    e.preventDefault();
    try {
      const body = { title };
      const response = await fetch(`http://localhost:3000/quiz/${quiz.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      console.log(response);
    } catch (error) {
      console.error(error.message);
    }
  };
  return (
    <Fragment>
      <button
        type="button"
        className="btn btn-warning"
        data-toggle="modal"
        data-target={`#id${quiz.id}`}
      >
        Edit
      </button>

      <div
        className="modal"
        id={`id${quiz.id}`}
        onClick={() => setTitle(quiz.title)}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Edit Quiz</h4>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                onClick={() => setTitle(quiz.title)}
              >
                &times;
              </button>
            </div>

            <div className="modal-body">
              <input
                type="text"
                className="form-control"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              ></input>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-warning"
                data-dismiss="modal"
                onClick={(e) => updateQuiz(e)}
              >
                Edit
              </button>
              <button
                type="button"
                className="btn btn-danger"
                data-dismiss="modal"
                onClick={() => setTitle(quiz.title)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default EditQuiz;
