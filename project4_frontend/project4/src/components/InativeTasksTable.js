import React, { useState } from "react";
import { getAllInactiveTasks } from "../endpoints/tasks";
import { userStore } from "../stores/UserStore";
import { useEffect } from "react";
import "../format/tables.css";
import { IoFilter } from "react-icons/io5";
import { MdTask } from "react-icons/md";
import { FcHighPriority } from "react-icons/fc";
import { FcMediumPriority } from "react-icons/fc";
import { FcLowPriority } from "react-icons/fc";
import { MdDeleteForever } from "react-icons/md";
import { NotificationManager } from "react-notifications";
import { MdOutlineRestore } from "react-icons/md";
import { hardDeleteTask, restoreTask } from "../endpoints/tasks";

const InativeTasksTable = () => {
  const tokenObject = userStore((state) => state.token);
  const tokenUser = tokenObject.token;
  const [tasks, setTasks] = useState([]);

  //Vai buscar o role guardado na userStore quando o user faz login
  const { getRole } = userStore();
  const role = getRole();

  const fetchTasks = async () => {
    try {
      const result = await getAllInactiveTasks(tokenUser);
      setTasks(result);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleDeleteForever = (taskId, tokenUser) => {
    NotificationManager.info(
      "Are you sure you want to delete this task?",
      "Confirm",
      7000,
      () => {
        hardDeleteTask(taskId, tokenUser)
          .then((result) => {
            if (result === true) {
              NotificationManager.success(
                "Task deleted successfully",
                "",
                1000
              );
              fetchTasks();
            } else {
              NotificationManager.error("Failed to delete task", "", 1000);
            }
          })
          .catch((error) => {
            NotificationManager.error("Error deleting ");
          });
      }
    );
  };

  const handleRestore = async (tokenUser, taskId) => {
    try {
      const result = await restoreTask(tokenUser, taskId);
      console.log(result);

      if (result === 200) {
        NotificationManager.success("Task restored successfully", "", 1000);
        fetchTasks();
      } else {
        NotificationManager.error(result, "", 1000);
      }
    } catch (error) {
      NotificationManager.error("Error deleting ");
    }
  };

  return (
    <div className="table_container">
      <table className="users_table">
        <thead>
          <tr>
            <th className="titleUser">
              <MdTask className="task_icon" />
            </th>
            <th className="titleUser3">Deleted Tasks</th>
            <th className="titleUser"></th>
            <th className="titleUser"></th>
            <th className="titleUser"></th>
            <th className="titleUser">
              {" "}
              <button className="search_icon">
                <IoFilter />
              </button>
            </th>
            {role !== "scrum_master" ? (
              <th></th>
            ) : (
              <th className="titleUser"></th>
            )}
          </tr>
          <tr>
            <th>Author</th>
            <th>Title</th>
            <th>Description</th>
            <th>Initial Date</th>
            <th>Final Date</th>
            <th>Priority</th>
            {role !== "scrum_master" ? (
              <th>Task Edition</th>
            ) : (
              <th ></th>
            )}
          </tr>
        </thead>
        <tbody className="body">
          {tasks &&
            tasks.map((task, index) => {
              return (
                <tr key={index}>
                  <td>{task.author.username}</td>
                  <td>{task.title}</td>
                  <td>{task.description}</td>
                  <td>{task.initialDate}</td>
                  <td>{task.endDate}</td>
                  <td className="colorPriority">
                    {task.priority === 300 ? (
                      <FcHighPriority />
                    ) : task.priority === 200 ? (
                      <FcMediumPriority />
                    ) : task.priority === 100 ? (
                      <FcLowPriority />
                    ) : (
                      ""
                    )}
                  </td>
                  <td>
                    {role !== "scrum_master" && (
                      <>
                        <button
                          className="edit_button"
                          onClick={() => handleRestore(tokenUser, task.id)}
                        >
                          <MdOutlineRestore />
                        </button>
                        <button
                          className="delete_button"
                          onClick={() =>
                            handleDeleteForever(task.id, tokenUser)
                          }
                        >
                          <MdDeleteForever />
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};
export default InativeTasksTable;
