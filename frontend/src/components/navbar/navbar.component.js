import './navbar.component.css';
import { useState } from 'react';

function Navbar() {

  const [isDropdownVisible, setIsDropdownVisible] = useState(false); 
  const toggleDropdown = () => setIsDropdownVisible(!isDropdownVisible);

  return (
    <div className="navbar">

        <div class="navbar-left">
          <a href="/">
            <div class="navbar-logo"><svg xmlns="http://www.w3.org/2000/svg" width="3em" height="3em" viewBox="0 0 24 24"><g fill="none" stroke="#ffa646" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M11 19H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v6"/><path d="m3 7l9 6l9-6m-1 14l2-2l-2-2m-3 0l-2 2l2 2"/></g></svg></div>
            <div class="navbar-title">Webmailer</div>
          </a>
        </div>


        <div class="navbar-right">

        <div class="navright-original">
        <div class="navbar-item"><a href="https://github.com/d4nh-Le/webmailer" target='blank'>Source</a><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><g fill="#3c3c43"><path d="M15.64 7.025h-3.622v-2h7v7h-2v-3.55l-4.914 4.914l-1.414-1.414z"/><path d="M10.982 6.975h-6v12h12v-6h-2v4h-8v-8h4z"/></g></svg></div>
        <div class="navbar-item"><a href="#register-container-title">Sign Up</a></div> 
        </div>

        <div class="navright-dropdown">
        <div className="dropdown-icon" onClick={toggleDropdown}>
        <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 16 16"><path fill="none" stroke="#ff9f39" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M2.75 12.25h10.5m-10.5-4h10.5m-10.5-4h10.5"/></svg>
        </div>

        {isDropdownVisible && (
        <div className="dropdown-menu show">
         <div class="navbar-item"><a href="https://github.com/d4nh-Le/webmailer" target='blank'>Source</a><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><g fill="#3c3c43"><path d="M15.64 7.025h-3.622v-2h7v7h-2v-3.55l-4.914 4.914l-1.414-1.414z"/><path d="M10.982 6.975h-6v12h12v-6h-2v4h-8v-8h4z"/></g></svg></div>
         <div class="navbar-item"><a href="#register-container-title">Sign Up</a></div> 
        </div>
        )}
        </div>
        </div>

    </div>
  );
}

export default Navbar;