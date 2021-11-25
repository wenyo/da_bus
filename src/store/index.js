import { createStore } from "vuex";
import {
  MyCityFetch,
  NearBusStopFetch,
  RouteInfoFromStationFetch,
  EstimatedTimeOfArrivalFromStationFetch,
} from "../api";

export default createStore({
  state: {
    pos: {
      lat: 0,
      lng: 0,
    },
    myCity: "",
    busStopID: "",
    busStops: [],
    routeInfoByStop: {},
    busInfo: {},
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
      console.log(city_info[0].City);
      state.myCity = city_info[0].City;
    },
    busStopIDGetter(state, StationID) {
      state.busStopID = StationID;
    },
    busStopsGetter(state, bus_stops_fetch) {
      console.log(bus_stops_fetch);
      state.busStops = bus_stops_fetch.map((bus_info) => {
        const {
          StopName,
          StopPosition,
          StopID,
          StopUID,
          StationGroupID,
          StationID,
        } = bus_info;
        return {
          StopName,
          StopPosition: {
            lat: StopPosition.PositionLat,
            lng: StopPosition.PositionLon,
          },
          StopID,
          StopUID,
          StationID,
          StationGroupID,
        };
      });
    },
    routeInfoByStopGetter(state, route_from_station) {
      let vResult = {};
      for (const route_info of route_from_station) {
        const {
          DepartureStopNameZh,
          DestinationStopNameZh,
          RouteName,
          RouteUID,
        } = route_info;
        vResult[RouteUID] = {
          RouteUID,
          DepartureStopNameZh,
          DestinationStopNameZh,
          RouteName: RouteName.Zh_tw,
        };
      }
      state.routeInfoByStop = vResult;
    },
    routeEstimateByStop(state, route_estimate_from_station) {
      let vResult = {};

      for (const route_info of route_estimate_from_station) {
        const { Estimates, EstimateTime, PlateNumb, RouteUID, Direction } =
          route_info;
        vResult[RouteUID] = {
          Estimates,
          EstimateTime,
          PlateNumb,
          RouteUID,
          Direction,
        };
      }

      state.busInfo = vResult;
    },
  },
  actions: {
    MyDistrictGetter({ state, commit }) {
      MyCityFetch(state.pos).then((city_info) =>
        commit("myCityGetter", city_info)
      );
    },
    NearBusStopGetter({ state, commit }) {
      NearBusStopFetch(state.pos).then((bus_stops_fetch) =>
        commit("busStopsGetter", bus_stops_fetch)
      );
    },
    RouteFromStationGetter({ state, commit }, station_id) {
      RouteInfoFromStationFetch({ city: state.myCity, station_id }).then(
        (route_from_station) =>
          commit("routeInfoByStopGetter", route_from_station)
      );
    },
    EstimatedTimeOfArrivalFromStationGetter({ state, commit }, station_id) {
      EstimatedTimeOfArrivalFromStationFetch({
        city: state.myCity,
        station_id,
      }).then((route_estimate_from_station) =>
        commit("routeEstimateByStop", route_estimate_from_station)
      );
    },
  },
  modules: {},
});
