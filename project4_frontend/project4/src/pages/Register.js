import React from 'react';
import MainPage from '../components/MainPage';

function Register(){
    return( 

        <div>
        <MainPage/>
        

        <div class='form_register'>
         <form id="form_register">
            <h2>Account creation</h2>
            <label for="register_username" className="descriptioLabel">Username</label>
            <input type="text" placeholder="Username" className="register_elem" id="register_username" required />
            <label for="register_password" className="descriptioLabel">Password</label>
            <input type="text" placeholder="Password" className="register_elem" id="register_password" required />
            <label for="register_email" className="descriptioLabel">Email</label>
            <input type="email" placeholder="Email" className="register_elem" id="register_email" required />
            <label for="register_firstName" className="descriptioLabel">First Name</label>
            <input type="text" placeholder="First name" className="register_elem" id="register_firstName" required />
            <label for="register_lastName" className="descriptioLabel">Last Name</label>
            <input type="text" placeholder="Last name" className="register_elem" id="register_lastName" required />
            <label for="register_phone" className="descriptioLabel">Phone Number</label>
            <input type="text" placeholder="Phone number" className="register_elem" id="register_phone" required />
            <label for="register_photo_amin"className="descriptioLabel">URL Image</label>
            <input type="url" placeholder="Img URL" className="register_elem" id="register_photo_main" required />
            <button class="register_elem" id="register_submit">Confirm</button>
            
         </form>
      </div>
      </div>

    )
}

export default Register;