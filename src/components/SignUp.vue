<template>
  <div class="container mx-auto p-4 dark:bg-slate-900">
    <h2 class="text-2xl font-bold mb-4">Register</h2>
    <form @submit.prevent="handleRegister" class="space-y-4">
      <div class="form-input flex flex-col space-y-2">
        <label class="text-lg font-semibold">Email</label>
        <input
          type="email"
          v-model="formState.email"
          class="p-2 border border-gray-300 rounded-md w-full"
        />
      </div>
      <div class="form-input flex flex-col space-y-2">
        <label class="text-lg font-semibold">Password</label>
        <input
          type="password"
          v-model="formState.password"
          class="p-2 border border-gray-300 rounded-md w-full"
        />
      </div>
      <button
        type="submit"
        class="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition duration-300 ease-in-out"
      >
        Register
      </button>
    </form>
    <div v-if="errorMsg" class="mt-4 text-red-500 font-semibold">
      {{ errorMsg }}
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

const handleRegister = async () => {
  try {
    await userStore.register(formState.value.email, formState.value.password);
    if (userStore.isLoggedIn) {
      router.push("/");
    }
  } catch (error) {
    errorMsg.value = userStore.errorMsg;
  }
};
</script>

<style scoped>
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
