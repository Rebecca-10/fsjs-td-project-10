import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function UpdateCourse({ context, history }) {
  const [errors, setErrors] = useState([]);
  // const [course, setCourse] = useState({});
  const [title, setTitle] = useState("");
  const [estimatedTime, setEstimatedTime] = useState("");
  const [materialsNeeded, setMaterialsNeeded] = useState("");
  const [description, setDescription] = useState("");

  const {
    id: userId,
    emailAddress,
    firstName,
    lastName,
    password,
  } = context.authenticatedUser;

  let { id } = useParams();
  useEffect(() => {
    const getCourse = async () => {
      try {
        const courseData = await context.data.getCourse(id);
        if (courseData === null) {
          setErrors(["No Course Found!"]);
        } else {
          // history.push(from);
          setTitle(courseData.title);
          setDescription(courseData.description);
          setEstimatedTime(courseData.estimatedTime);
          setMaterialsNeeded(courseData.materialsNeeded);
        }
      } catch (err) {
        console.log(err);
        history.push("/error");
      }
    };

    let unmounted = false;
    if (!unmounted) {
      getCourse();
    }

    return () => (unmounted = true);
  }, []);

  const handleSubmit = (e) => {
    // const { context } = this.props;
    // const { name, username, password } = this.state;
    // New user payload
    e.preventDefault();
    const course = {
      title,
      estimatedTime,
      materialsNeeded,
      description,
    };
    context.data
      .updateCourse(id, course, { emailAddress, password })
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

  return (
    <div className="wrap">
      <h2>Update Course</h2>
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
              onChange={(e) => setTitle(e.target.value)}
              value={title}
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
            />
          </div>
          <div>
            <label htmlFor="estimatedTime">Estimated Time</label>
            <input
              id="estimatedTime"
              name="estimatedTime"
              type="text"
              onChange={(e) => setEstimatedTime(e.target.value)}
              value={estimatedTime}
            />

            <label htmlFor="materialsNeeded">Materials Needed</label>
            <textarea
              id="materialsNeeded"
              name="materialsNeeded"
              onChange={(e) => setMaterialsNeeded(e.target.value)}
              value={materialsNeeded}
            />
          </div>
        </div>
        <button className="button" type="submit" onClick={handleSubmit}>
          Update Course
        </button>
        <button
          className="button button-secondary"
          onClick={(event) => event.preventDefault()}
        >
          Cancel
        </button>
      </form>
    </div>
  );
}
