import React from 'react';
import { Link } from 'react-router-dom';

import logo from '../../assets/facebook-logo.jpg'
import './Header.css';

import MyProfile from '../../components/MyProfile/MyProfile'

function Header(){
  return(
    <div id="header">
      <a href="/"><img id="logo" src={logo}/></a>
      <MyProfile />
    </div>
  );
}

export default Header;