import { defineStore } from 'pinia';
import { supabase } from '../supabase';

export const useTaskStore = defineStore('taskStore', {
  state: () => ({
    tasks: [],
  }),
  actions: {
    async fetchTasks() {
      const { data: userData, error: userError } = await supabase.auth.getUser();
      if (userError || !userData) {
        console.error('User is not logged in.');
        return;
      }

      const user = userData.user;

      const { data: tasksData, error } = await supabase
        .from('tasks')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching tasks:', error.message);
        return;
      }

      this.tasks = tasksData.map((task) => ({
        ...task,
        description_extra_info_required: JSON.parse(task.description_extra_info_required || '[]'),
        subtasks: JSON.parse(task.subtasks || '[]'),
      }));
    },

    async updateTask(updatedTask) {
      const { error } = await supabase
        .from('tasks')
        .update(updatedTask)
        .eq('id', updatedTask.id);

      if (error) {
        console.error('Error updating task:', error.message);
        return;
      }

      this.fetchTasks();
    },

    async markTaskCompleted(taskId) {
      const task = this.tasks.find((task) => task.id === taskId);
      if (task) {
        task.is_completed = true;
        await this.updateTask(task);
      }
    },

    async deleteTask(taskId) {
      const { error } = await supabase
        .from('tasks')
        .delete()
        .eq('id', taskId);

      if (error) {
        console.error('Error deleting task:', error.message);
        return;
      }

      this.fetchTasks();
    },
  },
});