
import MainPage from '../components/MainPage';
import { useState } from 'react';
import { FaUserCircle } from "react-icons/fa";
import { NotificationManager } from "react-notifications";
import '../format/register.css';

function Register(){

    const [username, setUsername] = useState(''); 
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState(''); 
    const [imgURL, setImageURL] = useState('');
  
    const handleSubmit = async (event) => {
        event.preventDefault();

        const user = {username: username, 
          password: password,
          email: email,
          firstName: firstName,
          lastName: lastName,
          phoneNumber: phoneNumber,
          imgURL: imgURL,
          typeOfUser: "developer"};
try{
const response = await fetch('http://localhost:8080/project_backend/rest/users/addUserDB', {         
method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(user),
});

if (response.ok) {
    NotificationManager.success("Account registered successfully!");
    setTimeout(() => {
      window.location.href = '/login';
  }, 1000);

   
} else {
  switch (response.status) {
      case 422:
          const errorData = await response.text();
          switch (errorData) {
              case "There's an empty field, fill all values":
                NotificationManager.warning("Please fill all fields");
                  break;
              case "Invalid email":
                NotificationManager.warning("The email you used is not valid");
                  break;
              case "Image URL invalid":
                NotificationManager.warning("Image url provided not valid");
                  break;
              case "Invalid phone number":
                NotificationManager.warning("The phone number is not valid");
                  break;
              default:
                NotificationManager.warning("Please fill all fields");
          }
          break;
      case 409: 
      NotificationManager.warning("Username already in use");
          break;
      default:
        NotificationManager.error("Something went wrong");
  }
}
} catch (error) {
console.error('Error:', error);
NotificationManager.warning("Something went wrong");
}
    };
    return( 

        <div>
        <MainPage/>
       
        
        <div className='form_register'>
         <form id="form_register" >
            <h2 className='register-header'><FaUserCircle className='imgLogin'/>Account Creation</h2>
            <label htmlFor="register_username" className="descriptioLabel">Username <input type="text" placeholder="Enter your username" className="register_elem" id="register_username" 
            value={username} onChange={(event) => setUsername(event.target.value)} required /></label>
            
            <label htmlFor="register_password" className="descriptioLabel">Password <input type="text" placeholder="Enter your password" className="register_elem" id="register_password"
            value={password} onChange={(event) => setPassword(event.target.value)} required /></label>
            
            <label htmlFor="register_email" className="descriptioLabel">Email <input type="email" placeholder="Enter your email" className="register_elem" id="register_email"
            value={email} onChange={(event) => setEmail(event.target.value)} required /></label>
            
            <label htmlFor="register_firstName" className="descriptioLabel">First Name  <input type="text" placeholder="Enter your first name" className="register_elem" id="register_firstName"
            value={firstName} onChange={(event) => setFirstName(event.target.value)} required /></label>
            
            <label htmlFor="register_lastName" className="descriptioLabel">Last Name   <input type="text" placeholder="Enter your last name" className="register_elem" id="register_lastName" 
            value={lastName} onChange={(event) => setLastName(event.target.value)} required /></label>
           
            <label htmlFor="register_phone" className="descriptioLabel">Phone Number   <input type="text" placeholder="Enter your phone number" className="register_elem" id="register_phone" 
            value={phoneNumber} onChange={(event) => setPhoneNumber(event.target.value)}required /></label>
           
            <label htmlFor="register_photo_amin"className="descriptioLabel">URL Image  <input type="url" placeholder="Enter the URL of your image" className="register_elem" id="register_photo_main"
            value={imgURL} onChange={(event) => setImageURL(event.target.value)} required /></label>
            
            <button className="register_elem" id="register_submit" onClick={handleSubmit} >Confirm</button>
        
         </form>
      </div>
      </div>

    )
}

export default Register;