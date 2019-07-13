import React from 'react'
import logo from '../../images/motorsinghLogo.png';
import logoR from '../../images/logo.svg';
import '../../css/Header.css';

//Components
import NavbarToggle from './NavbarToggle';

const Header = ({searchTerm}) => {
return (
<nav className ="navbar navbar-inverse navbar-fixed-top" role="navigation">
    <div className="container">
           <NavbarToggle/>
    </div>
</nav>
);

};

export default Header;

