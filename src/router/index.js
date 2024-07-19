import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../pages/HomePage.vue";
import AboutPage from "../pages/AboutPage.vue";
import AllTasksPage from "../pages/AllTasksPage.vue";
import CompletedTasksPage from "../pages/CompletedTasksPage.vue";
import AddTaskPage from "../pages/AddTaskPage.vue";
import AuthPage from "../pages/AuthPage.vue";
import TaskEditor from "../pages/TaskEditor.vue";
import UserProfile from "../components/Profile.vue"; 
import '@fortawesome/fontawesome-free/css/all.min.css';

import SignIn from "../components/SignIn.vue";
import SignUp from "../components/SignUp.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomePage,
  },
  {
    path: "/about",
    name: "about",
    component: AboutPage,
  },
  {
    path: "/all-tasks",
    name: "all tasks page",
    component: AllTasksPage,
  },
  {
    path: "/completed-tasks",
    name: "completed tasks page",
    component: CompletedTasksPage,
  },
  {
    path: "/add-task",
    name: "add new task page",
    component: AddTaskPage,
  },
  {
    path: "/edit-task/:taskId",
    name: "EditTask",
    component: TaskEditor,
    props: true,
  },
  {
    path: "/auth",
    name: "auth",
    component: AuthPage,
    children: [
      {
        path: "login",
        name: "login",
        component: SignIn,
      },
      {
        path: "register",
        name: "register",
        component: SignUp,
      },
    ],
  },
  {
    path: "/profile",
    name: "profile",
    component: UserProfile,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;