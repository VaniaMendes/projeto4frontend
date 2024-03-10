import React from 'react';
import { FaUserEdit } from "react-icons/fa";
import { MdAutoDelete } from "react-icons/md";

const handleEdit = (userId) => {
    // Lógica para editar o usuário com o ID fornecido
};

const handleDelete = (userId) => {
    // Lógica para excluir o usuário com o ID fornecido
};

const handleDeleteTasks = (userId) => {
    // Lógica para deletar as tarefas do usuário com o ID fornecido
};


function UserTable({ users }) {
    return (
        <div className='users_container'>
        <div className='users_table'>
        <table id="users_table">
            <thead>
                <tr>
                    <th id="th-head-left-corner"></th>
                    <th id="th-head-left-corner">Name</th>
                    <th id="th-head-name">Email</th>
                    <th id="th-head-email">Phone</th>
                    <th id="th-head-phone">Role</th>
                    <th id="th-head-right-corner"></th>

                </tr>
            </thead>
            <tbody className = 'body'>
                {users && users.map((user, index) => (
                    <tr key={index}>
                        <td ><img className='imagem_user' src={user.imgURL} alt='user.png' /></td>
                        <td>{user.firstName + "  " + user.lastName}</td>
                        <td>{user.email}</td>
                        <td>{user.phoneNumber}</td>
                        <td>
                        {user.typeOfUser === 'developer' ? 'Developer' : 
                         user.typeOfUser === 'scrum_master' ? 'Scrum Master' :
                        user.typeOfUser === 'product_owner' ? 'Product Owner' : ''}
                        </td>
                        <td>
                            <button className='edit_button' onClick={() => handleEdit(user.username)}><FaUserEdit /></button>
                            <button className='delete_button' onClick={() => handleDelete(user.username)}><MdAutoDelete /></button>
                            <button className='delete_button' onClick={() => handleDeleteTasks(user.username)}>Delete Tasks</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
        </div>
        </div>
    );
}

export default UserTable;
