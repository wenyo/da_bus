import { createStore } from "vuex";
import { MyCityFetch, NearBusStopFetch } from "../api";

export default createStore({
  state: {
    pos: {
      lat: 0,
      lng: 0,
    },
    myCity: "",
  },
  mutations: {
    posGetter(state, pos) {
      const crd = pos.coords;
      state.pos = {
        lat: crd.latitude,
        lng: crd.longitude,
      };
    },
    myCityGetter(state, city_info) {
      state.myCity = city_info.City;
    },
  },
  actions: {
    MyDistrictGetter({ state, commit }) {
      MyCityFetch(state.pos).then((city_info) =>
        commit.myCityGetter(city_info)
      );
    },
    NearBusStopGetter({ state }) {
      return NearBusStopFetch(state.pos);
    },
  },
  modules: {},
});
