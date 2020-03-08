import { toast } from "react-toastify";
// 여기서 할 일
// 1. geocode
//  - 고유명칭을 가지고 위도와 경도의 좌표값를 얻는 것
//  - 여기서는 주소를 받아 좌표를 얻어 낼 것 이다.

// 2. reverseGeoCode
//  - 좌표를 받아 주소로 출력

import axios from "axios";
import MAPS_KEY from "./googleApi";

export const geoCode = async (address: string) => {
  const URL = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${MAPS_KEY}`;
  const { data } = await axios(URL);
  if (!data.error_message) {
    const { results } = data;
    console.log("geoCode 결과::", results);
    const firstPlace = results[0];
    if (!firstPlace) {
      return false;
    }
    const {
      formatted_address,
      geometry: {
        location: { lat, lng }
      }
    } = firstPlace;
    return { formatted_address, lat, lng };
  } else {
    toast.error(data.error_message);
    return false;
  }
};

export const reverseGeoCode = async (lat: number, lng: number) => {
  const URL = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${MAPS_KEY}`;
  const { data } = await axios(URL);
  if (!data.error_message) {
    const { results } = data;
    // console.log("결과", results); // 주소 배열 출력 (첫번째가 완전한 주소)
    const firstPlace = results[0];
    if (!firstPlace) {
      return false;
    }
    const address = firstPlace.formatted_address;
    // console.log("address:", address);
    return address;
  } else {
    toast.error(data.error_message);
    return false;
  }
};
