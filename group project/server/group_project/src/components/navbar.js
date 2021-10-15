import React from 'react';
import { NavLink } from "react-router-dom";
import '../css/Navbar.css';

//Navbar function, returns a navbar that allows you to switch between pages.
function Navbar() {
    return (
        <div className="navbardiv">
            <ul>
                <li><NavLink exact to='/' className="textdecoration">Home</NavLink></li>
                <li><NavLink to='associatespage' className="textdecoration">Associates Page</NavLink></li>
                <li><NavLink to='clerkpage1' className="textdecoration">Clerks Page 1</NavLink></li>
                <li><NavLink to='clerkpage2' className="textdecoration">Clerks Page 2</NavLink></li>
                <li><NavLink to='adminpage' className="textdecoration">Admins Page</NavLink></li>
            </ul>
        </ div>
    );
}

export default Navbar