import { createWebHistory, createRouter } from "vue-router";
import Login from "../pages/Login";
import Register from "../pages/Register";
import UserDashboard from "../pages/UserDashboard";
import AllUsers from "../pages/AllUsers";
import NotFound from "../pages/NotFound";
import WorkingtimeChart from "../components/WorkingtimeChart";

const routes = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: UserDashboard,
  },
  {
    path: "/allUsers",
    name: "AllUsers",
    component: AllUsers,
  },
  {
    path: "/:catchAll(.*)",
    name: "NotFound",
    component: NotFound,
  },
  {
    path: "/workingtimeChart",
    name: "WorkingtimeChart",
    component: WorkingtimeChart
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
