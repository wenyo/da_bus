import axios from "axios";
import jsSHA from "jssha";

function getAuthorizationHeader() {
  let AppID = "366fbf64aebc45ff8f04c809aac8a4f7";
  let AppKey = "3oobkEhk3fl7O850tWUtCsOKpvI";
  let GMTString = new Date().toGMTString();
  let ShaObj = new jsSHA("SHA-1", "TEXT");
  ShaObj.setHMACKey(AppKey, "TEXT");
  ShaObj.update("x-date: " + GMTString);
  let HMAC = ShaObj.getHMAC("B64");
  let Authorization =
    'hmac username="' +
    AppID +
    '", algorithm="hmac-sha1", headers="x-date", signature="' +
    HMAC +
    '"';
  return { Authorization: Authorization, "X-Date": GMTString };
}

const GeoLocatingRequest = axios.create({
  baseURL: "https://gist.motc.gov.tw/gist_api/V3/Map/GeoLocating/",
  headers: getAuthorizationHeader(),
});

const BusRequest = axios.create({
  baseURL: "https://ptx.transportdata.tw/MOTC/v2/Bus/",
  headers: getAuthorizationHeader(),
});

const GeoLocatingRequestGet = (path) =>
  GeoLocatingRequest.get(path)
    .then((res) => res.data)
    .catch((error) => console.error(error));

const BusRequestGet = (path) =>
  BusRequest.get(path)
    .then((res) => res.data)
    .catch((error) => console.error(error));

export const MyCityFetch = ({ lat, lng }) =>
  GeoLocatingRequestGet(
    `District/LocationX/${lng}/LocationY/${lat}?$format=JSON`
  );

export const NearBusStopFetch = ({ lat, lng }) => {
  const DistanceInMeters = 500;
  return BusRequestGet(
    `Stop/NearBy?$top=30&$spatialFilter=nearby(${lat}, ${lng}, ${DistanceInMeters})&$format=JSON`
  );
};

export const RouteInfoFromStationFetch = ({ city, station_id }) =>
  BusRequestGet(
    `Route/City/${city}/PassThrough/Station/${station_id}?top=30&$format=JSON`
  );

export const EstimatedTimeOfArrivalFromStationFetch = ({ city, station_id }) =>
  BusRequestGet(
    `EstimatedTimeOfArrival/City/${city}/PassThrough/Station/${station_id}?$top=30&$format=JSON`
  );
