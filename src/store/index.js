import { createStore } from "vuex";
import {
  MyCityFetch,
  NearBusStopFetch,
  RouteInfoFromStationFetch,
  EstimatedTimeOfArrivalFromStationFetch,
} from "../api";

function routeInfoByStopForm(route_from_station, result = {}) {
  let vResult = JSON.parse(JSON.stringify(result));
  for (const route_info of route_from_station) {
    const { DepartureStopNameZh, DestinationStopNameZh, RouteName, RouteUID } =
      route_info;
    vResult[RouteUID] = {
      ...vResult[RouteUID],
      RouteUID,
      DepartureStopNameZh,
      DestinationStopNameZh,
      RouteName: RouteName.Zh_tw,
    };
  }
  return vResult;
}
function routeEstimateByStopForm(route_estimate_from_station, result = {}) {
  let vResult = JSON.parse(JSON.stringify(result));

  for (const route_info of route_estimate_from_station) {
    const { Estimates, EstimateTime, PlateNumb, RouteUID, Direction } =
      route_info;
    vResult[RouteUID] = {
      ...vResult[RouteUID],
      Estimates,
      EstimateTime: !EstimateTime ? -1 : parseInt(EstimateTime),
      PlateNumb,
      RouteUID,
      Direction,
    };
  }
  return vResult;
}

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
      state.myCity = city_info[0].City;
    },
    busStopIDGetter(state, StationID) {
      state.busStopID = StationID;
    },
    busStopsGetter(state, bus_stops_fetch) {
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
    routeInfoByStopGetter(state, vResult) {
      state.routeInfoByStop = vResult;
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
    async RouteFromStationGetter({ state, commit }, station_id) {
      let vResult = {};
      await RouteInfoFromStationFetch({ city: state.myCity, station_id }).then(
        (route_from_station) =>
          (vResult = routeInfoByStopForm(route_from_station, vResult))
      );

      await EstimatedTimeOfArrivalFromStationFetch({
        city: state.myCity,
        station_id,
      }).then(
        (route_estimate_from_station) =>
          (vResult = routeEstimateByStopForm(
            route_estimate_from_station,
            vResult
          ))
      );
      commit("routeInfoByStopGetter", vResult);
    },
  },
  modules: {},
});
