<template>
  <header class="bg-white shadow-lg">
    <!-- Navigation links -->
    <nav class="border-b border-amber-300">
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
          class="flex justify-between items-center p-5 text-3xl font-bold text-amber-500"
        >
          <div
            class="text-black text-5xl uppercase pt-10 pb-5 flex justify-center"
          >
            <HelloWorld msg="To Do List Application" />
          </div>
          <RouterLink to="/" class="mx-4 text-zinc-950">Home</RouterLink>
          <RouterLink to="/about" class="mx-4 text-zinc-950">About</RouterLink>
          <RouterLink to="/all-tasks" class="mx-4 text-zinc-950"
            >All Tasks</RouterLink
          >
          <RouterLink to="/completed-tasks" class="mx-4 text-zinc-950"
            >Completed Tasks</RouterLink
          >
          <RouterLink to="/add-task" class="mx-4 text-zinc-950"
            >Add New Task</RouterLink
          >
          <button
            @click="handleSignOut"
            class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 mx-4"
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
