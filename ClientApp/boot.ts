import Vue from "vue";
Vue.config.devtools = true;
import VueRouter from "vue-router";
import mainApp from './components/app/app.vue.html'
import { UserService } from "./service/UserService";

Vue.use(VueRouter);

const routes = [
  { 
    name: "",
    path: "/",
    component: require('./components/home/home.vue.html').default
  },
  { 
    name: "home",
    path: "/home",
    component: require('./components/home/home.vue.html').default
  },
  { 
    name: "product",
    path: "/product",
    component: require('./components/product/product.vue.html').default
  },
  {
    name: "login",
    path: "/login",
    component: require("./components/public/login/login.vue.html").default
  },
  {
    name: "register",
    path: "/register",
    component: require("./components/public/register/register.vue.html").default
  },
  {
    name: "logout",
    path: "/logout",
    component: require("./components/public/logout/logout.vue.html").default
  }
];

export const router = new VueRouter({
  mode: 'history',
  routes: routes
});

router.beforeEach((to, from, next) => {
  console.log('Rogerio starting beforeeach on router');
  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages: Array<string> = ['/login', '/register', '/logout'];
  const isNotPublicPages = publicPages.filter(x => x === to.path).length == 0;
  const loggedIn = new UserService().isUserLoggedIn();

  if (isNotPublicPages && (loggedIn == null || !loggedIn)) {
    console.log('Redirecting to Login page. Rogerio');
    return next('/login');
  }

  next();
})

new Vue({
  el: "#app-root",
  router: router,
  render: h => h(mainApp)
});
