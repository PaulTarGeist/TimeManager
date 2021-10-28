import { createWebHistory, createRouter } from "vue-router";
import Login from "../pages/Login";
import Register from "../pages/Register";
import UserDashboard from "../pages/UserDashboard";

// import NotFound from "../pages/Login";

const routes = [
  {
    path: "/",
    name: "login",
    component: Login,
    props: true,
  },
  {
    path: "/register",
    name: "register",
    component: Register,
    props: true,
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: UserDashboard,
    props: true,
  },
  // {
  //   path: "/:pathMatch(.*)*",
  //   component: NotFound,
  // },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
