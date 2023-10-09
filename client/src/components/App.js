import { Switch, Route } from "react-router-dom";
import NavBar from "./NavBar";
import Home from "./Home";
import Requests from "./Requests";
import Clients from "./Clients";
import Pets from "./Pets";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div>
      <div className="centered-div-title">Mobile Dog Care</div>
      <NavBar styles={{center: 'auto'}} />
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
      <ToastContainer />
    </div>
  )
}

export default App;
