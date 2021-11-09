import { createWebHistory, createRouter } from "vue-router";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/user/Dashboard";
import AllUsers from "./pages/user/AllUsers";
import NotFound from "./pages/NotFound";
import ChartManager from "./pages/workingtimes/ChartManager";
import AllWorkingtimes from "./pages/workingtimes/AllWorkingtimes";
import WorkingtimeEdit from "./pages/workingtimes/WorkingtimeEdit";
import Profil from "./pages/user/Profil";
const user = JSON.parse(localStorage.getItem("user"));

const routes = [
  {
    path: "/",
    redirect: user ? "/dashboard" : "/login",
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
    component: Dashboard,
  },
  {
    path: "/profil",
    name: "Profil",
    component: Profil,
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
    path: "/chartManager",
    name: "ChartManager",
    component: ChartManager,
  },
  {
    path: "/allWorkingtimes",
    name: "AllWorkingtimes",
    component: AllWorkingtimes,
  },
  {
    path: "/workingtimeEdit/:userId?/:workingtimeId?",
    name: "WorkingtimeEdit",
    component: WorkingtimeEdit,
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const publicPages = ["/login", "/register", "/allUsers"];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem("user");

  if (authRequired && !loggedIn) {
    next("/login");
  } else {
    next();
  }
});

export default router;
