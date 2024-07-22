<template>
  <div class="w-full bg-white dark:bg-slate-900">
    <div class="min-h-screen container mx-auto p-4 w-full">
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
          class="bg-gradient-to-r from-yellow-50 to-yellow-100 dark:bg-gradient-to-r dark:from-slate-700 dark:to-gray-800 p-6 rounded-lg shadow-lg w-full md:w-1/3 transition transform duration-300 ease-in-out hover:scale-105"
        >
          <h5 class="font-bold text-lg mb-2">{{ task.title }}</h5>
          <h6 class="text-sm text-gray-800 dark:text-white">
            {{ task.description_title || "No title available" }}
          </h6>
          <h6 class="text-sm text-gray-800 dark:text-white">
            <font-awesome-icon :icon="['fas', 'hourglass-half']" />
            {{
              task.description_time_to_be_completed ||
              "No completion time available"
            }}
          </h6>

          <ul class="mt-2 list-disc pl-5">
            <li
              v-for="(
                extraInfo, index
              ) in task.description_extra_info_required || []"
              :key="index"
              class="text-sm text-gray-800 dark:text-white"
            >
              {{ extraInfo || "No extra information available" }}
            </li>
          </ul>

          <h6 class="mt-2">
            <div>
              <span v-if="task.is_completed">
                <i class="fas fa-check-circle"></i> Completed
              </span>
              <span v-else>
                <i class="fas fa-times-circle"></i> Incomplete
              </span>
            </div>
          </h6>
          <h6>Due date: {{ task.due_date || "No due date available" }}</h6>
          <p>Priority: {{ task.priority || "No priority available" }}</p>

          <ul class="mt-2">
            <li
              v-for="subtask in task.subtasks || []"
              :key="subtask.id"
              class="mt-1"
            >
              <p>
                {{ subtask.title || "No title available" }} -
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

          <div class="flex mt-4 mx-auto space-x-2">
            <button
              :disabled="task.is_completed"
              @click="handleMarkTaskCompleted(task.id)"
              class="flex-1 bg-gradient-to-r from-green-400 to-green-500 hover:from-green-600 hover:to-green-700 dark:bg-gradient-to-r dark:from-green-700 dark:to-green-800 dark:hover:bg-gradient-to-r dark:hover:from-green-900 dark:hover:to-green-950 text-white px-4 py-2 rounded disabled:opacity-50"
            >
              Mark as Completed
            </button>
            <button
              @click="handleDeleteTask(task.id)"
              class="flex-1 text-white px-4 py-2 rounded bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 dark:bg-gradient-to-r dark:from-red-700 dark:to-red-800 dark:hover:bg-gradient-to-r dark:hover:from-red-900 dark:hover:to-red-950"
            >
              Delete Task
            </button>
            <router-link
              :to="{ name: 'EditTask', params: { taskId: task.id } }"
              class="flex-1"
            >
              <button
                class="flex-1 px-4 py-2 text-white rounded bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 dark:bg-gradient-to-r dark:from-yellow-700 dark:to-yellow-800 dark:hover:bg-gradient-to-r dark:hover:from-yellow-900 dark:hover:to-yellow-950"
                style="height: 100%"
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
import { ref, computed, onMounted } from "vue";
import { useTaskStore } from "../stores/taskStore";
import { supabase } from "../supabase";

const taskStore = useTaskStore();
const tasks = ref([]);
const sortOption = ref("dueDate");

const fetchTasks = async () => {
  await taskStore.fetchTasks();
  tasks.value = taskStore.tasks;
};

const sortedTasks = computed(() => {
  return [...tasks.value].sort((a, b) => {
    if (sortOption.value === "dueDate") {
      return new Date(a.due_date) - new Date(b.due_date);
    } else if (sortOption.value === "priority") {
      const priorityOrder = { low: 1, medium: 2, high: 3 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    } else if (sortOption.value === "completionStatus") {
      return a.is_completed - b.is_completed;
    }
    return 0;
  });
});

onMounted(fetchTasks);

function sortTasks() {
  sortedTasks.value;
}

function markSubtaskCompleted(taskId, subtaskId) {
  const task = tasks.value.find((task) => task.id === taskId);
  if (task) {
    const subtask = task.subtasks.find((subtask) => subtask.id === subtaskId);
    if (subtask) {
      subtask.isCompleted = true;
      taskStore.updateTask(task);
    }
  }
}

async function handleMarkTaskCompleted(taskId) {
  await taskStore.markTaskCompleted(taskId);
  fetchTasks();
}

async function handleDeleteTask(taskId) {
  await taskStore.deleteTask(taskId);
  fetchTasks();
}
</script>
