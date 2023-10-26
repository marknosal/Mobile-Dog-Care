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
import React, { useEffect, useState } from "react";

export default function App() {
  const [user, setUser] = useState(null)
  const [clients, setClients] = useState([])

  useEffect(() => {
    fetch("/check_session").then((r) => {
      if (r.ok) {
        r.json().then((data) => setUser(data));
      }
    });
  }, []);


    function handleUpdateClientDebt(updatedClient) {
      console.log(updatedClient)
      const updatedClients = clients.map(c => c.id === updatedClient.id ? updatedClient : c)
      setClients(updatedClients)
    }

    function handleAddClient(newClient) {
      setClients([...clients, newClient])
    }

    if (!user) return <Login onLogin={setUser} />;

    return (
      <div>
        {console.log('mark')}
        <div className="centered-div-title">Mobile Dog Care</div>
        <NavBar styles={{ center: 'auto' }} />
        <Switch>
          <Route exact path='/'>
            <Home />
          </Route>
          <Route exact path='/profile'>
            <User user={user} />
          </Route>
          <Route exact path='/requests'>
            <Requests
              onUpdateClientDebt={handleUpdateClientDebt}
            />
          </Route>
          <Route exact path='/clients'>
            <Clients
              clients={clients}
              onSetClients={setClients}
              onAddClient={handleAddClient}
            />
          </Route>
          <Route exact path='/pets'>
            <Pets />
          </Route>
        </Switch>
        <ToastContainer />
      </div>
    )
  }