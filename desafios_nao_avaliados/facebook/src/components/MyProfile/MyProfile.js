import React from 'react';

import { FaUserCircle } from 'react-icons/fa';

import './MyProfile.css';

function MyProfile(){
  return(
    <div id="my_profile">
      <FaUserCircle fontSize="30px" color="White"/>
      <p>Meu perfil</p>
    </div>
  );
}

export default MyProfile;