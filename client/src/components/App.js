import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import NavBar from "./NavBar";
import Home from "./Home";
import Requests from "./Requests";
import Clients from "./Clients";
import Pets from "./Pets";

function App() {
  return (
    <div>
      <div>Mobile Dog Care</div>
      <NavBar />
      <Switch>
        <Route exact path='/'>
          <Home />
        </Route>
        <Route exact path='/requests'>
          <Requests />
        </Route>
        <Route exact path='/clients'>
          <Clients />
        </Route>
        <Route exact path='/pets'>
          <Pets />
        </Route>
      </Switch>
    </div>
  )
}

export default App;
