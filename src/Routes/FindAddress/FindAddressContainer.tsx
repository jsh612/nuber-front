import React, { useRef, useState, useEffect } from "react";
import { RouteComponentProps } from "react-router-dom";
import FindAddressPresenter from "./FindAddressPresenter";
import useInput from "../../hooks/useInput";
import { reverseGeoCode } from "../../mapHelpers";

interface ICoords {
  lat: number;
  lng: number;
}

interface IProps extends RouteComponentProps {
  google: typeof google;
}

const FindAddressContainer: React.FC<IProps> = ({ google }) => {
  const mapRef = useRef<HTMLElement>();
  let map: google.maps.Map;
  const [coords, setCoords] = useState<ICoords>({ lat: 0, lng: 0 });
  const addressInput = useInput("");

  const hadleGeoSucces = (position: Position) => {
    const {
      coords: { latitude, longitude }
    } = position;
    loadMap(latitude, longitude);
  };

  const handleGeoError = () => {
    console.log("No location");
  };

  const handleDragEnd = async () => {
    const newCenter = map.getCenter();
    const lat = newCenter.lat();
    const lng = newCenter.lng();
    const reversedAddress = await reverseGeoCode(lat, lng);
    console.log("좌표->주소:::::", reversedAddress);
    setCoords({ lat, lng });
    addressInput.setValue(reversedAddress);
  };

  const loadMap = (lat: number, lng: number) => {
    // 구글맵을 로드 함수
    const maps = google.maps;
    const mapNode = mapRef.current; // 어떤 엘리먼트가 구글맵을 갖게 될지, 해당 엘리먼트 결정
    const mapConfig: google.maps.MapOptions = {
      // 구글맵 옵션 설정
      center: {
        lat,
        lng
      },
      disableDefaultUI: true,
      zoom: 11
    };
    // maps.Map(엘리먼트, 구글맵 옵션)
    //  - Creates a new map inside of the given HTML container, which is typically a DIV element.
    map = new maps.Map(mapNode!, mapConfig); // 입력한 엘리먼트에 구글 맵 생성
    // dragend 이벤트 : 드래그를 끝냈을 때 발생한다.
    map.addListener("dragend", handleDragEnd);
  };

  const onInputBlur = () => {
    console.log("주소 갱신");
  };
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(hadleGeoSucces, handleGeoError);
  }, []);
  return (
    <FindAddressPresenter
      mapRef={mapRef}
      address={addressInput}
      onInputBlur={onInputBlur}
    />
  );
};

export default FindAddressContainer;
