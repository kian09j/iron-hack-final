<template>
  <h4>This Page Displays all tasks</h4>

  <div class="container">
    <div>
      <label for="sort">Sort by:</label>
      <select id="sort" v-model="sortOption" @change="sortTasks">
        <option value="dueDate">Due Date</option>
        <option value="priority">Priority</option>
        <option value="completionStatus">Completion Status</option>
      </select>
    </div>

    <ul>
      <li v-for="task in sortedTasks" :key="task.id">
        <h5>{{ task.title }}</h5>
        <h6>{{ task.description.title }}</h6>
        <h6>{{ task.description.timeToBeCompleted }}</h6>
        <ul>
          <li
            v-for="(extraInfo, index) in task.description.extraInfoRequired"
            :key="index"
          >
            {{ extraInfo }}
          </li>
        </ul>
        <h6>{{ task.isCompleted ? "Completed" : "Incomplete" }}</h6>
        <h6>Due date: {{ task.dueDate }}</h6>
        <p>Priority: {{ task.priority }}</p>

        <ul>
          <li v-for="subtask in task.subtasks" :key="subtask.id">
            <p>
              {{ subtask.title }} -
              {{ subtask.isCompleted ? "Completed" : "Incomplete" }}
            </p>
            <button
              :disabled="subtask.isCompleted"
              @click="markSubtaskCompleted(task.id, subtask.id)"
            >
              Mark Subtask as Completed
            </button>
          </li>
        </ul>

        <button
          :disabled="task.isCompleted"
          @click="markTaskCompleted(task.id)"
        >
          Mark as Completed
        </button>
        <button @click="deleteTask(task.id)">Delete Task</button>
        <router-link :to="{ name: 'EditTask', params: { taskId: task.id } }">
          <button>Edit</button>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useTaskStore } from "../stores/taskStore";

const taskStore = useTaskStore();
const { tasks, deleteTask, markTaskCompleted, updateTask } = taskStore;

const sortOption = ref("dueDate");

const sortedTasks = computed(() => {
  return [...tasks].sort((a, b) => {
    if (sortOption.value === "dueDate") {
      return new Date(a.dueDate) - new Date(b.dueDate);
    } else if (sortOption.value === "priority") {
      const priorityOrder = { low: 1, medium: 2, high: 3 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    } else if (sortOption.value === "completionStatus") {
      return a.isCompleted - b.isCompleted;
    }
  });
});

function sortTasks() {
  sortedTasks.value;
}

function markSubtaskCompleted(taskId, subtaskId) {
  const task = tasks.find((task) => task.id === taskId);
  if (task) {
    const subtask = task.subtasks.find((subtask) => subtask.id === subtaskId);
    if (subtask) {
      subtask.isCompleted = true;
      updateTask(task);
    }
  }
}
</script>

<style scoped>
button {
  display: block;
  margin-bottom: 0.5rem;
}
</style>
