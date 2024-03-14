
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
 
