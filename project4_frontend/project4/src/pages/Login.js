
import { useState } from 'react';
import MainPage from '../components/MainPage';
import { userStore } from '../stores/UserStore'; 
import { FaUserCircle } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import '../format/login.css';


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
            
            
                NotificationManager.success("Welcome to AgileUp");
                setTimeout(() => {
                    window.location.href = '/principalPage';
                }, 1000);
               
             
            } else {
                NotificationManager.warning("Wrong username or password");
            }
        } catch (error) {
            console.log(error);
        }
    };

    return(
        <div className="pageLogin" id="page_login">
            <MainPage/>
             <NotificationContainer className="notification-container"/>
            <div className="main" id="login_main">
                <form id="login_form" onSubmit={handleSubmit}>
                    <h2 className="signin-header"> <FaUserCircle className='imgLogin'/>Sign In </h2>
                    
                    <div id="login_inputs">
                        <label className="descriptioLabel"><FaUser/>Username </label>
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
                            <label className="descriptioLabel"><RiLockPasswordFill/>Password</label>
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
                <div id="signup">Don't have an account?<a className="signUp" href="/register" >REGISTER HERE</a></div>
            </div>
        </div>
    )
}

export default Login;