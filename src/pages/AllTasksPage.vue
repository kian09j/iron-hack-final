<template>
  <div>
    <h3>Add New Task</h3>
    <form @submit.prevent="addNewTask">
      <label>Title:</label>
      <input v-model="title" required />

      <label>Description:</label>
      <input v-model="descriptionTitle" required />

      <label>Time to Be Completed:</label>
      <input v-model="timeToBeCompleted" required />

      <label>Extra Info Required:</label>
      <input
        v-model="extraInfo"
        @keyup.enter="addExtraInfo"
        placeholder="Add extra info and press Enter"
      />
      <ul>
        <li v-for="info in extraInfoRequired" :key="info">{{ info }}</li>
      </ul>
      <div>
        <label>Due Date:</label>
        <input type="date" v-model="dueDate" required />
      </div>
      <div>
        <label>Priority:</label>
        <select v-model="priority" required>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>
      <div>
        <label>Subtasks:</label>
        <div v-for="(subtask, index) in subtasks" :key="index">
          <input v-model="subtask.title" placeholder="Subtask title" required />
          <button type="button" @click="removeSubtask(index)">Remove</button>
        </div>
        <button type="button" @click="addSubtask">Add Subtask</button>
      </div>
      <button type="submit">Add Task</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useTaskStore } from "../stores/taskStore";

const taskStore = useTaskStore();
const router = useRouter();

const title = ref("");
const descriptionTitle = ref("");
const timeToBeCompleted = ref("");
const extraInfo = ref("");
const extraInfoRequired = ref([]);
const dueDate = ref("");
const priority = ref("medium");

const subtasks = ref([{ title: "", isCompleted: false }]); // Initialize with one subtask

function addExtraInfo() {
  if (extraInfo.value.trim() !== "") {
    extraInfoRequired.value.push(extraInfo.value.trim());
    extraInfo.value = "";
  }
}

function addSubtask() {
  subtasks.value.push({ title: "", isCompleted: false });
}

function removeSubtask(index) {
  subtasks.value.splice(index, 1);
}

function addNewTask() {
  const newTask = {
    id: Date.now(),
    title: title.value,
    description: {
      title: descriptionTitle.value,
      timeToBeCompleted: timeToBeCompleted.value,
      extraInfoRequired: extraInfoRequired.value,
    },
    dueDate: dueDate.value,
    priority: priority.value,
    isCompleted: false,
    subtasks: subtasks.value, // Include subtasks
    userId: 1,
  };

  taskStore.addTask(newTask);
  router.push("/all-tasks");
}
</script>

<style scoped>
button {
  display: block;
  margin-bottom: 0.5rem;
}
</style>
