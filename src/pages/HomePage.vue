<template>
  <div class="container mx-auto p-4">
    <h2 class="text-2xl font-bold mb-4">Welcome back!</h2>

    <!-- Quick Actions -->
    <div class="flex justify-end items-center mb-4">
      <router-link
        to="/add-task"
        class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >Add New Task</router-link
      >
      <router-link
        to="/all-tasks"
        class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >View All Tasks</router-link
      >
    </div>

    <!-- Task Lists -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <!-- Upcoming Tasks -->
      <div class="bg-amber-100 rounded-lg shadow-md p-4 hover:scale-105">
        <h3 class="text-lg font-bold mb-2">Upcoming Tasks</h3>
        <ul>
          <li
            v-for="task in upcomingTasks"
            :key="task.id"
            class="text-gray-700"
          >
            {{ task.title }} - {{ task.dueDate }}
          </li>
        </ul>
      </div>

      <!-- Overdue Tasks -->
      <div class="bg-amber-100 rounded-lg shadow-md p-4 hover:scale-105">
        <h3 class="text-lg font-bold mb-2">Overdue Tasks</h3>
        <ul>
          <li v-for="task in overdueTasks" :key="task.id" class="text-gray-700">
            {{ task.title }} - {{ task.dueDate }}
          </li>
        </ul>
      </div>

      <!-- Recently Completed Tasks -->
      <div
        class="col-span-2 md:col-span-1 bg-amber-100 rounded-lg shadow-md p-4 hover:scale-105"
      >
        <h3 class="text-lg font-bold mb-2">Recently Completed Tasks</h3>
        <ul>
          <li
            v-for="task in recentlyCompletedTasks"
            :key="task.id"
            class="text-gray-700"
          >
            {{ task.title }} - Completed on {{ task.completedDate }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

// Mock data for demonstration
const upcomingTasks = ref([
  { id: 1, title: "Task 1", dueDate: "2024-08-15" },
  { id: 2, title: "Task 2", dueDate: "2024-08-20" },
]);

const overdueTasks = ref([
  { id: 3, title: "Task 3", dueDate: "2024-07-31" },
  { id: 4, title: "Task 4", dueDate: "2024-07-25" },
]);

const recentlyCompletedTasks = ref([
  { id: 5, title: "Task 5", completedDate: "2024-07-10" },
  { id: 6, title: "Task 6", completedDate: "2024-07-08" },
]);
</script>
