import { createStore } from 'vuex';
// import { useRouter } from "vue-router";
// let router = useRouter();
import axios from 'axios';
import router from '@/router';
export default createStore({
  state: {
    baseUrl: 'http://localhost:3000/',
    // Auth
    isAuthenticated: "",
    loggedInUserId: "",
    //Categories
    numOfCategorys: "",
    listOfCategorys: [],
    allCategories: "",
    allCatysIdIs: [],
    // Restarunts
    allRestarunts: "",
    listOfLocations: [],
    allUserMeals: "",
    locName: "",
    locAdrr: "",
    // Items || Meals 
    listOfItems: [],
    numOfItems: "",
    allItemsIdIs: [],
  },
  getters: {
    localStoregInfo() {
      return localStorage.getItem("user-info");
    }
  },
  mutations: {
    Authentication(state) {
      console.log('fired');
      if (this.getters.localStoregInfo) {
        state.isAuthenticated = true;
      } else {
        state.isAuthenticated = false;
      }
    },
    getUserId(state) {
      // let user = localStorage.getItem("user-info");
      state.loggedInUserId = JSON.parse(this.getters.localStoregInfo).id;
    },
    setLocationInfo(state, locDetails) {
      state.locName = locDetails.name;
      state.loc = locDetails.num;
      state.locAdrr = locDetails.addr;
    },
    setAllItems(state, items) {
      state.listOfItems = items;
      state.numOfItems = state.listOfItems.length;
    },
    setAllItemsIds(state, itemsIds){
      state.allItemsIdIs = itemsIds;
    },
    setAllCategoriesIds(state,allCategories){
      state.allCatysIdIs = allCategories;
    },
    setCategoris(state, payload) {
      state.listOfCategorys = payload;
      state.numOfCategorys = payload;
      console.log(payload + "payload");

    },
    setAllCategorys(state, displayCays) {
      state.listOfCategorys = displayCays
      state.numOfCategorys = state.listOfCategorys.length;
    },
    setLocations(state, location) {
      state.listOfLocations = location;
    },
    setAllUserMeals(state, allUserMeals) {
      state.allUserMeals = allUserMeals
    },
    setAllUserRestarunts(state, allUserRests) {
      state.allRestarunts = allUserRests
    },
    setAllUserCategories(state, allCategories) {
      state.allCategories = allCategories
    },
  },
  actions: {
    async doDisplayAllCategorys(context, paylaod) {
      let url = `http://localhost:3000/categorys?userId=${paylaod.userId}&locationId=${paylaod.locId}`;
      await axios.get(url)
        .then(result => {
          context.commit('setAllCategorys', result.data)
        })
        .catch(error => {
          console.log("Catnt to Displayd All the Categories :-(", error);
        });
    },
    async doCanUserAccessThisLocation(context, paylaod) {
      let url = `http://localhost:3000/locations?userId=${context.state.loggedInUserId}&id=${paylaod.locationIdIs}`;
      await axios.get(url)
        .then(result => {
          context.commit('setLocations', result.data)
          if (context.state.listOfLocations.length !== 1) {
            router.push({ path: `/my-rests` })
          }
        })
        .catch(error => {
          console.log(" :-(", error);
        });
    },
    async getLocationInfo(context, paylaod) {
      let url = `http://localhost:3000/locations?userId=${context.state.loggedInUserId}&id=${paylaod.locidIs}`;
      await axios.get(url)
        .then(response => {
          const locDetails = response.data[0];
          context.commit('setLocationInfo', locDetails);
        })
        .catch(err => {
          console.log("Bad Request :-(", err);
        });
    },
    async displayAllItems(context, paylaod) {
      let url = `http://localhost:3000/items?userId=${context.state.loggedInUserId}&locId=${paylaod.locidIs}`;
      await axios.get(url)
        .then(result => {
          context.commit('setAllItems', result.data)
        }).
        catch(error => {
          console.log("Cat displaying All of The Items :-(", error);
        });
    },
    async getAllItemsIds(context, paylaod) {
      let url = `http://localhost:3000/items?catygoriID=${paylaod.catidIs}`;
      let result = await axios.get(url);
      let itemsIds = result.data.map(item => item.id);
      context.commit('setAllItemsIds', itemsIds);
    },
    async getAllcatygoriesIds(context, paylaod) {
      let urlCat = `http://localhost:3000/categorys?locationId=${paylaod.locidIs}`;
      let resultCategories = await axios.get(urlCat);
      let allCategories = resultCategories.data.map(cat => cat.id);
      context.commit('setAllCategoriesIds', allCategories)
    },
    async logIn(context, data) {
      let result;
      let url = `http://localhost:3000/users?email=${data.email}&pswd=${data.psw}`;
      let params = {
        email: context,
        pass: context
      }
      await axios.get(url, params)
        .then(response => {
          console.table(response.data);
          localStorage.setItem("user-info", JSON.stringify(response.data[0]));
          result = true;
        })
        .catch(error => {
          console.log(error + "Erroooor");
          // userNotfoundError.value = "user not found 404 :-(";
        });
      return result
    },
    async doGetAllUserMeals(context) {
      let url = `http://localhost:3000/items?userId=${context.state.loggedInUserId}`;
      axios.get(url)
        .then(result => {
          context.commit('setAllUserMeals', result.data.length)
        })
        .catch(err => {
          console.log("your Error is ", err);
        })
    },
    async doGetAllUserRestarunts(context) {
      let url = `http://localhost:3000/locations?userId=${context.state.loggedInUserId}`;
      axios.get(url)
        .then(result => {
          context.commit('setAllUserRestarunts', result.data.length)
        })
        .catch(err => {
          console.log("your Error is ", err);
        })
    },
    async doGetAllUserCategories(context) {
      let url = `http://localhost:3000/categorys?userId=${context.state.loggedInUserId}`;
      axios.get(url)
        .then(result => {
          context.commit('setAllUserCategories', result.data.length)
        })
        .catch(err => {
          console.log("your Error is ", err);
        })
    },
  },
  modules: {}
})
/////////////////////////////////////////////////////