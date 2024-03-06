import React from 'react';
import { useState } from 'react';
import HomePage from './HomePage';


function Login(){


    const [username, setUsername] = useState(''); 
    const [password, setPassword] = useState('');
 

    const handleSubmit = async (event) => {
        event.preventDefault();
        
    };


    return(

        <div>
            <HomePage />
            
       
<div className="main" id="login_main">
        <form id="login_form" onSubmit={handleSubmit}>
          <h2>Login</h2>
          <div id="login_inputs">
          <label class="descriptioLabel">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Username"
              autoComplete="off"
              className="login_inputs"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              required
            />

            <div className="form_group">
            <label class="descriptioLabel">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                className="login_inputs"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />
            </div>
          </div>

          <div className="form_group">
            <button type="submit" id="btn_login">Login</button>
          </div>
        </form>
        <div id="signup">Don't have an account? <a href="/register">Sign up</a></div>
      </div>

      </div>
    )

}

export default Login;



