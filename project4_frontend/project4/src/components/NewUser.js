import React, { useState } from "react";
import { registerUserByPO } from "../endpoints/users";
import { FaUserCircle } from "react-icons/fa";
import { userStore } from "../stores/UserStore";
import "../format/register.css";
import {NotificationManager } from "react-notifications";
import { showModal } from "../stores/boardStore";

function NewUser() {
  const tokenObject = userStore((state) => state.token);
  const tokenUser = tokenObject.token;
  const showNewUserModal = showModal((state) => state.showNewUserModal); 
  const setShowNewUserModal = showModal((state) => state.setShowNewUserModal); 

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [imgURL, setImageURL] = useState("");
  const [typeOfUser, setTypeOfUser] = useState("");


  const closeModal = () => {
    setShowNewUserModal(false);
  };

  const newUser = {
    username: username,
    password: password,
    email: email,
    firstName: firstName,
    lastName: lastName,
    phoneNumber: phoneNumber,
    imgURL: imgURL,
    typeOfUser: typeOfUser,
  };


  const handleSubmit = async (event) => {
    event.preventDefault(); 
    const result = await registerUserByPO(tokenUser, newUser);
    if(result===200){
      NotificationManager.success("New User successfully created", "", 800);
     
      closeModal();
    }else{
      NotificationManager.warning(result, "", 800);
    }
   
  };

  return (

    
        <div className="modal_container">  
      {showNewUserModal && (
        <div className='form_register'>
        <form className="registerPO" id="form_register">
          <h2 className="register-header">
            <FaUserCircle className="imgLogin" />
            Account Creation
          </h2>
          <label htmlFor="register_username" className="descriptioLabel">
            Username{" "}
            <input
              type="text"
              placeholder="Enter your username"
              className="register_elem"
              id="register_username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              required
            />
          </label>

          <label htmlFor="register_password" className="descriptioLabel">
            Password{" "}
            <input
              type="text"
              placeholder="Enter your password"
              className="register_elem"
              id="register_password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </label>

          <label htmlFor="register_email" className="descriptioLabel">
            Email{" "}
            <input
              type="text"
              placeholder="Enter your email"
              className="register_elem"
              id="register_email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </label>

          <label htmlFor="register_firstName" className="descriptioLabel">
            First Name{" "}
            <input
              type="text"
              placeholder="Enter your first name"
              className="register_elem"
              id="register_firstName"
              value={firstName}
              onChange={(event) => setFirstName(event.target.value)}
              required
            />
          </label>

          <label htmlFor="register_lastName" className="descriptioLabel">
            Last Name{" "}
            <input
              type="text"
              placeholder="Enter your last name"
              className="register_elem"
              id="register_lastName"
              value={lastName}
              onChange={(event) => setLastName(event.target.value)}
              required
            />
          </label>

          <label htmlFor="register_phone" className="descriptioLabel">
            Phone Number{" "}
            <input
              type="text"
              placeholder="Enter your phone number"
              className="register_elem"
              id="register_phone"
              value={phoneNumber}
              onChange={(event) => setPhoneNumber(event.target.value)}
              required
            />
          </label>

          <label htmlFor="register_photo_amin" className="descriptioLabel">
            URL Image{" "}
            <input
              type="url"
              placeholder="Enter the URL of your image"
              className="register_elem"
              id="register_photo_main"
              value={imgURL}
              onChange={(event) => setImageURL(event.target.value)}
              required
            />
          </label>

          <label htmlFor="register_photo_amin" className="descriptioLabel">
            Role
            <select
              id="register_typeOfUser"
              name="opcoes"
              value={typeOfUser}
              onChange={(event) => setTypeOfUser(event.target.value)}
            >
              <option value="" >Select a role</option>
              <option value="developer">Developer</option>
              <option value="scrum_master">Scrum Master</option>
              <option value="product_owner">Product Owner</option>
            </select>
          </label>
          <div className="button-container">
            <button
              className="register_elem"
              id="registerPO_submit"
              onClick={handleSubmit}
            >
              Save
            </button>
            <button
              className="register_elem"
              id="registerPO_submit"
              onClick={closeModal}
            >
              Cancel
            </button>
          </div>
        </form>
        </div>
  
      )}
      ;
    </div>
  );
}

export default NewUser;
