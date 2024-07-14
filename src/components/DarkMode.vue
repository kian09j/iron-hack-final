<template>
  <button
    @click="toggleDarkMode"
    class="text-lg px-4 py-2 rounded bg-gray-200 dark:bg-gray-700 dark:text-white"
  >
    {{ isDarkMode ? "Light Mode" : "Dark Mode" }}
  </button>
</template>

<script setup>
import { ref } from "vue";

// Reactive reference to track dark mode state
const isDarkMode = ref(document.body.classList.contains("dark"));

// Function to toggle dark mode
const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value;
  // Toggle dark mode class on the body
  document.body.classList.toggle("dark", isDarkMode.value);
};
</script>
