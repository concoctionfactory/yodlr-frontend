import React from 'react';
// import './App.css';
import { Switch, Route } from 'react-router-dom'

import Admin from "./components/Admin"
import Users from "./components/Users"
import Navbar from "./components/NavBar"
import UserForm from "./components/UserForm"

function App() {
  return (
    <div className="App ">
      <Navbar ></Navbar>
      <div className=" container">
        <Switch>
          <Route exact path="/signup">
            <UserForm></UserForm>
          </Route>
          <Route exact path="/users/:id/edit">
            <UserForm></UserForm>
          </Route>
          <Route exact path="/users/:id">
            <Users></Users>
          </Route>
          <Route exact path="/admin">
            <Admin></Admin>
          </Route>
          <Route exact path="/">
            <Admin></Admin>
          </Route>
          <Route>
            not found
          </Route>
        </Switch>
      </div>

    </div>
  );
}

export default App;
