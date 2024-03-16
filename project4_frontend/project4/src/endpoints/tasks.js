
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
 
 export async function softDeleteTask(tokenUser, taskId) {
   let deleteTaskRequest = `http://localhost:8080/project_backend/rest/tasks/${taskId}/softDelete`;
   try {
      const response = await fetch(deleteTaskRequest, {
         method: "PUT",
         headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            token: tokenUser
         }
      });

      if (response.ok) {
        return response.status;
      } else {
         return response.status;
      }
   
   } catch (error) {
      console.error("Error deleting task:", error);
   }
}

export async function getAllInactiveTasks(tokenUser) {
   let getInactiveTasksRequest = "http://localhost:8080/project_backend/rest/tasks/getAllSoftDeletedTasks";

   try {
       const response = await fetch(getInactiveTasksRequest, {
           method: "GET",
           headers: {
               Accept: "application/json",
               "Content-Type": "application/json",
               token: tokenUser
           }
       });

       if (response.ok) {
           const inactiveTasks = await response.json();
           return inactiveTasks;
       } else {
           console.error("Failed to fetch inactive tasks");
           return null;
       }
   } catch (error) {
       console.error("Error fetching inactive tasks:", error);
       return null;
   }
}

 
