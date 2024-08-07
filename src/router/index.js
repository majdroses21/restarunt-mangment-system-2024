import { createRouter, createWebHistory } from 'vue-router';
import AboutView from '../views/AboutView.vue';

// Register 
import SinupVue from '../views/SinupVue.vue';
import LoginVue from '../views/LoginVue.vue';

//Home
// import HomeView from '../views/HomeView.vue';

//Dash
import DashBoard  from '../views/DashBoard.vue'; 

// All Restarunts AS Home Page
import MyRests from '../views/MyRests.vue';
// Menu
import  MenuVue  from "../components/Menus/MenuVue.vue";


//Profile
import ProfileVue from '../views/ProfileVue.vue';
import UpdateProfile from '../views/UpdateProfile.vue';


//Err 404
import ErrorPage from '../views/ErrorPage.vue';

const routes = [
  {
    path: '/sinup',
    name: 'Sinup',
    component: SinupVue
  },
  {
    path: '/login',
    name: 'LoginForm',
    component: LoginVue
  },
  {
    path: '/',
    name: 'home',
    component: MyRests
  },
  {
    path: '/my-rests',
    name: 'MyResturants',
    component: MyRests
  },
  {
    path: '/dashboard',
    name: 'Dash_Board',
    component: DashBoard
  },
  {
    path: '/menu/view/:locationId',
    name: 'ViewMenu',
    component: MenuVue
  },
  {
    path: '/profile',
    name: 'Profile',
    component: ProfileVue
  },
  {
    path: '/UpdateProfile',
    name: 'updateProfile',
    component: UpdateProfile
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView
  },
  {
    path: '/:catchAll(.*)',
    name: 'ErrorPage',
    component: ErrorPage
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});
// let user = localStorage.getItem("user-info");






import  store  from '../store/';
store.commit('Authentication');
console.log("store from route " , store);
let isAuthenticated =  store.state.isAuthenticated;
// console.log(store.state.isAuthenticated);
router.beforeEach((to, from, next) => {

  if (to.params.pageTitle !== undefined) {
    // if page title is empty or
    document.title = `${to.params.pageTitle} | ${process.env.VUE_APP_TITLE}`;
  } else {
    if (to.name == null) {
      document.title = `Unknow Page | ${process.env.VUE_APP_TITLE}`;
    } else {
      document.title = `${to.name} | ${process.env.VUE_APP_TITLE}`;
    }
  }

  if (to.name != 'LoginForm' && to.name != 'Sinup' && !isAuthenticated){
     next('/login');
    return
  } 
   else if(to.name == 'LoginForm' && isAuthenticated){
    next('/')
   }
  else{
     next()
  }
 return next()
});
export default router
