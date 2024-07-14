<template>
  <div
    class="w-full bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-sky-800 dark:to-gray-900"
  >
    <div class="min-h-screen container mx-auto p-4w-full">
      <h4 class="text-2xl font-bold mb-4 flex items-center dark:text-white">
        Your tasks:
      </h4>

      <div class="flex justify-end items-center mb-4">
        <label for="sort" class="block mb-2">Sort by:</label>
        <select
          id="sort"
          v-model="sortOption"
          @change="sortTasks"
          class="p-2 border rounded"
        >
          <option value="dueDate">Due Date</option>
          <option value="priority">Priority</option>
          <option value="completionStatus">Completion Status</option>
        </select>
      </div>

      <div class="flex flex-wrap justify-around gap-4 mx-auto p-4">
        <div
          v-for="task in sortedTasks"
          :key="task.id"
          class="bg-gradient-to-r from-yellow-50 to-yellow-100 p-6 rounded-lg shadow-lg w-full md:w-1/3 transition transform duration-300 ease-in-out hover:scale-105"
        >
          <h5 class="font-bold text-lg mb-2">{{ task.title }}</h5>
          <h6 class="text-sm text-gray-600">{{ task.description.title }}</h6>
          <h6 class="text-sm text-gray-600">
            <font-awesome-icon :icon="['fas', 'hourglass-half']" />
            {{ task.description.timeToBeCompleted }}
          </h6>

          <ul class="mt-2 list-disc pl-5">
            <li
              v-for="(extraInfo, index) in task.description.extraInfoRequired"
              :key="index"
              class="text-sm text-gray-700"
            >
              {{ extraInfo }}
            </li>
          </ul>

          <h6 class="mt-2">
            <div>
              <span v-if="task.isCompleted">
                <i class="fas fa-check-circle"></i> Completed
              </span>
              <span v-else>
                <i class="fas fa-times-circle"></i> Incomplete
              </span>
            </div>
          </h6>
          <h6>Due date: {{ task.dueDate }}</h6>
          <p>Priority: {{ task.priority }}</p>

          <ul class="mt-2">
            <li v-for="subtask in task.subtasks" :key="subtask.id" class="mt-1">
              <p>
                {{ subtask.title }} -
                {{ subtask.isCompleted ? "Completed" : "Incomplete" }}
              </p>
              <button
                :disabled="subtask.isCompleted"
                @click="markSubtaskCompleted(task.id, subtask.id)"
                class="bg-blue-500 text-white px-2 py-1 rounded mt-1 disabled:opacity-50"
              >
                Mark Subtask as Completed
              </button>
            </li>
          </ul>

          <div class="flex mt-4 space-x-2">
            <button
              :disabled="task.isCompleted"
              @click="markTaskCompleted(task.id)"
              class="flex-1 bg-gradient-to-r from-green-400 to-green-500 hover:from-green-600 hover:to-green-700 text-white px-4 py-2 rounded disabled:opacity-50"
            >
              Mark as Completed
            </button>
            <button
              @click="deleteTask(task.id)"
              class="flex-1 text-white px-4 py-2 rounded bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700"
            >
              Delete Task
            </button>
            <router-link
              :to="{ name: 'EditTask', params: { taskId: task.id } }"
              class="flex-1"
            >
              <button
                class="flex-1 text-white px-4 py-2 rounded bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600"
              >
                Edit
              </button>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useTaskStore } from "../stores/taskStore";

const taskStore = useTaskStore();
const { tasks, deleteTask, markTaskCompleted, updateTask } = taskStore;

const sortOption = ref("dueDate");

const sortedTasks = computed(() => {
  return [...tasks].sort((a, b) => {
    if (sortOption.value === "dueDate") {
      return new Date(a.dueDate) - new Date(b.dueDate);
    } else if (sortOption.value === "priority") {
      const priorityOrder = { low: 1, medium: 2, high: 3 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    } else if (sortOption.value === "completionStatus") {
      return a.isCompleted - b.isCompleted;
    }
  });
});

function sortTasks() {
  sortedTasks.value;
}

function markSubtaskCompleted(taskId, subtaskId) {
  const task = tasks.find((task) => task.id === taskId);
  if (task) {
    const subtask = task.subtasks.find((subtask) => subtask.id === subtaskId);
    if (subtask) {
      subtask.isCompleted = true;
      updateTask(task);
    }
  }
}
</script>
