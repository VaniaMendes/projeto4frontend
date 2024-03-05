import React from 'react';

function Login(){

<div className="main" id="login_main">
        <form id="login_form">
          <h2>Login</h2>
          <div id="login_inputs">
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Username"
              autoComplete="off"
              className="login_inputs"
              required
            />

            <div className="form_group">
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                className="login_inputs"
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

}

export default Login;
