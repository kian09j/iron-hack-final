<template>
  <h4>This Page Displays all tasks</h4>

  <div class="container">
    <!-- Loop through the tasks array and render each task in a list item -->
    <ul>
      <!-- v-for directive to iterate over each task in tasks array -->
      <li v-for="task in tasks" v-bind:key="task.id">
        <!-- Display the title of the task -->
        <h5>{{ task.title }}</h5>
        <!-- Display the description title of the task -->
        <h6>{{ task.description.title }}</h6>
        <!-- Display the time to be completed of the task -->
        <h6>{{ task.description.timeToBeCompleted }}</h6>
        <!-- Loop through the extraInfoRequired array and render each item in a list item -->
        <ul>
          <li
            v-for="(extraInfo, index) in task.description.extraInfoRequired"
            v-bind:key="index"
          >
            {{ extraInfo }}
          </li>
        </ul>
        <!-- Display whether the task is completed or incomplete -->
        <h6>{{ task.isCompleted ? "Completed" : "Incomplete" }}</h6>
        <h6>Due date: {{ task.dueDate }}</h6>
        <p>Priority: {{ task.priority }}</p>

        <!-- Button to mark the task as completed -->
        <button
          v-bind:disabled="task.isCompleted ? true : false"
          @click="markTaskCompleted(task.id)"
        >
          Mark as Completed
        </button>
        <!-- Button to delete the task -->
        <button @click="deleteTask(task.id)">Delete Task</button>
        <!-- Button to edit the task -->
        <router-link :to="{ name: 'EditTask', params: { taskId: task.id } }">
          <button>Edit</button>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script setup>
// ------------------------------------------------------------------------
// Import Block
// ------------------------------------------------------------------------

// Import the useTaskStore function from taskStore to interact with the task store
import { useTaskStore } from "../stores/taskStore";

// ------------------------------------------------------------------------
// Store Access Block
// ------------------------------------------------------------------------

// Use the task store by saving it in a variable
const taskstore = useTaskStore();

// Destructure all the possible pieces of data that we want out of this
const { tasks, deleteTask, markTaskCompleted } = taskstore; // Destructure necessary functions and state from the task store

/*
  The useTaskStore function is used to access the task store.
  - Destructure tasks, markTaskCompleted, and deleteTask from the task store.
  - These will be used to interact with the global state of tasks.
  */
</script>

<style scoped>
button {
  display: block;
  margin-bottom: 0.5rem;
}
</style>
