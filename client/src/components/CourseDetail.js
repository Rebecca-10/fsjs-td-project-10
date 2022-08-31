import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Errors from "./Errors";
import ReactMarkdown from "react-markdown";

//creating a component called coursedetail
export default function CourseDetail({ history, context }) {
  const [errors, setErrors] = useState([]);
  const [course, setCourse] = useState({});

  let { id } = useParams();// params for ID
 
  //useEffect fetches data the context.data.getSingleCourse which is a function in the data.js that retrieves the data from the url endpoint
  useEffect(() => {
    const getCourse = async () => {
      try {
        const courseData = await context.data.getCourse(id);

        if (courseData === null) {
          setErrors(["No Course Found!"]);
        } else {
          // history.push(from);
          setCourse(courseData);
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
  //function fetches data 
  const handleDelete = async (id) => {
    const {emailAddress , password} = context.authenticatedUser;
    const user = {
      emailAddress,
      password,
    };
    // execute delete api. if errors are caught will not delete
    try {
      const deleteCourse = await context.data.deleteCourse(id, user);

      if (deleteCourse === null) {
        setErrors(["Couldn't delete course !"]);
      } else {
        history.push("/");
        console.log("Course Deleted Successfully!");
      }
    } catch (err) {
      console.log(err);
      history.push("/error");
    }
  };
  return (
    <main>
      {errors.length > 0 ? (
        <Errors errors={errors} />
      ) : (
        <>
          <div className="actions--bar">
            <div className="wrap">
              {context?.authenticatedUser &&
                context?.authenticatedUser.id === course?.user?.id && (
                  <>
                    <Link
                      className="button"
                      to={`/courses/${course.id}/update`}
                    >
                      Update Course
                    </Link>
                    <button className="button" onClick={() => handleDelete(id)}>
                      Delete Course
                    </button>
                  </>
                )}

              <Link className="button" to={`/`}>
                Return to List
              </Link>
            </div> 
          </div>
               {/*if no authourised user only show return*/ }

          <div className="wrap">
            <h2>Course Detail</h2>
            <form>
              <div className="main--flex">
                <div>
                  <h3 className="course--detail--title">Course</h3>
                  <h4 className="course--name">{course.title}</h4>
                  <p>
                    By {course?.user?.firstName} {course?.user?.lastName}
                  </p>

                  <ReactMarkdown>{course.description}</ReactMarkdown>
                </div>
                <div>
                  <h3 className="course--detail--title">Estimated Time</h3>
                  <p>{course.estimatedTime}</p>

                  <h3 className="course--detail--title">Materials Needed</h3>
                  <ReactMarkdown>{course.materialsNeeded}</ReactMarkdown>
                </div>
              </div>
            </form>
          </div>
        </>
      )}
    </main>
  );
}
