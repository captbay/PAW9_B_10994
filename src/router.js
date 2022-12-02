import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

function importComponent(path) {
  return () => import(`./components/${path}.vue`);
}

const router = new VueRouter({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "admin",
      component: importComponent("DashboardLayout"),
      children: [
        // Dashboard
        {
          path: "/",
          name: "Root",
          component: importComponent("DashboardIndex"),
        },
        // To Do List
        {
          path: "/gd",
          name: "Guided",
          component: importComponent("TodoList/ListItem"),
        },
        // To Do List UGD
        {
          path: "/ugd",
          name: "Unguided",
          component: importComponent("TodoList/ListItemUGD"),
        },
        // To Do List TUGAS
        {
          path: "/tgs",
          name: "Tugas",
          component: importComponent("TodoList/ListItemTUGAS"),
        },
        // To pwa UGD
        {
          path: "/pwaUGD",
          name: "pwaUGD",
          component: importComponent("pwa_0994/MakananList"),
        },
        // To pwa tuags
        {
          path: "/pwaTGS",
          name: "pwaTGS",
          component: importComponent("pwa_0994/BuahList"),
        },
      ],
    },
  ],
});

export default router;
