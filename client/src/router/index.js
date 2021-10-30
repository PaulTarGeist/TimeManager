import { createWebHistory, createRouter } from "vue-router";
import Login from "../pages/Login";
import Register from "../pages/Register";
import UserDashboard from "../pages/UserDashboard";
import AllUsers from "../pages/AllUsers";
import NotFound from "../pages/NotFound";
import WorkingtimeChart from "../pages/WorkingtimeChart";
import AllWorkingtimes from "../pages/AllWorkingtimes";
import WorkingtimeEdit from "../pages/WorkingtimeEdit";
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
  {
    path: "/allWorkingtimes",
    name: "AllWorkingtimes",
    component: AllWorkingtimes
  },
  {
    path: "/workingtimeEdit/:userId?/:workingtimeId?",
    name: "WorkingtimeEdit",
    component: WorkingtimeEdit
  }
]
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
