import React from 'react';
import { useState } from 'react';
import MainPage from '../components/MainPage';


function Login(){

    const [username, setUsername] = useState(''); 
    const [password, setPassword] = useState('');
 

    const handleSubmit = async (event) => {
        event.preventDefault();
       const isLogged = await validateUser(username, password);
       if(isLogged) {
         window.location.href = '/scrumBoard';
       }else{
        alert("Invalid username or password");
       }
        
    };

    return(

        <div className = "pageLogin" id="page_login">
            <MainPage/>
            
       
<div className="main" id="login_main">
        <form id="login_form" onSubmit={handleSubmit}>
          <h2>Login</h2>
          <div id="login_inputs">
          <label className="descriptioLabel">Username</label>
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
            <label className="descriptioLabel">Password</label>
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
            <button type="button" id="btn_login" onclick="window.location.href='/scrumBoard'" >Login</button>
          </div>
        </form>
        <div id="signup">Don't have an account? <a classNAme="signUp" href="/register">Sign up</a></div>
      </div>

      </div>
    )

}

export default Login;


//Funcoes
async function validateUser(username, password) {
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

           // Redirecionar para outra página após o login ser bem-sucedido
           window.location.href = "scrum.html";

        } catch (error) {
           console.error("Erro ao analisar a resposta JSON");
        }
     } else if (response.status === 404) {
        alert("Nome de usuário ou senha incorretos");
     } else {
        alert("Algo deu errado :(");
     }
  } catch (error) {
     console.log(error);
  }
}


