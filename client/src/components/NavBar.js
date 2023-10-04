import React from "react";
import { NavLink } from "react-router-dom";

function NavBar() {
    const navBarStyles = {
        display: "flex",
        justifyContent: "center", // Center horizontally
        backgroundColor: "blue", // Background color
      };

    const linkStyles = {
        display: "inline-block",
        width: "50px",
        padding: "12px",
        margin: "0 6px 6px",
        background: "green",
        textDecoration: "none",
        color: "white",
      };

    return (
        <div className="navbar" style={navBarStyles}>
            <NavLink to='/' exact style={linkStyles} activeStyle={{ background: "pink", }}>
                Home
            </NavLink>
            <NavLink to='/requests' exact style={linkStyles} activeStyle={{ background: "pink", }}>
                Requests
            </NavLink>
            <NavLink to='/clients' exact style={linkStyles} activeStyle={{ background: "pink", }}>
                Clients
            </NavLink>
            <NavLink to='/pets' exact style={linkStyles} activeStyle={{ background: "pink", }}>
                Pets
            </NavLink>
        </div>
    )
}

export default NavBar;
