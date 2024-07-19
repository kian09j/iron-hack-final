import { ref } from 'vue';
import { defineStore } from 'pinia';
import { supabase } from '../supabase';

export const useUserStore = defineStore('user', () => {
  const user = ref(null);
  const isLoggedIn = ref(false);
  const errorMsg = ref('');

  async function register(email, password) {
    try {
      const { data, error } = await supabase.auth.signUp({ email, password });
      if (error) {
        errorMsg.value = error.message;
        throw new Error(error.message);
      }
      user.value = data.user;
      isLoggedIn.value = true;
      return data.user;
    } catch (err) {
      console.error('Register Error:', err);
    }
  }

  async function signIn(email, password) {
    try {
      console.log('Attempting to sign in with:', email, password);
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        errorMsg.value = error.message;
        console.error('SignIn Error:', error.message);
        throw new Error(error.message);
      }
      console.log('SignIn Successful:', data.user);
      user.value = data.user;
      isLoggedIn.value = true;
      return data.user;
    } catch (err) {
      console.error('SignIn Error:', err);
    }
  }

  async function fetchUser() {
    try {
      const { data: { user: currentUser } } = await supabase.auth.getUser();
      user.value = currentUser;
      isLoggedIn.value = !!currentUser;
    } catch (error) {
      console.error('Fetch User Error:', error.message);
      user.value = null;
      isLoggedIn.value = false;
    }
  }

  async function signOut() {
    try {
      await supabase.auth.signOut();
      user.value = null;
      isLoggedIn.value = false;
    } catch (error) {
      console.error('SignOut Error:', error.message);
    }
  }

  return {
    user,
    isLoggedIn,
    errorMsg,
    register,
    signIn,
    signOut,
    fetchUser,
  };
});