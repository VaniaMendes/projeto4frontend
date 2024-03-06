import React from 'react';
import HomePage from './HomePage';
import SideMenu from './components/SideMenu';

function Register(){
    return( 

        <div>
        <HomePage/>
        <SideMenu/>
        

<div class='form_register'>
         <form id="form_register">
            <h2>Account creation</h2>
            <label for="register_username" class="descriptioLabel">Username</label>
            <input type="text" placeholder="Username" class="register_elem" id="register_username" required />
            <label for="register_password" class="descriptioLabel">Password</label>
            <input type="text" placeholder="Password" class="register_elem" id="register_password" required />
            <label for="register_email" class="descriptioLabel">Email</label>
            <input type="email" placeholder="Email" class="register_elem" id="register_email" required />
            <label for="register_firstName" class="descriptioLabel">First Name</label>
            <input type="text" placeholder="First name" class="register_elem" id="register_firstName" required />
            <label for="register_lastName" class="descriptioLabel">Last Name</label>
            <input type="text" placeholder="Last name" class="register_elem" id="register_lastName" required />
            <label for="register_phone" class="descriptioLabel">Phone Number</label>
            <input type="text" placeholder="Phone number" class="register_elem" id="register_phone" required />
            <label for="register_photo_amin"class="descriptioLabel">URL Image</label>
            <input type="url" placeholder="Img URL" class="register_elem" id="register_photo_main" required />
            <button class="register_elem" id="register_submit">Confirm</button>
            
         </form>
      </div>
      </div>

    )
}

export default Register;