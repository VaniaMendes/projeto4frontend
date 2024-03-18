import React, { useEffect } from "react";
import { useState } from "react";
import {userStore} from '../stores/UserStore';
import { NotificationManager } from "react-notifications";
import 'react-notifications/lib/notifications.css';
import { useNavigate  } from 'react-router-dom';
import { getUserByToken } from "../endpoints/users";
import MenuProductOwner from "./MenuProductOwner";

function EditProfile(){

    //Preencher informações do user
    const tokenObject = userStore(state => state.token);
    const tokenUser = tokenObject.token;
    const {  getRole } = userStore();
    const role = getRole();
    const [userLogged, setUserLogged] = useState(null);
    const navigate = useNavigate();
    
    useEffect(() => {
        const fetchData = async()=> {
            const result = await getUserByToken(tokenUser)
            setUserLogged(result);
           
         };
         fetchData();
        }, [tokenUser]);

        //Editar o perfil

        const [userEdit, setUserEdit] = useState({
            email: '',
            firstName: '',
            lastName: '',
            phoneNumber: '',
            password: '',
            imgURL: ''
        });

        const [changedFields, setChangedFields] = useState({});

         //Deteta as alteracoes nso campos de editProfile
         const handleInputChange = (e) => {
            const { id, value } = e.target;
            setUserEdit(prevState => ({
                ...prevState,
                [id]: value
            }));

           
            setChangedFields(prevState => ({
                ...prevState,
                [id]: true
            }));
        };


        const handleSubmit = async (e) => {
            e.preventDefault();
            
            try {
                const updatedUserData = Object.keys(changedFields).reduce((acc, key) => {
                    acc[key] = userEdit[key];
                    return acc;
                }, {});
                const response = await fetch("http://localhost:8080/project_backend/rest/users/updateProfile", {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': '*/*',
                        token: tokenUser
                    },
                    body: JSON.stringify(updatedUserData),
                   
                });

                console.log(response);
                if (response.ok) {
                    NotificationManager.success("Your valid changes have been saved","", 800);
                    setTimeout(() => {
                        navigate("/principalPage");
                      }, 1000);
                  
                } else if (response.status === 401) {
                   navigate("/login"); 
                } else if (response.status === 422) {
                    const responseData = await response.text();
                    NotificationManager.warning(responseData,"", 800);
                } else {
                    NotificationManager.error("Something went wrong","", 800,);
                }
            } catch (error) {
                console.error("Error:", error);
                NotificationManager.error("Something went wrong", "", 800);
            }
        };

        const handleBack = () => {
            
           navigate('/principalPage');
        };

        useEffect(() => {
            console.log(userEdit);
        }, [userEdit]);

            
    return(
       <div> 
            {role === 'product_owner' && <MenuProductOwner />}
        <div className="edit_container">
        <div className="edit_photo">
           <img src={userLogged?.imgURL} id="user_photo" alt="User photo" />
           <p id="username_edit">{userLogged?.username}</p>
        </div>
        <div className="edit_profile">
           <div>
              <label  className="descriptioLabel">Password</label>
              <input type="text" className="edit_element" id="password" placeholder="******"/>
           </div>
           <div>
              <label className="descriptioLabel">Email</label>
              <input type="text" className="edit_element" id="email" placeholder={userLogged?.email} onChange={handleInputChange} />
           </div>
           <div>
              <label  className="descriptioLabel">First Name</label>
              <input type="text" className="edit_element" id="firstName" placeholder={userLogged?.firstName} onChange={handleInputChange} />
           </div>
           <div>
              <label  className="descriptioLabel">Last Name</label>
              <input type="text" className="edit_element" id="lastName" placeholder={userLogged?.lastName} onChange={handleInputChange}/>
           </div>
           <div>
              <label  className="descriptioLabel">Phone Number</label>
              <input type="text" className="edit_element" id="phoneNumber" placeholder={userLogged?.phoneNumber} onChange={handleInputChange}/>
           </div>
           <div>
              <label  className="descriptioLabel">URL Image</label>
              <input type="text" className="edit_element" id="imgURL" placeholder={userLogged?.imgURL} onChange={handleInputChange}/>
           </div>

        </div>
        <div className="confirm_profile">
           <button className="btn_save" id="btn-save" onClick={handleSubmit}>Save</button>
           <button className="btn_cancel" id="btn_cancel" onClick={handleBack}>Back</button>
        </div>
     </div>

     </div> 

    )
}

export default EditProfile;