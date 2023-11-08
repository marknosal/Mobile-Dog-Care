import { Switch, Route } from "react-router-dom";
import NavBar from "./NavBar";
import Login from "./Authenticate/Login";
import Home from "./Home";
import Requests from "./Requests/Requests";
import Clients from "./Clients/Clients";
import Pets from "./Pets/Pets";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import User from "./Users/User";
import React, { useContext } from "react";
import {  UserContext } from "./contexts/UserContext";
import { ClientProvider } from "./contexts/ClientContext";

export default function App() {
  const { user } = useContext(UserContext)

  return (
    <div>
      <div className="centered-div-title">
        <h1>Mobile Dog Care</h1>
      </div>
        {user ? (
          <ClientProvider>
            <NavBar styles={{ center: 'auto' }} />
            <Switch>
              <Route exact path='/'>
                <Home />
              </Route>
              <Route exact path='/profile'>
                <User />
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
            <ToastContainer />
          </ClientProvider>
        ) : (
          <Login />
        )}
    </div>
  );
}