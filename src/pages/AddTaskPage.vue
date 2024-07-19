<template>
  <div class="bg-white dark:from-sky-800 dark:bg-slate-900 w-full">
    <div class="w-full container mx-auto p-4">
      <div class="container min-h-screen mx-auto p-4 w-full">
        <h1 class="text-2xl font-bold mb-4 dark:text-white">Add New Task</h1>

        <!-- Success Notification -->
        <div v-if="taskAdded" class="bg-green-100 p-4 rounded-lg shadow-md">
          <p class="text-green-700 dark:text-white">Yay! New task created.</p>
          <button
            @click="startNewTask"
            class="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
          >
            Start a New Task
          </button>
        </div>

        <!-- Task Form -->
        <div
          v-else
          class="bg-gradient-to-r from-neutral-50 to-neutral-100 dark:bg-gradient-to-r dark:from-slate-700 dark:to-gray-800 p-6 rounded-lg shadow-md"
        >
          <form @submit.prevent="handleSubmit">
            <!-- Title -->
            <div class="mb-4">
              <label for="title" class="block text-gray-700">Title:</label>
              <input
                v-model="newTask.title"
                type="text"
                id="title"
                class="w-full p-2 border rounded mt-1"
                required
              />
            </div>

            <!-- Description Title -->
            <div class="mb-4">
              <label for="descriptionTitle" class="block text-gray-700"
                >Description Title:</label
              >
              <input
                v-model="newTask.description.title"
                type="text"
                id="descriptionTitle"
                class="w-full p-2 border rounded mt-1"
                required
              />
            </div>

            <!-- Due Date -->
            <div class="mb-4">
              <label for="dueDate" class="block text-gray-700">Due Date:</label>
              <input
                type="date"
                v-model="newTask.dueDate"
                id="dueDate"
                class="w-full p-2 border rounded mt-1"
                required
              />
            </div>

            <!-- Priority -->
            <div class="mb-4">
              <label for="priority" class="block text-gray-700"
                >Priority:</label
              >
              <select
                v-model="newTask.priority"
                id="priority"
                class="w-full p-2 border rounded mt-1"
                required
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>

            <!-- Time to be Completed -->
            <div class="mb-4">
              <label for="timeToBeCompleted" class="block text-gray-700"
                >Time to be Completed:</label
              >
              <input
                v-model="newTask.description.timeToBeCompleted"
                type="text"
                id="timeToBeCompleted"
                class="w-full p-2 border rounded mt-1"
                required
              />
            </div>

            <!-- Extra Info -->
            <div class="mb-4">
              <label for="extraInfo" class="block text-gray-700"
                >Extra Info Required:</label
              >
              <div class="flex items-center">
                <input
                  v-model="newExtraInfo"
                  type="text"
                  id="extraInfo"
                  class="flex-grow p-2 border rounded mt-1"
                />
                <button
                  type="button"
                  @click="addExtraInfo"
                  class="text-white px-4 py-2 rounded bg-gradient-to-r from-blue-400 to-blue-500 hover:from-blue-600 hover:to-blue-700 dark:from-blue-800 dark:to-blue-900 hover:from-blue-600 hover:to-blue-700 dark:hover:from-blue-900 dark:hover:to-blue-950 transition duration-300"
                >
                  Add Info
                </button>
              </div>
              <ul class="mt-2 list-disc pl-5">
                <li
                  v-for="(info, index) in newTask.description.extraInfoRequired"
                  :key="index"
                  class="text-sm text-gray-700 flex justify-between items-center"
                >
                  {{ info }}
                  <button
                    type="button"
                    @click="removeExtraInfo(index)"
                    class="text-red-500 ml-2"
                  >
                    Remove
                  </button>
                </li>
              </ul>
            </div>

            <!-- Subtasks -->
            <div class="mb-4">
              <label for="subtasks" class="block text-gray-700"
                >Subtasks:</label
              >
              <input
                v-model="subtaskTitle"
                @keyup.enter="addSubtask"
                id="subtasks"
                placeholder="Add subtask and press Enter"
                class="w-full p-2 border rounded mt-1"
              />
              <ul class="mt-2 list-disc pl-5">
                <li
                  v-for="subtask in newTask.subtasks"
                  :key="subtask.id"
                  class="text-sm text-gray-700"
                >
                  {{ subtask.title }}
                </li>
              </ul>
            </div>

            <button
              type="submit"
              class="text-white px-4 py-2 rounded bg-gradient-to-r from-green-400 to-green-500 dark:from-green-800 dark:to-green-900 hover:from-green-600 hover:to-green-700 dark:hover:from-green-900 dark:hover:to-green-950 transition duration-300"
            >
              Add Task
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import { useUserStore } from "../stores/user";
import { supabase } from "../supabase";

