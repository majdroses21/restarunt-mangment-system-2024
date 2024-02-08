import { createStore } from 'vuex';
// import { useRouter } from "vue-router";
// let router = useRouter();
import axios from 'axios';
import router from '@/router';
export default createStore({
  state: {
    baseUrl: 'http://localhost:3000/',

    isUserlogedin: "",
    loggedInUserId: "",
    numOfCategorys: "",
    listOfCategorys: [],
    //
    listOfLocations: [],
    locName: "",
    locNum: "",
    locAdrr: "",
    //
    listOfItems: [],
    numOfItems: "",
    //
    catyData: [],
    catyName: "",
    //
    allItemsIdIs: [],
    //
    allCatysIdIs: [],
    //
    listOfAllitems: [],
    //
  },
  getters: {},
  mutations: {
    isLoggedInUser(state) {
      console.log('fired');
      let user = localStorage.getItem("user-info");
      if (user) {
        state.isUserlogedin = true;
        state.loggedInUserId = JSON.parse(user).id;
      } else {
        state.isUserlogedin = false;
        router.push({ path: "/login" });
      }
      // console.log(state.loggedInUserId);
    },
    async displayAllCategorys(state, paylaod) {
      let url = `http://localhost:3000/categorys?userId=${paylaod.userId}&locationId=${paylaod.locId}`;
      await axios.get(url)
        .then(result => {
          console.log(result.data , "Frome vueX" );
          state.listOfCategorys = result.data;
          state.numOfCategorys = state.listOfCategorys.length;
        })
        .catch(error => {
          console.log("Catnt to Displayd All the Categories :-(", error);
        });
    },
    async canUserAccessThisCategory(state, paylaod) {
      let url = `http://localhost:3000/categorys?id=${paylaod.catygoriIdIS}&userId=${state.loggedInUserId}&locationId=${paylaod.locidIs}`;
      await axios.get(url)
        .then(result => {
          state.listOfCategorys = result.data;
          if (state.listOfCategorys.length !== 1) {
            router.push({ path: `/my-rests` })
          }
        })
        .catch(error => {
          console.log(" :-(", error);
        });
    },
    async canUserAccessThisItem(state, paylaod) {
      let url = `http://localhost:3000/items?id=${paylaod.itemiIdIS}&userId=${state.loggedInUserId}&locationId=${paylaod.locidIs}`;
      await axios.get(url)
        .then(result => {
          state.listOfAllitems = result.data;
          console.log(state.listOfAllitems.length);
          if (state.listOfAllitems.length !== 1) {
            router.push({ path: `/menu/${paylaod.locidIs}` })
          }
        })
        .catch(error => {
          console.log(" :-(", error);
        });
    },
    async canUserAccessThisLocation(state, paylaod) {
      let url = `http://localhost:3000/locations?userId=${state.loggedInUserId}&id=${paylaod.locationIdIs}`;
      await axios.get(url)
        .then(result => {
          state.listOfLocations = result.data;
          if (state.listOfLocations.length !== 1) {
            router.push({ path: `/my-rests` })
          }
        })
        .catch(error => {
          console.log(" :-(", error);
        });
    },
    async getLocationInfo(state, paylaod) {
      let url = `http://localhost:3000/locations?userId=${state.loggedInUserId}&id=${paylaod.locidIs}`;
      await axios.get(url)
        .then(result => {
          let locDetails = [];
          locDetails = result.data;
          state.locName = locDetails[0].name;
          state.loc = locDetails[0].num;
          state.locAdrr = locDetails[0].addr;
        })
        .catch(err => {
          console.log("Bad Request :-(", err);
        });
    },
    async getCatygoryInfo(state, payload) {
      let url = `http://localhost:3000/categorys?id=${payload.catygoriIdIS}&userId=${state.loggedInUserId}`;
      await axios.get(url)
        .then(result => {
          state.catyData = result.data;
          state.catyName = state.catyData[0].name;
        })
        .catch(error => {
          console.log(error, "Bad result :-(");
        });
    },
    async displayAllItems(state, paylaod) {
      let url = `http://localhost:3000/items?userId=${state.loggedInUserId}&locId=${paylaod.locidIs}`;
      await axios.get(url)
        .then(result => {
          state.listOfItems = result.data;
          state.numOfItems = state.listOfItems.length;
        }).
        catch(error => {
          console.log("Cat displaying All of The Items :-(", error);
        });
    },
    async getAllItemsIds(state, paylaod) {
      let url = `http://localhost:3000/items?catygoriID=${paylaod.catidIs}`;
      let result = await axios.get(url);
      let resLen = result.data.length;
      for (let i = 0; i < resLen; i++) {
        state.allItemsIdIs.push(result.data[i].id);
      }
    },
    async getAllcatygoriesIds(state, paylaod) {
      let urlCat = `http://localhost:3000/categorys?locationId=${paylaod.locidIs}`;
      let resultCategories = await axios.get(urlCat);
      for (let c = 0; c < resultCategories.data.length; c++) {
        state.allCatysIdIs.push(resultCategories.data[c].id);
      }
    },
    setCategoris(state, payload) {
      state.listOfCategorys = payload;
      state.numOfCategorys = payload;
      console.log(payload + "payload");

    }
  },
  actions: {
    
  },
  modules: {}
})
/////////////////////////////////////////////////////