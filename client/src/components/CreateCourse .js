import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { Context } from "./Context";
import Form from "./Form";

function CreateCourse() {
    let history = useHistory(); 
    const context = useContext(Context); 
    const authUser = context.authenticatedUser; 
    console.log(authUser);

    const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [estimatedTime, setEstimatedTime] = useState("");
  const [materialsNeeded, setMAterialsNeeded] = useState("");
  const [errors, setErrors] = useState([]);

  const change = (e) => {
    const value = e.target.value; //stored the event.target.value of any given change in a variable named value
    switch (e.target.name) {
      case "title":
        setTitle(value);
        break;
      case "description":
        setDescription(value);
        break;
      case "estimatedTime":
        setEstimatedTime(value);
        break;
      case "materialsNeeded":
        setMAterialsNeeded(value);
        break;
      default:
        return;
    }
  };
  const submit = () => {
    //value to be passed into the createCourse function
    const emailAddress = authUser.emailAddress;
    const password = authUser.password;
    const userId = authUser.id;

    console.log(authUser);

    const course = {
      title,
      description,
      estimatedTime,
      materialsNeeded,
      userId,
    };

    context.data
      .createCourse(course, emailAddress, password)
      .then((res) => {
        if (res.errors) {
          setErrors(res.errors);
        }
      })
      .catch(() => {
        history.push("/");
      });
  };

  const cancel = () => {
    history.push("/");
  };

  return (
    <main>
      <div className="wrap">
        <h2>Create Course</h2>
        <Form
          cancel={cancel}
          errors={errors}
          submit={submit}
          submitButtonText="Create Course"
          elements={() => (
            <React.Fragment>
              <div className="main--flex">
                <div>
                  <label htmlFor="title">Course Title</label>
                  <input
                    id="title"
                    name="title"
                    type="text"
                    value={title}
                    onChange={change}
                  />
                  <p>{`By ${authUser.firstName} ${authUser.lastName}`}</p>
                  <label htmlFor="description">Course Description</label>
                  <textarea
                    id="description"
                    name="description"
                    value={description}
                    onChange={change}
                  />
                </div>
                <div>
                  <label htmlFor="estimatatedTime">Estimated Time</label>
                  <input
                    id="estimatedTime"
                    name="estimatedTime"
                    type="text"
                    value={estimatedTime}
                    onChange={change}
                  />
                  <label htmlFor="Materials Needed">Materials Needed</label>
                  <textarea
                    id="materialsNeeded"
                    name="materialsNeeded"
                    type="text"
                    value={materialsNeeded}
                    onChange={change}
                  />
                </div>
              </div>
            </React.Fragment>
          )}
        />
      </div>
    </main>
  );
}

export default CreateCourse;