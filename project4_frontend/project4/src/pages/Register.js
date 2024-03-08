
import MainPage from '../components/MainPage';
import { useState } from 'react';



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
  alert("Account registered successfully!")

window.location.href = 'login.html';
   
} else {
  switch (response.status) {
      case 422:
          const errorData = await response.text();
          switch (errorData) {
              case "There's an empty field, fill all values":
                  alert("Please fill all fields");
                  break;
              case "Invalid email":
                  alert("The email you used is not valid");
                  break;
              case "Image URL invalid":
                  alert("Image url provided not valid");
                  break;
              case "Invalid phone number":
                  alert("The phone number is not valid");
                  break;
              default:
                  console.error('Unknown error message:', errorData);
                  alert("Something went wrong");
          }
          break;
      case 409: 
          alert("Username already in use");
          break;
      default:
          alert("Something went wrong");
  }
}
} catch (error) {
console.error('Error:', error);
alert("Something went wrong");
}
    };

   
    return( 

        <div>
        <MainPage/>
        
        <div className='form_register'>
         <form id="form_register" >
            <h2>Account creation</h2>
            <label htmlFor="register_username" className="descriptioLabel">Username</label>
            <input type="text" placeholder="Username" className="register_elem" id="register_username" 
            value={username} onChange={(event) => setUsername(event.target.value)} required />
            <label htmlFor="register_password" className="descriptioLabel">Password</label>
            <input type="text" placeholder="Password" className="register_elem" id="register_password"
            value={password} onChange={(event) => setPassword(event.target.value)} required />
            <label htmlFor="register_email" className="descriptioLabel">Email</label>
            <input type="email" placeholder="Email" className="register_elem" id="register_email"
            value={email} onChange={(event) => setEmail(event.target.value)} required />
            <label htmlFor="register_firstName" className="descriptioLabel">First Name</label>
            <input type="text" placeholder="First name" className="register_elem" id="register_firstName"
            value={firstName} onChange={(event) => setFirstName(event.target.value)} required />
            <label htmlFor="register_lastName" className="descriptioLabel">Last Name</label>
            <input type="text" placeholder="Last name" className="register_elem" id="register_lastName" 
            value={lastName} onChange={(event) => setLastName(event.target.value)} required />
            <label htmlFor="register_phone" className="descriptioLabel">Phone Number</label>
            <input type="text" placeholder="Phone number" className="register_elem" id="register_phone" 
            value={phoneNumber} onChange={(event) => setPhoneNumber(event.target.value)}required />
            <label htmlFor="register_photo_amin"className="descriptioLabel">URL Image</label>
            <input type="url" placeholder="Img URL" className="register_elem" id="register_photo_main"
            value={imgURL} onChange={(event) => setImageURL(event.target.value)} required />
            <button className="register_elem" id="register_submit" onClick={handleSubmit} >Confirm</button>
            
         </form>
      </div>
      </div>

    )
}

export default Register;