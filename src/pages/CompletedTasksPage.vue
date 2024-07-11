<!--
This file defines a Vue.js component for displaying completed tasks in a to-do application.
By building this component, we will achieve a user interface that shows a list of tasks marked as completed, leveraging global state management with Pinia.js.
-->

<template>
  <div class="container mx-auto p-4">
    <h4 class="text-2xl font-bold mb-4">
      Great job! You've completed these tasks:
    </h4>

    <ul class="flex flex-wrap gap-4">
      <!-- Loop through the completedTasks array and render each task -->
      <li
        v-for="task in completedTasks"
        :key="task.id"
        class="bg-green-100 p-4 rounded-lg shadow-md w-full md:w-1/3"
      >
        <!-- Display the title of the task -->
        <h5 class="font-bold text-lg mb-2">{{ task.title }}</h5>
        <!-- Display the description title of the task -->
        <h6 class="text-sm text-gray-600">{{ task.description.title }}</h6>
        <!-- Display the time to be completed of the task -->
        <h6 class="text-sm text-gray-600">
          {{ task.description.timeToBeCompleted }}
        </h6>
        <!-- Loop through the extraInfoRequired array and render each item in a list item -->
        <ul class="mt-2 list-disc pl-5">
          <li
            v-for="(extraInfo, index) in task.description.extraInfoRequired"
            :key="index"
            class="text-sm text-gray-700"
          >
            {{ extraInfo }}
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    completedTasks: Array,
  },
};
</script>

<style scoped>
/* Add any necessary styles here */
</style>

<script setup>
// ------------------------------------------------------------------------
// Import Block
// ------------------------------------------------------------------------

// Import computed from Vue to create a computed property
import { computed } from "vue";
// Import the useTaskStore function from taskStore to interact with the task store
import { useTaskStore } from "../stores/taskStore";

// ------------------------------------------------------------------------
// Store Access Block
// ------------------------------------------------------------------------

// Use the task store by saving it in a variable
const taskstore = useTaskStore();

// Destructure all the possible pieces of data that we want out of this
const { tasks } = taskstore; // Destructure necessary functions and state from the task store

// ------------------------------------------------------------------------
// Computed Properties Block
// ------------------------------------------------------------------------

// Computed property to filter completed tasks
let completedTasks = computed(() => tasks.filter((task) => task.isCompleted));

/*
  The completedTasks computed property filters the tasks array to include only the tasks that are marked as completed.
  - It uses the filter method to iterate over the tasks array.
  - For each task, it checks if the isCompleted property is true.
  - The resulting array contains only the tasks that are completed.
  */
</script>
