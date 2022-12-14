import React, { useState } from "react";

export default function CreateCourse({ context, history }) {
  //creating state properties
  const [errors, setErrors] = useState([]);
  const [title, setTitle] = useState("");
  const [estimatedTime, setEstimatedTime] = useState("");
  const [materialsNeeded, setMaterialsNeeded] = useState("");
  const [description, setDescription] = useState("");

  const { id, emailAddress, firstName, lastName, password } =
    context.authenticatedUser;//adding authenticated user to created variables 

  const handleSubmit = (e) => {
    // const { context } = this.props;
    // const { name, username, password } = this.state;
    // New user payload
    e.preventDefault();
    const course = {
      userId: id,
      title,
      estimatedTime,
      materialsNeeded,
      description,
    };
    context.data
      .createCourse(course, { emailAddress, password })
      .then((errors) => {
        if (errors.length) {
          setErrors(errors);
        } else {
          history.push("/");
        }
      })
      .catch((err) => {
        // handle rejected promises
        console.log(err);
        history.push("/error"); // push to history stack
      });
  };
  //method to return user  to home page 
  const cancel = () => {
    history.push("/"); 
  };

  return (
    <main>
      <div className="wrap">
        <h2>Create Course</h2>
        {errors.length > 0 ? (
          <div className="validation--errors">
            <h3>Validation Errors</h3>
            <ul>
              {/* <li>Please provide a value for "Title"</li>
            <li>Please provide a value for "Description"</li> */}
              {errors.map((error, i) => (
                <li key={i}>{error}</li>
              ))}
            </ul>
          </div>
        ) : null}
        <form>
          <div className="main--flex">
            <div>
              <label htmlFor="courseTitle">Course Title</label>
              <input
                id="courseTitle"
                name="courseTitle"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />

              <p>
                By {firstName} {lastName}
              </p>

              <label htmlFor="courseDescription">Course Description</label>
              <textarea
                id="courseDescription"
                name="courseDescription"
                onChange={(e) => setDescription(e.target.value)}
                value={description}
              ></textarea>
            </div>
            <div>
              <label htmlFor="estimatedTime">Estimated Time</label>
              <input
                id="estimatedTime"
                name="estimatedTime"
                type="text"
                value={estimatedTime}
                onChange={(e) => setEstimatedTime(e.target.value)}
              />

              <label htmlFor="materialsNeeded">Materials Needed</label>
              <textarea
                id="materialsNeeded"
                onChange={(e) => setMaterialsNeeded(e.target.value)}
                value={materialsNeeded}
                name="materialsNeeded"
              />
            </div>
          </div>
          <button className="button" type="submit" onClick={handleSubmit}>
            Create Course
          </button>
          <button
            className="button button-secondary"
            onClick={cancel}
          >
            Cancel
          </button>
        </form>
      </div>
    </main>
  );
}
