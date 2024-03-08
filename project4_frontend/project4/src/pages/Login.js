
import { useState } from 'react';
import MainPage from '../components/MainPage';
import { userStore } from '../stores/UserStore'; 


function Login(){

    const [username, setUsername] = useState(''); 
    const [password, setPassword] = useState('');
  

    const handleSubmit = async (event) => {
        event.preventDefault(); 
        const user = { username: username, password: password };
        console.log(user);
        try {
            const response = await fetch( "http://localhost:8080/project_backend/rest/users/login", {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user),
            });

            if (response.ok) {
                console.log(response.status);
                const token = await response.json();
                console.log(token);
                userStore.getState().setToken(token);
                console.log(user);
                alert("Welcome to AgileUp")
               
                window.location.href = './scrumBoard'
            } else {
                alert("Wrong username or password");
            }
        } catch (error) {
            console.log(error);
        }
    };

    return(
        <div className="pageLogin" id="page_login">
            <MainPage/>
            <div className="main" id="login_main">
                <form id="login_form" >
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
                        <button type="submit" id="btn_login" onClick={handleSubmit}>Login</button> 
                    </div>
                </form>
                <div id="signup">Don't have an account? <a className="signUp" href="/register" >Sign up</a></div>
            </div>
        </div>
    )
}

export default Login;
