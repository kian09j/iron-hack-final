<template>
  <div class="dark:bg-slate-900">
    <div class="container mx-auto p-4 dark:bg-slate-900">
      <h2 class="text-2xl font-bold mb-4">User Profile</h2>
      <form @submit.prevent="updateProfile" class="space-y-4">
        <div class="flex flex-col space-y-2">
          <label class="text-lg font-semibold">Email</label>
          <input
            type="email"
            v-model="profile.email"
            readonly
            class="p-2 border border-gray-300 rounded-md w-full"
          />
        </div>
        <div class="flex flex-col space-y-2">
          <label class="text-lg font-semibold">Full Name</label>
          <input
            type="text"
            v-model="profile.full_name"
            class="p-2 border border-gray-300 rounded-md w-full"
          />
        </div>
        <button
          type="submit"
          class="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition duration-300 ease-in-out"
        >
          Update Profile
        </button>
      </form>
      <div v-if="message" class="mt-4 text-red-500 font-semibold">
        {{ message }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { supabase } from "../supabase";

const profile = ref({
  email: "",
  full_name: "",
});
const message = ref("");

const getProfile = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    profile.value.email = user.email;
    const { data, error } = await supabase
      .from("profiles")
      .select("full_name")
      .eq("id", user.id)
      .single();

    if (data) {
      profile.value.full_name = data.full_name;
    } else if (error) {
      console.error(error);
    }
  }
};

const updateProfile = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (user) {
    const { error } = await supabase
      .from("profiles")
      .upsert({ id: user.id, full_name: profile.value.full_name });

    if (error) {
      message.value = "Error updating profile";
      console.error(error);
    } else {
      message.value = "Profile updated successfully";
    }
  }
};

onMounted(getProfile);
</script>

<style scoped>
input {
  background-color: white;
  color: black;
  border: 1px solid #ccc;
}

/* Dark mode styles */
.dark input {
  background-color: #2d2d2d; /* Dark background */
  color: white; /* White text */
  border: 1px solid #555; /* Slightly lighter border */
}

/* Ensure labels and other text is readable in dark mode */
.dark label {
  color: white;
}

/* Additional styles for the form if needed */
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
