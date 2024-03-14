
export async function addTask(tokenUser, idCategory, task) {
try{
    const response = await fetch("http://localhost:8080/project_backend/rest/tasks/createTask", {
       method: "POST",
       headers: {
          Accept: "*/*",
          "Content-Type": "application/json",
          token: tokenUser,
          categoryId: idCategory
       },
       body: JSON.stringify(task),
    }
    );
       
    if (response.ok) {
        return 200;
   
    } else {
    
          const errorData = await response.text();
          console.error(errorData);
          return errorData;
          
    }
    }catch (err) {

 }
}

export async function getActiveTasks(tokenUser) {
    let getTasksRequest = "http://localhost:8080/project_backend/rest/tasks/getActiveTasks";
 
    try {
 
       const response = await fetch(getTasksRequest, {
          method: "GET",
          headers: {
             Accept: "application/json",
             "Content-Type": "application/json",
             'token': tokenUser
          }
       });
 
       if (response.ok) {
          const tasks = await response.json();
          return tasks;
       } else {
          console.error("Failed to fetch tasks");
       }
    
    } catch (error) {
       console.error("Error fetching tasks:", error);
    }
 }
 
 
