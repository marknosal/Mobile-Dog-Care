import React from "react";
import { NavLink } from "react-router-dom";

function NavBar() {
    return (
        <div className="navbar">
            <NavLink to='/'>Home</NavLink>
            <NavLink to='/requests'>Requests</NavLink>
            <NavLink to='/clients'>Clients</NavLink>
            <NavLink to='/pets'>Pets</NavLink>
        </div>
    )
}

export default NavBar;
