<template>
  <div class="w-full bg-white dark:bg-slate-900">
    <div class="container min-h-screen mx-auto p-4">
      <h2 class="text-2xl font-bold mb-4 dark:text-white">Welcome back!</h2>

      <!-- Quick Actions -->
      <div class="flex justify-end items-center mb-4 space-x-4">
        <router-link
          to="/add-task"
          class="text-white px-4 py-2 rounded bg-gradient-to-r from-green-400 to-green-500 dark:from-green-800 dark:to-green-900 hover:from-green-600 hover:to-green-700 dark:hover:from-green-900 dark:hover:to-green-950 transition duration-300"
        >
          Add New Task
        </router-link>
        <router-link
          to="/all-tasks"
          class="text-white px-4 py-2 rounded bg-gradient-to-r from-blue-400 to-blue-500 hover:from-blue-600 hover:to-blue-700 dark:from-blue-800 dark:to-blue-900 hover:from-blue-600 hover:to-blue-700 dark:hover:from-blue-900 dark:hover:to-blue-950 transition duration-300"
        >
          View All Tasks
        </router-link>
      </div>

      <!-- Task Lists -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <!-- Upcoming Tasks -->
        <div
          class="bg-gradient-to-r from-yellow-50 to-yellow-100 dark:bg-gradient-to-r dark:from-slate-700 dark:to-gray-800 rounded-lg shadow-md p-4 transition transform duration-300 ease-in-out hover:scale-105"
        >
          <h3 class="text-lg font-bold mb-2 dark:text-yellow-200">
            Upcoming Tasks
          </h3>
          <ul>
            <li
              v-if="upcomingTasks.length === 0"
              class="text-gray-700 dark:text-gray-300"
            >
              None
            </li>
            <li
              v-else
              v-for="task in upcomingTasks"
              :key="task.id"
              class="text-gray-700 dark:text-gray-300 list-disc ml-4"
            >
              {{ task.title }} - {{ task.due_date }}
            </li>
          </ul>
        </div>

        <!-- Overdue Tasks -->
        <div
          class="bg-gradient-to-r from-yellow-50 to-yellow-100 ddark:bg-gradient-to-r dark:from-slate-700 dark:to-gray-800 rounded-lg shadow-md p-4 transition transform duration-300 ease-in-out hover:scale-105"
        >
          <h3 class="text-lg font-bold mb-2 dark:text-yellow-200">
            Overdue Tasks
          </h3>
          <ul>
            <li
              v-if="overdueTasks.length === 0"
              class="text-gray-700 dark:text-gray-300"
            >
              None
            </li>
            <li
              v-else
              v-for="task in overdueTasks"
              :key="task.id"
              class="text-gray-700 dark:text-gray-300 list-disc ml-4"
            >
              {{ task.title }} - {{ task.due_date }}
            </li>
          </ul>
        </div>

        <!-- Recently Completed Tasks -->
        <div
          class="col-span-2 md:col-span-1 bg-gradient-to-r from-yellow-50 to-yellow-100 dark:bg-gradient-to-r dark:from-slate-700 dark:to-gray-800 rounded-lg shadow-md p-4 transition transform duration-300 ease-in-out hover:scale-105"
        >
          <h3 class="text-lg font-bold mb-2 dark:text-yellow-200">
            Recently Completed Tasks
          </h3>
          <ul>
            <li
              v-if="recentlyCompletedTasks.length === 0"
              class="text-gray-700 dark:text-gray-300"
            >
              None
            </li>
            <li
              v-else
              v-for="task in recentlyCompletedTasks"
              :key="task.id"
              class="text-gray-700 dark:text-gray-300 list-disc ml-4"
            >
              {{ task.title }} - Completed on {{ task.completed_date }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { supabase } from "../supabase";

// Reactive references for tasks
const tasks = ref([]);
const upcomingTasks = ref([]);
const overdueTasks = ref([]);
const recentlyCompletedTasks = ref([]);

// Fetch tasks from Supabase
const fetchTasks = async () => {
  try {
    const { data: userData, error: userError } = await supabase.auth.getUser();
    if (userError || !userData) {
      console.error("User is not logged in.");
      return;
    }

    const user = userData.user;

    const { data: tasksData, error } = await supabase
      .from("tasks")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching tasks:", error.message);
      return;
    }

    tasks.value = tasksData || [];
    updateTaskLists();
  } catch (error) {
    console.error("Error fetching tasks:", error.message);
  }
};

// Update task lists based on fetched tasks
const updateTaskLists = () => {
  const now = new Date();

  upcomingTasks.value = tasks.value.filter(
    (task) => new Date(task.due_date) >= now && !task.is_completed
  );

  overdueTasks.value = tasks.value.filter(
    (task) => new Date(task.due_date) < now && !task.is_completed
  );

  recentlyCompletedTasks.value = tasks.value
    .filter((task) => task.is_completed)
    .sort((a, b) => new Date(b.completed_date) - new Date(a.completed_date))
    .slice(0, 5);
};

onMounted(fetchTasks);
</script>

<style scoped>
@media (min-width: 768px) {
  .grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

.rounded-lg {
  border-radius: 0.5rem;
}

.shadow-md {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.p-4 {
  padding: 1rem;
}

.transition {
  transition: all 0.3s ease-in-out;
}

.transform {
  transform: scale(1);
}

.hover\:scale-105:hover {
  transform: scale(1.05);
}

/* Responsive Design */
@media (max-width: 768px) {
  .text-lg {
    font-size: 1rem;
  }

  .p-4 {
    padding: 0.75rem;
  }
}
</style>
