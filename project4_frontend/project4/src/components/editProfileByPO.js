import React, { useEffect } from "react";
import { useState } from "react";
import {userStore} from '../stores/UserStore';
import { NotificationManager } from "react-notifications";
import 'react-notifications/lib/notifications.css';
import {  getUserByUsername} from "../endpoints/users";
import { updateProfileByPO } from "../endpoints/users";
import {showModal, updateUsersTable} from '../stores/boardStore';


function EditProfileByPO(){

    const tokenObject = userStore(state => state.token);
    const tokenUser = tokenObject.token;
    const {  getRole } = userStore();
    const role = getRole();
    const { getUsername } = userStore();
    const username = getUsername();
    const [userEditPO, setUserEditPO] = useState(null);
    const { showModalEditUser, setShowModalEditUser } = showModal();
    const [userEdit, setUserEdit] = useState(null);
    const {showUsersTable, setShowUsersTable} = updateUsersTable();


    useEffect(() => {
        const fetchData = async()=> {
            const result = await getUserByUsername(tokenUser, username);
            setUserEditPO(result);
           
         };
         fetchData();
        }, [tokenUser]);

        

        const [changedFields, setChangedFields] = useState({});

         //Deteta as alteracoes nso campos de editProfile
         const handleInputChange = (e) => {
            const { id, value } = e.target;

            setUserEditPO(prevState => ({
               ...prevState,
               [id]: value
           }));
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
        console.log(userEdit);
        
         const newUser = Object.keys(changedFields).reduce((acc, key) => {
            acc[key] = userEdit[key];
            return acc;
        }, {});

        console.log(newUser);
            const result = await updateProfileByPO(tokenUser,username,newUser);
            console.log(result);
            if(result === 200){
                NotificationManager.success("User edited successfully", "", 1000);
               setShowModalEditUser(false);
               setShowUsersTable(!showUsersTable);
            }else{
                NotificationManager.warning(result, "", 1000);

            }
        };

        const handleBack = ()=>{
         setShowModalEditUser(false);

        }


    return(
    
       <div className='modal_container'> 
       {showModalEditUser && 
        <div className="edit_container">
        <div className="edit_photo">
           <img src={userEditPO?.imgURL} id="user_photo" alt="User photo" />
           <p id="username_edit">{userEditPO?.username}</p>
        </div>
        <div className="edit_profile">
           <div>
              <label  htmlFor="descriptioLabel">Password</label>
              <input type="text" className="edit_element" id="password" placeholder="******"/>
           </div>
           <div>
              <label htmlFor="descriptioLabel">Email</label>
              <input type="text" className="edit_element" id="email" placeholder={userEditPO?.email} onChange={handleInputChange} />
           </div>
           <div>
              <label  htmlFor="descriptioLabel">First Name</label>
              <input type="text" className="edit_element" id="firstName" placeholder={userEditPO?.firstName} onChange={handleInputChange} />
           </div>
           <div>
              <label  htmlFor="descriptioLabel">Last Name</label>
              <input type="text" className="edit_element" id="lastName" placeholder={userEditPO?.lastName} onChange={handleInputChange}/>
           </div>
           <div>
              <label  htmlFor="descriptioLabel">Phone Number</label>
              <input type="text" className="edit_element" id="phoneNumber" placeholder={userEditPO?.phoneNumber} onChange={handleInputChange}/>
           </div>
           <div>
              <label  htmlFor="descriptioLabel">URL Image</label>
              <input type="text" className="edit_element" id="imgURL" placeholder={userEditPO?.imgURL} onChange={handleInputChange}/>
           </div>
           <div>
                <label htmlFor="opcoes" className="descriptioLabel">User role</label>
                <select id="typeOfUser" name="opcoes" value={userEditPO?.typeOfUser}   onChange={handleInputChange}> 
                <option value="developer">Developer</option>
                <option value="scrum_master">Scrum Master</option>
                <option value="product_owner">Product Owner</option>
                </select>
            </div>

        </div>
        <div className="confirm_profile">
           <button className="btn_save" id="btn-save" onClick={handleSubmit}>Save</button>
           <button className="btn_cancel" id="btn_cancel" onClick={handleBack}>Back</button>
        </div>
     </div>
}

     </div> 

    )
 
}

export default EditProfileByPO;
