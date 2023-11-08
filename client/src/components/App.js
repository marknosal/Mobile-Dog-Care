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
import React, { useContext, useState } from "react";
import {  UserContext } from "./contexts/UserContext";

export default function App() {

  const [clients, setClients] = useState([]);
  const { user } = useContext(UserContext)

  function handleUpdateClient(updatedClient) {
    const updatedClients = clients.map(c => c.id === updatedClient.id ? updatedClient : c);
    setClients(updatedClients);
  }

  function handleAddClient(newClient) {
    setClients([...clients, newClient]);
  }

  return (
    <div>
      <div className="centered-div-title">
        <h1>Mobile Dog Care</h1>
      </div>
        {user ? (
          <>
            <NavBar styles={{ center: 'auto' }} />
            <Switch>
              <Route exact path='/'>
                <Home />
              </Route>
              <Route exact path='/profile'>
                <User />
              </Route>
              <Route exact path='/requests'>
                <Requests
                  onUpdateClient={handleUpdateClient}
                />
              </Route>
              <Route exact path='/clients'>
                <Clients
                  clients={clients}
                  onSetClients={setClients}
                  onAddClient={handleAddClient}
                  onUpdateClient={handleUpdateClient}
                />
              </Route>
              <Route exact path='/pets'>
                <Pets />
              </Route>
            </Switch>
            <ToastContainer />
          </>
        ) : (
          <Login />
        )}
    </div>
  );
}