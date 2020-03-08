import React, { useState, useEffect, useRef } from "react";
import { RouteComponentProps } from "react-router-dom";
import HomePresenter from "./HomePresenter";
import { useQuery } from "@apollo/react-hooks";
import { USER_PROFILE } from "../../sharedQueries.queries";
import { userProfile } from "../../types/api";
import useInput from "../../hooks/useInput";
import { geoCode } from "../../mapHelpers";

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
  const [toCoords, setToCoords] = useState<ICoords>({ lat: 0, lng: 0 });
  const toAddressInput = useInput("");
  const [itMap, setItMap] = useState<google.maps.Map>();
  const [userMarker, setUserMarker] = useState<google.maps.Marker>();
  const [toMarker, setToMarker] = useState<google.maps.Marker>();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // 컴포넌트 시작될때 실행
  const handleGeoCurrentSucces: PositionCallback = position => {
    const {
      coords: { latitude, longitude }
    } = position;
    loadMap(latitude, longitude);
  };

  const handleGeoCurrentError = () => {
    console.log("No location");
  };
  // ======================

  // 맵 로드 이후 실행
  const handleGeoWatchSuccess = (position: Position) => {
    const {
      coords: { latitude: lat, longitude: lng }
    } = position;
    // position의 변경에 따라 마커 위치와 맵의 중앙이 변화한다.
    userMarker?.setPosition({ lat, lng });
    itMap?.panTo({ lat, lng });
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
      zoom: 13,
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
  };

  useEffect(() => {
    // 컴포넌트 렌더시 지도를 보여주기 위함
    navigator.geolocation.getCurrentPosition(
      handleGeoCurrentSucces,
      handleGeoCurrentError
    );
  }, []);

  const onAddressSubmit = async () => {
    // 주소입력란에서 입력받은 주소를 이용하여 새로운 마커를 표시한다.
    const maps = google.maps;
    const result = await geoCode(
      toAddressInput.value ? toAddressInput.value : ""
    );
    if (result) {
      const { lat, lng, formatted_address: formatedAddress } = result;
      setToCoords({ lat, lng });
      toAddressInput.setValue(formatedAddress);

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
      if (itMap) {
        toNewMarker.setMap(itMap);
      }
    }
  };

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
  return (
    <HomePresenter
      isMenuOpen={isMenuOpen}
      toggleMenu={toggleMenu}
      loading={loading}
      mapRef={mapRef}
      toAddress={toAddressInput}
      onAddressSubmit={onAddressSubmit}
    />
  );
};

export default HomeContainer;
