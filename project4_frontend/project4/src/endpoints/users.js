
export async function logout(token) {
  try {
    const response = await fetch(
      "http://localhost:8080/project_backend/rest/users/logout",
      {
        method: "POST",
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json",
          token: token,
        },
      }
    );

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
    const response = await fetch(
      "http://localhost:8080/project_backend/rest/users/removeUser",
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          token: tokenUser,
          username: username,
        },
      }
    );

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
    const response = await fetch(
      "http://localhost:8080/project_backend/rest/users/deleteUser",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          token: tokenUser,
          username: username,
        },
      }
    );

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
    const response = await fetch(
      `http://localhost:8080/project_backend/rest/users/restoreUser/${username}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          token: tokenUser,
        },
      }
    );

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

export async function getUserByToken(tokenUser) {
  try {
    const response = await fetch(
      "http://localhost:8080/project_backend/rest/users",
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          token: tokenUser,
        },
      }
    );

    if (response.ok) {
      const user = await response.json();
      return user;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
    return null;
  }
}

export async function registerUserByPO(tokenUser, newUser) {
  try {
    const response = await fetch(
      "http://localhost:8080/project_backend/rest/users/addUserByPO",
      {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          'token': tokenUser
        },
        body: JSON.stringify(newUser),
      }
    );

    if (response.ok) {
        return 200;
   
    } else {
    
          const errorData = await response.text();
          return errorData;
    }
  } catch (error) {
   
  }
}



