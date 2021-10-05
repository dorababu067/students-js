import Students from "./components/Students";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AddStudent from "./components/AddStudent";
import Home from "./components/Home";
import UpdateStudent from "./components/UpdateStudent";
import StudentDetails from "./components/StudentDetails";
import NavBar from "./components/NavBar";
import PrivateRoute from "./components/PrivateRoute";
import { Container } from "react-bootstrap";
import AuthContextProvider from "./context/authContext";

function App() {
  return (
    <AuthContextProvider>
      <div className="App">
        <Router>
          <NavBar />
          <Container className="mt-5">
            <Switch>
              <Route exact path="/" component={Home} />
              <PrivateRoute exact path="/students" component={Students} />
              <PrivateRoute exact path="/add/students" component={AddStudent} />
              <PrivateRoute
                exact
                path="/students/:id"
                component={StudentDetails}
              />
              <PrivateRoute
                exact
                path="/update/students/:id"
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
