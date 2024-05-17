import './navbar.component.css';

function Navbar() {
  return (
    <div className="navbar">

        <div class="navbar-left">
            <div class="navbar-logo"><svg xmlns="http://www.w3.org/2000/svg" width="3em" height="3em" viewBox="0 0 24 24"><g fill="none" stroke="#ffa646" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M11 19H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v6"/><path d="m3 7l9 6l9-6m-1 14l2-2l-2-2m-3 0l-2 2l2 2"/></g></svg></div>
            <div class="navbar-title">Webmailer</div>
        </div>


        <div class="navbar-right">
        <div class="navbar-item">Docs</div>
        <div class="navbar-item">Source<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><g fill="#3c3c43"><path d="M15.64 7.025h-3.622v-2h7v7h-2v-3.55l-4.914 4.914l-1.414-1.414z"/><path d="M10.982 6.975h-6v12h12v-6h-2v4h-8v-8h4z"/></g></svg></div>
        <div class="navbar-item">Register</div>  
        </div>

    </div>
  );
}

export default Navbar;