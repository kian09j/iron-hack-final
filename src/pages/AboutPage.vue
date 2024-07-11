<template>
  <div class="container mx-auto p-4">
    <div class="bg-white p-6 rounded-lg shadow-lg">
      <p class="mb-4">
        <div class="font-bold text-2xl">Welcome to my To-Do List Application!</div> I created this app as a project to
        help me stay organized with my daily tasks.
      </p>

      <h2 class="text-2xl font-bold mb-2">Features</h2>
      <ul class="list-disc list-inside mb-4">
        <li>Create, edit, and delete tasks</li>
        <li>Set due dates and priorities</li>
        <li>Mark tasks as completed or incomplete</li>
        <li>Organize tasks with subtasks</li>
        <li>Filter and sort tasks by different criteria</li>
      </ul>
     
      <h2 class="text-2xl font-bold mb-2">Contact Me</h2>
      <p>
        Please contact me if you have feedback :) 
        <a
          href="a@gmail.com"
          class="text-blue-500 hover:underline"
          >a@gmail.com</a
        >
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "About",
};
</script>

<style scoped>
.container {
  max-width: 800px;
}
.bg-white {
  background-color: #fff;
}
</style>
