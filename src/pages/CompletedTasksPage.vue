<template>
  <div class="bg-white dark:bg-slate-900 w-full">
    <div class="w-full container mx-auto p-4">
      <div class="container min-h-screen mx-auto p-4">
        <h4 class="text-2xl font-bold mb-4 dark:text-white">
          Great job! You've completed these tasks:
        </h4>

        <ul class="flex flex-wrap gap-4">
          <li
            v-for="task in completedTasks"
            :key="task.id"
            class="bg-gradient-to-r from-green-50 to-green-100 dark:bg-gradient-to-r dark:from-green-800 dark:to-green-900 p-4 rounded-lg shadow-md w-full md:w-1/3 transition transform duration-300 ease-in-out hover:scale-105"
          >
            <h5 class="font-bold text-lg mb-2">✅ {{ task.title }}</h5>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { supabase } from "../supabase";

const completedTasks = ref([]);

const fetchCompletedTasks = async () => {
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
      .eq("is_completed", true);

    if (error) {
      console.error("Error fetching completed tasks:", error.message);
      return;
    }

    console.log("Fetched Completed Tasks:", tasksData); // Log fetched tasks for debugging
    completedTasks.value = tasksData || [];
  } catch (error) {
    console.error("Error fetching completed tasks:", error.message);
  }
};

onMounted(fetchCompletedTasks);
</script>
