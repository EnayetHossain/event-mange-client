import React, { useState } from 'react';
import "./Navbar.css";

const Navbar = () => {
    const [open, setOpen] = useState(false);
    console.log(open);
    return (
        <div className='navbar desktop-max'>

            <div className='logo'>Ev<span className='blue'>ent</span>M<span className='blue'>ang</span>e</div>

            <div onClick={()=> setOpen(!open)} className='ham-bar'>
                <div className={`bar ${!open ? "" : "bar-active"}`}></div>
            </div>
            
        </div>
    );
};

export default Navbar;