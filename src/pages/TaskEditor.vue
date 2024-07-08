<template>
  <div>
    <h1>Edit Task</h1>
    <form @submit.prevent="saveTask">
      <div>
        <label for="title">Title</label>
        <input id="title" v-model="task.title" type="text" />
      </div>
      <div>
        <label for="description">Description</label>
        <input id="description" v-model="task.description.title" type="text" />
      </div>
      <div>
        <label for="timeToBeCompleted">Time to be Completed</label>
        <input
          id="timeToBeCompleted"
          v-model="task.description.timeToBeCompleted"
          type="text"
        />
      </div>
      <div>
        <label for="extraInfoRequired">Extra Info Required</label>
        <input id="extraInfoRequired" v-model="extraInfo" type="text" />
        <button type="button" @click="addExtraInfo">Add</button>
      </div>
      <div>
        <ul>
          <li
            v-for="(info, index) in task.description.extraInfoRequired"
            :key="index"
          >
            {{ info }}
          </li>
        </ul>
      </div>
      <div>
        <label>Due Date:</label>
        <input type="date" v-model="task.dueDate" required />
      </div>

      <label>Priority:</label>
      <select v-model="task.priority" required>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>

      <div>
        <label for="isCompleted">Is Completed</label>
        <input id="isCompleted" v-model="task.isCompleted" type="checkbox" />
      </div>
      <div>
        <label for="isFav">Is Favorite</label>
        <input id="isFav" v-model="task.isFav" type="checkbox" />
      </div>
      <button type="submit">Save</button>
    </form>
  </div>
</template>

<script>
import { ref } from "vue";
import { useTaskStore } from "../stores/taskStore";
import { useRouter, useRoute } from "vue-router";

export default {
  setup() {
    const taskStore = useTaskStore();
    const route = useRoute();
    const router = useRouter();

    const taskId = route.params.taskId;
    const task = ref({
      ...taskStore.tasks.find((task) => task.id === parseInt(taskId)),
    });

    const extraInfo = ref("");

    const addExtraInfo = () => {
      if (extraInfo.value) {
        task.value.description.extraInfoRequired.push(extraInfo.value);
        extraInfo.value = "";
      }
    };

    const saveTask = () => {
      console.log("Saving task:", task.value);
      taskStore.updateTask(task.value);
      console.log("Task saved successfully.");
      router.push({ name: "all tasks page" });
    };

    return {
      task,
      extraInfo,
      addExtraInfo,
      saveTask,
    };
  },
};
</script>

<style scoped>
/* Add optional scoped styles for your task editor here */
</style>
