import React, { useState, useEffect, useRef } from "react";
import { RouteComponentProps } from "react-router-dom";
import HomePresenter from "./HomePresenter";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { USER_PROFILE } from "../../sharedQueries.queries";
import {
  userProfile,
  reportMovement,
  reportMovementVariables
} from "../../types/api";
import useInput from "../../hooks/useInput";
import { geoCode } from "../../mapHelpers";
import { toast } from "react-toastify";
import { REPORT_LOCATION } from "./Home.queries";

interface IProps extends RouteComponentProps {
  google: typeof google;
}
interface ICoords {
  lat: number;
  lng: number;
}

const HomeContainer: React.FC<IProps> = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const { loading } = useQuery<userProfile>(USER_PROFILE);

  // 구글 맵에 필요한것들
  const mapRef = useRef<HTMLElement>();
  const [coords, setCoords] = useState<ICoords>({ lat: 0, lng: 0 });
  const [toCoords, setToCoords] = useState<ICoords>({ lat: 0, lng: 0 });
  const toAddressInput = useInput("");
  const [distance, setDistance] = useState<string>("");
  const [duration, setDuration] = useState<string>("");
  const [price, setPrice] = useState<string>("");

  // 구글맵 렌더와 마커 표시 관련
  const [itMap, setItMap] = useState<google.maps.Map>();
  const [userMarker, setUserMarker] = useState<google.maps.Marker>();
  const [toMarker, setToMarker] = useState<google.maps.Marker>();
  const [directions, setDirections] = useState();

  // report Movement
  const [reporMovetMutation] = useMutation<
    reportMovement,
    reportMovementVariables
  >(REPORT_LOCATION, {
    onCompleted: data => console.log("뮤테이션결과", data)
  });

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // 컴포넌트 시작될때 실행
  const handleGeoCurrentSucces: PositionCallback = position => {
    const {
      coords: { latitude, longitude }
    } = position;
    setCoords({ lat: latitude, lng: longitude });
    loadMap(latitude, longitude);
  };

  const handleGeoCurrentError = () => {
    console.log("No location");
  };
  // ======================

  // 맵 로드 이후 실행
  const handleGeoWatchSuccess = async (position: Position) => {
    const {
      coords: { latitude: lat, longitude: lng }
    } = position;
    setCoords({ lat, lng });
    // position의 변경에 따라 마커 위치와 맵의 중앙이 변화한다.
    userMarker?.setPosition({ lat, lng });
    itMap?.panTo({ lat, lng });

    await reporMovetMutation({
      variables: {
        lat: parseFloat(lat.toFixed(10)),
        lng: parseFloat(lng.toFixed(10))
      }
    });
  };
  const handleGeoWatchError = () => {
    console.log("Error watching you");
  };
  // ========================

  const loadMap = (lat: number, lng: number) => {
    // 구글맵을 로드 함수
    const maps = google.maps;
    const mapNode = mapRef.current; // 어떤 엘리먼트가 구글맵을 갖게 될지, 해당 엘리먼트 결정

    // 1. 구글 맵 전체 생성
    const mapConfig: google.maps.MapOptions = {
      // 구글맵 옵션 설정
      center: {
        lat,
        lng
      },
      disableDefaultUI: false,
      zoom: 13
    };
    // maps.Map(엘리먼트, 구글맵 옵션)
    //  - Creates a new map inside of the given HTML container, which is typically a DIV element.
    const map: google.maps.Map = new maps.Map(mapNode!, mapConfig); // 입력한 엘리먼트에 구글 맵 생성
    setItMap(map);

    // 2. 구글 맵의 마커 생성
    const userMarkerOptions: google.maps.MarkerOptions = {
      // 구글 마커 옵션 설정
      icon: {
        path: maps.SymbolPath.CIRCLE,
        scale: 7
      },
      position: {
        lat,
        lng
      }
    };
    const marker = new maps.Marker(userMarkerOptions);

    marker.setMap(map); //setMap: 마커를 맵위에 표시함
    setUserMarker(marker);
  };

  const onAddressSubmit = async () => {
    // 주소입력란에서 입력받은 주소를 이용하여 새로운 마커를 표시한다.
    const maps = google.maps;
    const result = await geoCode(
      toAddressInput.value ? toAddressInput.value : ""
    );
    if (result) {
      const { lat, lng, formatted_address: formatedAddress } = result;
      if (toMarker) {
        // 기존에 체크한 목적지 마커가 있다면 없애기
        toMarker.setMap(null);
      }
      const toMarkerOptions: google.maps.MarkerOptions = {
        // icon 설정 안할시 기본 아이콘으로 표시
        position: {
          lat,
          lng
        }
      };
      const toNewMarker = new maps.Marker(toMarkerOptions);
      setToMarker(toNewMarker);
      const bounds = new google.maps.LatLngBounds(); // bounds(구역) 생성
      bounds.extend({ lat, lng });
      bounds.extend({ ...coords });

      if (itMap) {
        toNewMarker.setMap(itMap);
        itMap.fitBounds(bounds); // 작성한 bounds(구역)에 맞춰 viewport 조정
      }
      toAddressInput.setValue(formatedAddress);
      setToCoords({ lat, lng });
      createPath(lat, lng);
    }
  };

  const handleRouteRequest = (directions: google.maps.DirectionsRenderer) => {
    return (
      result: google.maps.DirectionsResult,
      status: google.maps.DirectionsStatus
    ) => {
      if (status === "OK") {
        const { routes } = result;
        const {
          distance: { text: distance },
          duration: { text: duration }
        } = routes[0].legs[0];
        setDistance(distance);
        setDuration(duration);
        directions.setDirections(result); // 경로렌더에 찾은 경로를 세팅
        if (itMap) {
          directions.setMap(itMap); // 찾은 경로 지도에 표시
        }
      } else {
        toast.error("There is no route there, you have to ");
      }
    };
  };

  const createPath = (toLat: number, toLng: number) => {
    const { lat, lng } = coords;
    if (directions) {
      directions.setMap(null);
    }
    const renderOptions: google.maps.DirectionsRendererOptions = {
      polylineOptions: {
        strokeColor: "#000"
      },
      suppressMarkers: true
    };

    // 1.google.maps.DirectionsRenderer --> 찾은 경로를 맵에 render
    const newDirecions = new google.maps.DirectionsRenderer(renderOptions);
    setDirections(newDirecions);

    // 2. 경로 찾기
    const directionsService = new google.maps.DirectionsService();
    const to = new google.maps.LatLng(toLat, toLng);
    const from = new google.maps.LatLng(lat, lng);
    const directionsOptions: google.maps.DirectionsRequest = {
      destination: to,
      origin: from,
      travelMode: google.maps.TravelMode.DRIVING // 한국에서는 DRIVING 안됨
    };
    directionsService.route(
      directionsOptions,
      handleRouteRequest(newDirecions)
    );
  };

  const priceMaker = () => {
    if (distance) {
      const price = Number(parseFloat(distance.replace(",", "")) * 3).toFixed(
        2
      );
      setPrice(price);
    }
  };

  useEffect(() => {
    // 컴포넌트 렌더시 지도를 보여주기 위함
    navigator.geolocation.getCurrentPosition(
      handleGeoCurrentSucces,
      handleGeoCurrentError
    );
  }, []);

  useEffect(() => {
    // 유저 디비아시의 위치값 추적 시키기
    const watchOptions: PositionOptions = {
      enableHighAccuracy: true
    };
    navigator.geolocation.watchPosition(
      handleGeoWatchSuccess,
      handleGeoWatchError,
      watchOptions
    );
  }, [itMap, userMarker]);

  useEffect(() => {
    priceMaker();
  }, [distance]);

  return (
    <HomePresenter
      isMenuOpen={isMenuOpen}
      toggleMenu={toggleMenu}
      loading={loading}
      mapRef={mapRef}
      toAddress={toAddressInput}
      onAddressSubmit={onAddressSubmit}
      price={price}
    />
  );
};

export default HomeContainer;
