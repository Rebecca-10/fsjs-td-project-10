import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import "./styles/global.css";
import Header from './components/Header';
import CourseDetail from './components/CourseDetail';
import CreateCourse from './components/CreateCourse';
import UpdateCourse from './components/UpdateCourse';
import Courses from './components/Courses';
import UserSignUp from './components/UserSignUp';
import UserSignIn from './components/UserSignIn';
import UserSignOut from './components/UserSignOut';
import NotFound from './components/NotFound';


import withContext from './Context';
import PrivateRoute from './PrivateRoute';

const HeaderWithContext = withContext(Header);
const CourseDetailWithContext = withContext(CourseDetail);
const CoursesWithContext =withContext(Courses);
const CreateCourseWithContext =withContext(CreateCourse);
const UpdateCourseWithContext =withContext(UpdateCourse);
const UserSignUpWithContext = withContext(UserSignUp);
const UserSignInWithContext = withContext(UserSignIn);
const UserSignOutWithContext = withContext(UserSignOut);


export default () => (
  <Router>
    <div>
      <HeaderWithContext />

      <Switch>
        <Route exact path="/" component={CoursesWithContext} />
        <PrivateRoute exact path="/courses/create" component={CreateCourseWithContext} />
        <PrivateRoute exact path="/courses/:id/update" component={UpdateCourseWithContext} />
        <Route path="/courses/:id" component={CourseDetailWithContext} />
        <Route path="/signin" component={UserSignInWithContext} />
        <Route path="/signup" component={UserSignUpWithContext} />
        <Route path="/signout" component={UserSignOutWithContext} />
        <Route component={NotFound} />
      </Switch>
    </div>
  </Router>
);