const userStore = useUserStore();

const newTask = reactive({
  title: "",
  description: {
    title: "",
    timeToBeCompleted: "",
    extraInfoRequired: [],
  },
  dueDate: "",
  priority: "low",
  subtasks: [],
  isCompleted: false,
});

const newExtraInfo = ref("");
const subtaskTitle = ref("");
const taskAdded = ref(false);

const handleSubmit = async () => {
  const user = userStore.user;
  if (!user) {
    console.error("User is not authenticated");
    return;
  }

  const taskToAdd = {
    user_id: user.id,
    title: newTask.title,
    description_title: newTask.description.title,
    description_time_to_be_completed: newTask.description.timeToBeCompleted,
    description_extra_info_required: JSON.stringify(
      newTask.description.extraInfoRequired
    ),
    due_date: newTask.dueDate,
    priority: newTask.priority,
    subtasks: JSON.stringify(newTask.subtasks),
    is_completed: newTask.isCompleted,
  };

  try {
    const { data, error } = await supabase.from("tasks").insert([taskToAdd]);

    console.log("Supabase insert response:", { data, error });

    if (error) {
      throw error;
    }

    // Success response
    console.log("Task created successfully:", data);
    taskAdded.value = true;
    resetForm();
  } catch (error) {
    console.error("Error creating task:", error.message);
  }
};

// Function to add extra information to the task
const addExtraInfo = () => {
  if (newExtraInfo.value.trim()) {
    newTask.description.extraInfoRequired.push(newExtraInfo.value.trim());
    newExtraInfo.value = "";
  }
};

// Function to add a subtask to the task
const addSubtask = () => {
  if (subtaskTitle.value.trim() !== "") {
    newTask.subtasks.push({
      id: Date.now(),
      title: subtaskTitle.value.trim(),
      isCompleted: false,
    });
    subtaskTitle.value = "";
  }
};

// Function to remove extra information from the task
const removeExtraInfo = (index) => {
  newTask.description.extraInfoRequired.splice(index, 1);
};

// Function to reset the form fields
const resetForm = () => {
  newTask.title = "";
  newTask.description.title = "";
  newTask.description.timeToBeCompleted = "";
  newTask.description.extraInfoRequired = [];
  newTask.dueDate = "";
  newTask.priority = "low";
  newTask.subtasks = [];
  newTask.isCompleted = false;
  taskAdded.value = false;
};

// Function to start a new task, resetting the form
const startNewTask = () => {
  resetForm();
  taskAdded.value = false;
};
</script>

<style scoped>
input {
  background-color: white;
  color: black;
  border: 1px solid #ccc;
}

/* Dark mode styles */
.dark input {
  background-color: gray;
  color: white;
  border: 1px solid #555;
}

.dark label {
  color: white;
}

.dark .text-lg {
  color: white;
}

/* Mobile Styles */
@media (max-width: 640px) {
  h2 {
    font-size: 1.5rem;
  }

  .container {
    padding: 0.5rem;
  }

  input,
  textarea {
    padding: 0.75rem;
    font-size: 1rem;
  }
}

/* Tablet Styles */
@media (min-width: 641px) and (max-width: 1024px) {
  h2 {
    font-size: 1.75rem;
  }

  .container {
    padding: 1rem;
  }

  input,
  textarea {
    padding: 1rem;
    font-size: 1.125rem;
  }
}

/* Desktop Styles */
@media (min-width: 1025px) {
  h2 {
    font-size: 2rem;
  }

  .container {
    padding: 1.5rem;
  }

  input,
  textarea {
    padding: 1.25rem;
    font-size: 1.25rem;
  }
}
</style>
