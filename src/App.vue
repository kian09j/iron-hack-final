<template>
  <div>
    <!-- Conditionally render navbar based on route -->
    <header v-if="!isAuthPage">
      <nav class="bg-white dark:bg-slate-900 relative">
        <div
          class="flex flex-col md:flex-row items-center p-5 text-3xl font-bold border-b border-gray-500 dark:border-gray-400"
        >
          <div
            class="text-black text-6xl uppercase pt-10 pb-5 flex justify-center dark:text-white flex-grow"
          >
            <HelloWorld msg="To Do List Application" />
          </div>
          <!-- Dark Mode Toggle and Hamburger Menu for small screens -->
          <div
            class="flex flex-col md:flex-row items-center space-x-4 md:space-x-0 md:space-y-0 space-y-2 md:space-y-0"
          >
            <DarkModeToggle />
            <button
              @click="toggleMenu"
              class="md:hidden text-3xl text-gray-700 dark:text-white"
            >
              <i class="fas fa-bars"></i>
            </button>
          </div>
        </div>

        <!-- Mobile Menu -->
        <div
          v-if="isMenuOpen"
          class="fixed inset-0 bg-white dark:bg-slate-900 z-50 md:hidden"
        >
          <div class="flex flex-col p-5">
            <button
              @click="toggleMenu"
              class="text-3xl text-gray-700 dark:text-white mb-4"
            >
              <i class="fas fa-times"></i>
            </button>
            <RouterLink
              to="/"
              class="text-2xl text-gray-800 dark:text-white mb-4"
              @click="toggleMenu"
            >
              Home
            </RouterLink>
            <RouterLink
              to="/about"
              class="text-2xl text-gray-800 dark:text-white mb-4"
              @click="toggleMenu"
            >
              About
            </RouterLink>
            <RouterLink
              to="/all-tasks"
              class="text-2xl text-gray-800 dark:text-white mb-4"
              @click="toggleMenu"
            >
              All Tasks
            </RouterLink>
            <RouterLink
              to="/completed-tasks"
              class="text-2xl text-gray-800 dark:text-white mb-4"
              @click="toggleMenu"
            >
              Completed Tasks
            </RouterLink>
            <RouterLink
              to="/add-task"
              class="text-2xl text-gray-800 dark:text-white mb-4"
              @click="toggleMenu"
            >
              Add New Task
            </RouterLink>
            <RouterLink
              to="/profile"
              class="text-2xl text-gray-800 dark:text-white mb-4"
              @click="toggleMenu"
            >
              Account
            </RouterLink>
            <button
              @click="handleSignOut"
              class="text-white text-lg px-4 py-2 rounded bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-700 hover:to-pink-700 dark:bg-gradient-to-r dark:from-red-700 dark:to-pink-800 dark:hover:bg-gradient-to-r dark:hover:from-red-900 dark:hover:to-pink-950 transition transform duration-300 ease-in-out hover:scale-105"
            >
              Sign Out
            </button>
          </div>
        </div>

        <!-- Desktop Menu -->
        <div
          v-if="isUserLoggedIn"
          class="flex justify-between items-center p-5 text-3xl font-bold border-b border-gray-500 dark:border-gray-400"
        >
          <RouterLink
            to="/"
            class="nav-item mx-4 text-zinc-950 text-xl dark:text-zinc-50"
            >Home</RouterLink
          >
          <RouterLink
            to="/about"
            class="nav-item mx-4 text-zinc-950 text-xl dark:text-zinc-50"
            >About</RouterLink
          >
          <RouterLink
            to="/all-tasks"
            class="nav-item mx-4 text-zinc-950 text-xl dark:text-zinc-50"
            >All Tasks</RouterLink
          >
          <RouterLink
            to="/completed-tasks"
            class="nav-item mx-4 text-zinc-950 text-xl dark:text-zinc-50"
            >Completed Tasks</RouterLink
          >
          <RouterLink
            to="/add-task"
            class="nav-item mx-4 text-zinc-950 text-xl dark:text-zinc-50"
            >Add New Task</RouterLink
          >
          <RouterLink
            to="/profile"
            class="nav-item mx-4 text-zinc-950 text-xl dark:text-zinc-50"
            >Account</RouterLink
          >
          <button
            @click="handleSignOut"
            class="text-white text-lg px-4 py-2 rounded bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-700 hover:to-pink-700 dark:bg-gradient-to-r dark:from-red-700 dark:to-pink-800 dark:hover:bg-gradient-to-r dark:hover:from-red-900 dark:hover:to-pink-950 transition transform duration-300 ease-in-out hover:scale-105"
          >
            Sign Out
          </button>
        </div>
      </nav>
    </header>
    <RouterView />
  </div>
</template>
<script setup>
import HelloWorld from "./components/HelloWorld.vue";
import { ref, onMounted, watch } from "vue";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { useUserStore } from "./stores/user";
import DarkModeToggle from "./components/DarkMode.vue";

const router = useRouter();
const userStore = useUserStore();
const { user, isLoggedIn } = storeToRefs(userStore);
const isUserLoggedIn = ref(false);
const isMenuOpen = ref(false); // State to manage the mobile menu

// Toggle the mobile menu visibility
const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

onMounted(() => {
  console.log("hello calling function");
  try {
    userStore.fetchUser().then(() => {
      if (user.value) {
        isUserLoggedIn.value = true;
      } else {
        router.push({ path: "/auth/login" });
      }
    });
  } catch (error) {
    console.log(error);
  }
});

watch(isLoggedIn, (newVal) => {
  isUserLoggedIn.value = newVal;
});

// Handle sign out action
const handleSignOut = () => {
  userStore.signOut();
  router.push({ path: "/auth/login" });
  isUserLoggedIn.value = false;
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900&display=swap");

body {
  font-family: "Poppins", sans-serif;
}

.nav-item {
  position: relative;
  display: inline-block;
  padding-bottom: 4px;
}

.nav-item::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 0;
  height: 2px;
  background-color: #000;
  transition: all 0.3s ease-out;
  transform: translateX(-50%);
}
.dark .nav-item::after {
  background-color: #fff;
}
.nav-item:hover::after {
  width: 100%;
}
@media (max-width: 768px) {
  button {
    display: block;
  }

  .md\\:hidden {
    display: block;
  }

  .hidden {
    display: none;
  }
}

@media (min-width: 769px) {
  .md\\:hidden {
    display: none;
  }

  .hidden {
    display: block;
  }
}
</style>
