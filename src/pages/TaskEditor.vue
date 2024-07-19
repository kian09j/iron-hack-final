<template>
  <div class="w-full bg-white dark:bg-slate-900">
    <div
      class="container mx-auto p-4 bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-gray-800 dark:to-gray-900"
    >
      <h1 class="text-2xl font-bold mb-4">Edit Task</h1>
      <form @submit.prevent="saveTask" class="space-y-4">
        <div class="flex flex-col">
          <label for="title" class="mb-1 font-semibold">Title</label>
          <input
            id="title"
            v-model="task.title"
            type="text"
            class="p-2 border rounded"
            required
          />
        </div>
        <div class="flex flex-col">
          <label for="description" class="mb-1 font-semibold"
            >Description</label
          >
          <input
            id="description"
            v-model="task.description.title"
            type="text"
            class="p-2 border rounded"
          />
        </div>
        <div class="flex flex-col">
          <label for="timeToBeCompleted" class="mb-1 font-semibold"
            >Time to be Completed</label
          >
          <input
            id="timeToBeCompleted"
            v-model="task.description.timeToBeCompleted"
            type="text"
            class="p-2 border rounded"
          />
        </div>
        <div class="flex flex-col">
          <label for="extraInfoRequired" class="mb-1 font-semibold"
            >Extra Info Required</label
          >
          <div class="flex items-center space-x-2">
            <input
              id="extraInfoRequired"
              v-model="extraInfo"
              type="text"
              class="p-2 border rounded flex-1"
            />
            <button
              type="button"
              @click="addExtraInfo"
              class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Add
            </button>
          </div>
        </div>
        <div>
          <ul class="list-disc pl-5">
            <li
              v-for="(info, index) in task.description.extraInfoRequired"
              :key="index"
              class="text-gray-700"
            >
              {{ info }}
            </li>
          </ul>
        </div>
        <div class="flex flex-col">
          <label for="dueDate" class="mb-1 font-semibold">Due Date</label>
          <input
            id="dueDate"
            type="date"
            v-model="task.due_date"
            required
            class="p-2 border rounded"
          />
        </div>
        <div class="flex flex-col">
          <label for="priority" class="mb-1 font-semibold">Priority</label>
          <select
            id="priority"
            v-model="task.priority"
            required
            class="p-2 border rounded"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        <div class="flex items-center space-x-2">
          <input
            id="isCompleted"
            v-model="task.is_completed"
            type="checkbox"
            class="form-checkbox"
          />
          <label for="isCompleted" class="font-semibold">Is Completed</label>
        </div>
        <button
          type="submit"
          class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Save
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useTaskStore } from "../stores/taskStore";
import { useRouter, useRoute } from "vue-router";

const taskStore = useTaskStore();
const route = useRoute();
const router = useRouter();

const taskId = parseInt(route.params.taskId);
const task = ref({
  title: "",
  description: {
    title: "",
    timeToBeCompleted: "",
    extraInfoRequired: [],
  },
  due_date: "",
  priority: "low",
  is_completed: false,
});

const extraInfo = ref("");

const fetchTask = async () => {
  try {
    const fetchedTask = taskStore.tasks.find((t) => t.id === taskId);
    if (fetchedTask) {
      task.value = {
        ...fetchedTask,
        description: {
          ...fetchedTask.description,
          extraInfoRequired: JSON.parse(
            fetchedTask.description.extraInfoRequired || "[]"
          ),
        },
      };
    }
  } catch (error) {
    console.error("Error fetching task:", error.message);
  }
};

const addExtraInfo = () => {
  if (extraInfo.value.trim()) {
    task.value.description.extraInfoRequired.push(extraInfo.value.trim());
    extraInfo.value = "";
  }
};

const saveTask = async () => {
  try {
    taskStore.updateTask({
      ...task.value,
      description: {
        ...task.value.description,
        extraInfoRequired: JSON.stringify(
          task.value.description.extraInfoRequired
        ),
      },
    });
    console.log("Task saved successfully.");
    router.push({ name: "AllTasks" });
  } catch (error) {
    console.error("Error saving task:", error.message);
  }
};

// Fetch the task when the component is mounted
onMounted(fetchTask);
</script>

<style scoped>
/* Add optional scoped styles for your task editor here */
</style>
