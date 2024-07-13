<template>
  <header class="from-current">
    <!-- Navigation links -->
    <nav class="bg-gradient-to-r from-cyan-50 to-blue-50">
      <template v-if="!isLoggedIn">
        <!-- If the user is not logged in, show these links -->
        <div class="flex justify-between p-4 text-3xl font-bold text-amber-800">
          <RouterLink to="/auth/login" class="mx-4">Login</RouterLink>
          <RouterLink to="/auth/register" class="mx-4">Register</RouterLink>
        </div>
      </template>

      <template v-else>
        <!-- If the user is logged in, show these links -->
        <div
          class="flex justify-between items-center p-5 text-3xl font-bold border-b border-gray-500"
        >
          <div
            class="text-black text-6xl uppercase pt-10 pb-5 flex justify-center"
          >
            <HelloWorld msg="To Do List Application" />
          </div>
          <RouterLink to="/" class="nav-item mx-4 text-zinc-950 text-xl"
            >Home</RouterLink
          >
          <RouterLink to="/about" class="nav-item mx-4 text-zinc-950 text-xl"
            >About</RouterLink
          >
          <RouterLink
            to="/all-tasks"
            class="nav-item mx-4 text-zinc-950 text-xl"
            >All Tasks</RouterLink
          >
          <RouterLink
            to="/completed-tasks"
            class="nav-item mx-4 text-zinc-950 text-xl"
            >Completed Tasks</RouterLink
          >
          <RouterLink to="/add-task" class="nav-item mx-4 text-zinc-950 text-xl"
            >Add New Task</RouterLink
          >
          <button
            @click="handleSignOut"
            class="text-white text-lg px-4 py-2 rounded bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-700 hover:to-pink-700 transition transform duration-300 ease-in-out hover:scale-105"
          >
            Sign Out
          </button>
        </div>
      </template>
    </nav>
  </header>

  <!-- RouterView to display the current route's component -->
  <RouterView />
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900&display=swap");

body {
  font-family: "Poppins", sans-serif;
}

.nav-item {
  position: relative;
  display: inline-block;
  padding-bottom: 4px; /* Adjust padding as needed */
}

.nav-item::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 0;
  height: 2px; /* Adjust the height of the line */
  background-color: #000; /* Adjust the color of the line */
  transition: all 0.3s ease-out; /* Adjust the transition timing */
  transform: translateX(-50%);
}

.nav-item:hover::after {
  width: 100%;
}
</style>

<script setup>
// ------------------------------------------------------------------------
// Import Block
// ------------------------------------------------------------------------

// Import the HelloWorld component
import HelloWorld from "./components/HelloWorld.vue";
// Import ref, onMounted, and onBeforeMount from Vue
import { ref, onMounted, onBeforeMount } from "vue";
// Import storeToRefs from Pinia to keep reactivity
import { storeToRefs } from "pinia";
// Import useRouter from vue-router for navigation
import { useRouter } from "vue-router";
// Import useUserStore to access user-related data
import { useUserStore } from "../src/stores/user";

// ------------------------------------------------------------------------
// Variable Definition Block
// ------------------------------------------------------------------------

// Router instance for navigation
const router = useRouter();
// Store user accessed easily here
const userStore = useUserStore();
// Destructure the variable 'user' and 'isLoggedIn' out of the store, keeping their reactivity using storeToRefs
const { user, isLoggedIn } = storeToRefs(userStore);
// Reactive variable to hide/show elements based on user login status
const isUserloggedIn = ref(false);

// ------------------------------------------------------------------------
// Lifecycle Hook: onMounted
// ------------------------------------------------------------------------

// Using the onMounted lifecycle hook to perform actions when the component is mounted
onMounted(() => {
  console.log("hello calling function");
  try {
    // Fetch the user data from the store
    userStore.fetchUser();
    // Check if the user is stored in localStorage
    if (!user.value) {
      // If no user is found, redirect to login page
      router.push({ path: "/auth/login" });
    } else {
      // If user is found, update the reactive variable and redirect to home
      isUserloggedIn.value = true;
      router.push({ path: "/" });
    }
  } catch (error) {
    console.log(error);
  }
});

// ------------------------------------------------------------------------
// Function to Sign Out User
// ------------------------------------------------------------------------

/**
 * Signs out the user and redirects to the login page.
 */
let handleSignOut = () => {
  // Call the signOut function from the user store
  userStore.signOut();
  // Redirect to login page
  router.push({ path: "/auth/login" });
  // Update the reactive variable to false
  isUserloggedIn.value = false;
};

/*
  The handleSignOut function is used to log out the current user.
  - It calls the signOut function from the user store to clear user data.
  - It redirects the user to the login page.
  - It updates the isUserloggedIn reactive variable to false.
  */

// ------------------------------------------------------------------------
// Additional Lifecycle Hooks (Placeholder for onBeforeMount, onUpdated)
// ------------------------------------------------------------------------

// Additional lifecycle hooks such as onBeforeMount and onUpdated can be added here if needed.
</script>
