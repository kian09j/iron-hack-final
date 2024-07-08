// This file sets up a global state management system for a to-do application using Pinia.js.
// It defines a centralized store to manage the state of tasks across our Vue.js application,
// allowing us to add, complete, delete, and filter tasks by user ID.

// ------------------------------------------------------------------------
// Import Block
// ------------------------------------------------------------------------

// Import reactive from Vue to make the tasks array reactive
import { reactive } from "vue";

// Import defineStore from Pinia to define a new store
import { defineStore } from "pinia";

// ------------------------------------------------------------------------
// Store Definition Block
// ------------------------------------------------------------------------

// Define a new store named 'useTaskStore' using Pinia
// Pass 2 args inside defineStore method
export const useTaskStore = defineStore("taskStore", () => {
  // Initial array of tasks using reactive to keep the state reactive
  const tasks = reactive([
    {
      id: 1, // Unique identifier for the task
      title: "Make a strawberry cake", // Title of the task
      description: {
        title:
          "Make the cake to enjoy with coffe after lunch", // Detailed description of the task
        timeToBeCompleted: "2 hours", // Estimated time to complete the task
        extraInfoRequired: ["Strawberries", "Whipped Cream"], // Additional information required for the task
      },
      isCompleted: true, // Boolean indicating if the task is completed
      userId: 1, // Link task to user with id 1
      dueDate: new Date('2024-07-10'),
      priority: "medium", // Example priority field
      subtasks: [],


    },
    {
      id: 2, // Unique identifier for the task
      title: "Unpack the luggage", // Title of the task
      description: {
        title: "Organize luggage after the travel", // Detailed description of the task
        timeToBeCompleted: "1 hour", // Estimated time to complete the task
        extraInfoRequired: ["unpack", "do laundry", "organize remaining items"], // Additional information required for the task
      },
      isCompleted: false, // Boolean indicating if the task is completed
      userId: 2, // Link task to user with id 2
      dueDate: new Date('2024-07-10'),
      priority: "medium", // Example priority field
      subtasks: [],


    },
  ]);

  // ----------------------------------------------------------------------
  // Function to add a new task
  // ----------------------------------------------------------------------

  /**
   * Adds a new task to the tasks array.
   * @param {Object} task - The task object to be added.
   */
  function addTask(task) {
    tasks.push(task); // Push the new task to the tasks array
  }

  /*
  The addTask function is used to add a new task to the tasks array.
  - It takes a task object as a parameter.
  - It uses the push method to add this task object to the end of the tasks array.
  - Since tasks is a reactive array, any components that are using this store will automatically reflect this new task.
  */

  // ----------------------------------------------------------------------
  // Function to mark a task as completed
  // ----------------------------------------------------------------------

  /**
   * Marks a specific task as completed.
   * @param {number} taskId - The ID of the task to be marked as completed.
   */
  function markTaskCompleted(taskId) {
    // Find the task by its ID
    let task = tasks.find((task) => task.id === taskId);
    // If task is found, mark it as completed
    if (task) {
      task.isCompleted = true; // Set the task's isCompleted property to true
    }
  }

 
  /*
  The markTaskCompleted function is used to mark a specific task as completed.
  - It takes a taskId as a parameter.
  - It finds the task in the tasks array that has the same id as the taskId.
  - If a task with the specified id is found, it sets the isCompleted property of that task to true.
  - This function allows for changing the state of a task to reflect its completion status.
  */

  // ----------------------------------------------------------------------
  // Function to delete a task
  // ----------------------------------------------------------------------

  /**
   * Deletes a specific task from the tasks array.
   * @param {number} taskId - The ID of the task to be deleted.
   */
  function deleteTask(taskId) {
    // Find the index of the task to be deleted by its ID
    let index = tasks.findIndex((task) => task.id === taskId);
    if (index !== -1) {
      tasks.splice(index, 1); // Remove the task from the array
    }
  }

  function getTasksByPriority(priority) {
    return tasks.filter((task) => task.priority === priority);
  }
  /*
  The deleteTask function is used to remove a specific task from the tasks array.
  - It takes a taskId as a parameter.
  - It finds the index of the task in the tasks array that has the same id as the taskId parameter.
  - If a task with the specified id is found (index is not -1), it removes the task from the array using the splice method.
  - This function allows for deleting tasks by their unique identifier.
  */

  // ----------------------------------------------------------------------
  // Function to get tasks by user ID
  // ----------------------------------------------------------------------

  /**
   * Retrieves tasks that belong to a specific user.
   * @param {number} userId - The ID of the user whose tasks are to be retrieved.
   * @returns {Array} - An array of tasks that belong to the specified user.
   */
  function getTasksByUserId(userId) {
    return tasks.filter((task) => task.userId === userId);
  }




  function updateTask(updatedTask) {
    const index = tasks.findIndex((task) => task.id === updatedTask.id);
    if (index !== -1) {
      // Update the task using Vue's set method or by creating a new object
      tasks[index] = { ...tasks[index], ...updatedTask };
      // Alternatively, you can use Vue's set method to update the task:
      // Vue.set(tasks, index, { ...tasks[index], ...updatedTask });
    }
  }


  function addSubtask(taskId, subtask) {
    let task = tasks.find((task) => task.id === taskId);
    if (task) {
      task.subtasks.push(subtask);
    }
  }

  function markSubtaskCompleted(taskId, subtaskId) {
    let task = tasks.find((task) => task.id === taskId);
    if (task) {
      let subtask = task.subtasks.find((subtask) => subtask.id === subtaskId);
      if (subtask) {
        subtask.isCompleted = true;
      }
    }}
  /*
  The getTasksByUserId function retrieves tasks that belong to a specific user.
  - It takes a userId as a parameter.
  - It filters the tasks array to return only tasks that have the same userId as the parameter.
  - This function allows for fetching tasks based on the user they are assigned to.
  */


  return { tasks, addTask, markTaskCompleted, deleteTask, getTasksByUserId, updateTask, getTasksByPriority, addSubtask, markSubtaskCompleted };
});

/*
Summary:
This file defines a Pinia store for managing tasks in a to-do application. It includes an initial set of tasks and provides 
functions to add, mark as completed, delete, and filter tasks by user ID. The state management is reactive, ensuring that 
any changes to the tasks are automatically reflected in the Vue.js components that use this store.
*/