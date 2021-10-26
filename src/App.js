import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import NavBar from "./components/NavBar";
import PrivateRoute from "./components/PrivateRoute";
import { Container } from "react-bootstrap";
import AuthContextProvider from "./context/authContext";
// school
import CreateSchool from "./components/school/CreateSchool";
import Schools from "./components/school/Schools";
import SchoolDetails from "./components/school/SchoolDetails";
// student
import AddStudent from "./components/students/AddStudent";
import StudentDetails from "./components/students/StudentDetails";
import UpdateStudent from "./components/students/UpdateStudent";

function App() {
  return (
    <AuthContextProvider>
      <div className="App">
        <Router>
          <NavBar />
          <Container className="mt-5">
            <Switch>
              <Route exact path="/" component={Home} />

              <PrivateRoute
                exact
                path="/create/schools/"
                component={CreateSchool}
              />
              <PrivateRoute exact path="/schools/" component={Schools} />
              <PrivateRoute
                exact
                path="/schools/:id/"
                component={SchoolDetails}
              />

              <PrivateRoute
                exact
                path="/add/schools/:id/students"
                component={AddStudent}
              />
              <PrivateRoute
                exact
                path="/schools/:schoolId/students/:studentId"
                component={StudentDetails}
              />
              <PrivateRoute
                exact
                path="/update/schools/:schoolId/students/:studentId"
                component={UpdateStudent}
              />
            </Switch>
          </Container>
        </Router>
      </div>
    </AuthContextProvider>
  );
}

export default App;
