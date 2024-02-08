import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue';
import AboutView from '../views/AboutView.vue';


// Register 
import SinupVue from '../views/SinupVue.vue';
import LoginVue from '../views/LoginVue.vue';


//Profile
import ProfileVue from '../views/ProfileVue.vue';
import UpdateProfile from '../views/UpdateProfile.vue';



// AS Home Page
import MyRests from '../views/MyRests.vue';

// Locations
import  updateLocation  from "../components/locations/updateLocation.vue";
import  DeletLocationPage  from "../components/locations/DeletlocationPage.vue";
import  DeletalllLocatons  from "../components/locations/deletAlllLocatons.vue";

// Menus
import  MenuVue  from "../components/Menus/MenuVue.vue";
import  AddnewCaty  from "../components/Menus/AddnewCaty.vue";
import  ViewCaty  from "../components/Menus/ViewCaty.vue";
import  UpdateCatygori  from "../components/Menus/UpdateCatygori.vue";
import DeletCatygori   from "../components/Menus/DeletCatygori.vue";
import DeleteAllCategories from "../components/Menus/DeleteAllCategories.vue";
import  AddItem  from "../components/Menus/AddItem.vue";
import  UpdateItem  from "../components/Menus/UpdateItem.vue";
import  DeleteItem  from "../components/Menus/DeleteItem.vue";

import ErrorPage from '../views/ErrorPage.vue';




const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView
  },
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
    path: '/my-rests',
    name: 'MyResturants',
    component: MyRests
  },
  {
    path: '/delete/:locationId',
    name: 'DeletePage',
    component: DeletLocationPage
  },
  {
    path: '/update/:locationId',
    name: 'UpdateLocation',
    component: updateLocation
  }, 
  {
    path: '/deleteAll',
    name: 'DeleteAll',
    component: DeletalllLocatons
  },

  {
    path: '/menu/view/:locationId',
    name: 'ViewMenu',
    component: MenuVue
  },
  {
    path: '/menu/catys/add/:locationId',
    name: 'AddnewCaty',
    component: AddnewCaty
  },
  {
    path: '/menu/catys/view/:locationId',
    name: 'ViewCaty',
    component: ViewCaty
  },
  {
    path: '/updateCaty/:catygoriID/:locationId',
    name: 'UpdateCatygori',
    component: UpdateCatygori
  }, 
  {
    path: '/deletCatygori/:catygoriID/:locationId',
    name: 'DeletCatygori',
    component: DeletCatygori
  }, 
  {
    path: '/deleteAllCategoris/:locationId',
    name: 'DeleteAllCategories',
    component: DeleteAllCategories
  }, 
  {
    path: '/addItem/:locationId',
    name: 'AddItem',
    component: AddItem
  }, 
  {
    path: '/updateItem/:itemId/:locationId',
    name: 'UpdateItem',
    component: UpdateItem
  }, 
  {
    path: '/deleteItem/:itemId/:locationId',
    name: 'DeleteItem',
    component: DeleteItem
  }, 


  // Stays last
  {
    path: '/:catchAll(.*)',
    name: 'ErrorPage',
    component: ErrorPage
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
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
  next();
});
export default router
