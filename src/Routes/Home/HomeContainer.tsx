import React, { useState, useEffect, useRef } from "react";
import { RouteComponentProps } from "react-router-dom";
import HomePresenter from "./HomePresenter";
import { useQuery } from "@apollo/react-hooks";
import { USER_PROFILE } from "../../sharedQueries.queries";
import { userProfile } from "../../types/api";

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
  const mapRef = useRef<HTMLElement>();
  const [coords, setCoords] = useState<ICoords>({ lat: 0, lng: 0 });
  const [itMap, setItMap] = useState<google.maps.Map>();
  const [userMarker, setUserMarker] = useState<google.maps.Marker>();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // 컴포넌트 시작될때 실행
  const handleGeoSucces: PositionCallback = position => {
    const {
      coords: { latitude, longitude }
    } = position;
    loadMap(latitude, longitude);
  };

  const handleGeoError = () => {
    console.log("No location");
  };
  // ======================

  // 맵 로드 이후 실행
  const handleGeoWatchSuccess = (position: Position) => {
    console.log("WatchSuccess", position);
    return;
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
      zoom: 11,
      minZoom: 8
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

    // 3.navigator 관련
    const watchOptions: PositionOptions = {
      enableHighAccuracy: true
    };
    navigator.geolocation.watchPosition(
      handleGeoWatchSuccess,
      handleGeoWatchError,
      watchOptions
    );
  };

  useEffect(() => {
    // 컴포넌트 렌더시 지도를 보여주기 위함
    navigator.geolocation.watchPosition(handleGeoSucces, handleGeoError);
  }, []);
  return (
    <HomePresenter
      isMenuOpen={isMenuOpen}
      toggleMenu={toggleMenu}
      loading={loading}
      mapRef={mapRef}
    />
  );
};

export default HomeContainer;
