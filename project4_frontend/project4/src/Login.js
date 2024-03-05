import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function Login(){

    const [username, setUsername] = useState(''); 
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
       
        const isValid = await validateUser(username, password); 
            if (isValid) {
         
            navigate("/components/SideMenu",{replace:true}); 
        }
        else{
            alert("Invalid username or password");
        }
    };
    return(

<div className="main" id="login_main">
        <form id="login_form" onSubmit={handleSubmit}>
          <h2>Login</h2>
          <div id="login_inputs">
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
        <div id="signup">Don't have an account? <a href="register.html">Sign up</a></div>
      </div>
    )

}

export default Login;



const validateUser = async (username, password) => {
    setLoading(true);
    const user = { username: username, password: password };
    try {
        const response = await fetch(
            "http://localhost:8080/project_backend/rest/users/login",
            {
                method: "POST",
                headers: {
                    Accept: "*/*",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(user),
            }
        );
        if (response.ok) {
            try {
                const data = await response.json();
                const token = data.token;
                sessionStorage.setItem("token", token);
            } catch (error) {
                console.error("Error parsing JSON response");
            }
        } else if (response.status === 404) {
            alert("Wrong username or password");
        } else {
            alert("Something went wrong :(");
        }
    } catch (error) {
        console.log(error);
    }
   
};