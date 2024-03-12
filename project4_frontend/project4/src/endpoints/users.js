export async function logout(token) {
   try {
       const response = await fetch("http://localhost:8080/project_backend/rest/users/logout", {
           method: "POST",
           headers: {
               Accept: "*/*",
               "Content-Type": "application/json",
               'token': token
           }
       });

       if (response.ok) {
           return true;
       } else {
           return false;
       }
   } catch (error) {
       return false;
   }
}

export async function deleteUserForever(tokenUser, username) {


    try {
        const response = await fetch("http://localhost:8080/project_backend/rest/users/removeUser", {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                'Accept':   'application/json',
                "token":tokenUser,
                'username': username
            },
            
        });
 
        if (response.ok) {
        return true;  
        } else {
            return false;
        }
    } catch (error) {
        console.error("Error deleting user:", error);
        return false;
    }
 }

 export async function deleteUser(tokenUser, username) {
    try {
        const response = await fetch("http://localhost:8080/project_backend/rest/users/deleteUser", {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                'Accept':   'application/json',
                "token":tokenUser,
                'username': username
            },
            
        });
 
        if (response.ok) {
        return true;  
        } else {
            return false;
        }
    } catch (error) {
        console.error("Error deleting user:", error);
        return false;
    }
 }


 export async function restoreUser(tokenUser, username) {
    try {
        const response = await fetch(`http://localhost:8080/project_backend/rest/users/restoreUser/${username}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                "token": tokenUser
            }
        });

        if (response.ok) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.error("Error restoring user:", error);
        return false;
    }
}


