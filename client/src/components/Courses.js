import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Courses = ({ context, history }) => {
  //const [errors, setErrors] = useState([]);
  //creating state properties
  const [courses, setCourses] = useState([]);


  //useEffect fetches data from the context.data.getCourses which is a function in the data.js that retrieves the data from the url endpoint
  useEffect(() => {
    const getCourses = async () => {
      try {
        const courses = await context.data.getCourses();
        if (courses === null) {
          console.log(["No Courses Found !"]);
        } else {
          setCourses(courses);
        }
      } catch (error) {
        console.log(error);
        history.push("/error");
      }
    };

    let unmounted = false;
    if (!unmounted) {
      getCourses();
    }

    return () => (unmounted = true);
  }, []);

  return (
    <main>
      <div className="wrap main--grid">
        {courses.map((course) => ( //gives and index key for each course
          <Link
            to={`/courses/${course.id}`}
            className="course--module course--link"
            key={course.id}
          >
            <h2 className="course--label">Course</h2>
            <h3 className="course--title">{course.title}</h3>
          </Link>
        ))}

        <Link
          className="course--module course--add--module"
          to={"/courses/create"}
        >
          <span className="course--add--title">
            <svg
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              viewBox="0 0 13 13"
              className="add"
            >
              <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon>
            </svg>{" "}
            New Course
          </span>
        </Link>
      </div>
    </main>
  );
};

export default Courses;
