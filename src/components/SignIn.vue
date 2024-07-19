<template>
  <div class="w-full bg-white dark:bg-slate-900">
    <div class="container min-h-screen mx-auto p-4">
      <h2 class="text-2xl font-bold mb-4 dark:text-white">Login</h2>
      <form @submit.prevent="handleSignIn" class="space-y-6">
        <div class="form-input">
          <label
            class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >Email</label
          >
          <input
            type="email"
            v-model="formState.email"
            required
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div class="form-input">
          <label
            class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >Password</label
          >
          <input
            type="password"
            v-model="formState.password"
            required
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <button
          type="submit"
          class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Sign In
        </button>
      </form>
      <div v-if="errorMsg" class="mt-4 text-red-600 dark:text-red-400">
        {{ errorMsg }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useUserStore } from "../stores/user";
import { useRouter } from "vue-router";

const userStore = useUserStore();
const router = useRouter();

const formState = ref({
  email: "",
  password: "",
});

const errorMsg = ref("");

const handleSignIn = async () => {
  try {
    await userStore.signIn(formState.value.email, formState.value.password);
    if (userStore.isLoggedIn) {
      router.push("/");
    } else {
      errorMsg.value = "Invalid login credentials";
    }
  } catch (error) {
    errorMsg.value = userStore.errorMsg;
  }
};
</script>
