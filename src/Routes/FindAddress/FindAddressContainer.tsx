import React, { useRef, useState, useEffect } from "react";
import { RouteComponentProps } from "react-router-dom";
import FindAddressPresenter from "./FindAddressPresenter";
import useInput from "../../hooks/useInput";
import { reverseGeoCode, geoCode } from "../../mapHelpers";

interface ICoords {
  lat: number;
  lng: number;
}

interface IProps extends RouteComponentProps {
  google: typeof google;
}

const FindAddressContainer: React.FC<IProps> = ({ google }) => {
  const mapRef = useRef<HTMLElement>();
  const [itMap, setItMap] = useState<google.maps.Map>();
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

  const handleDragEnd = () => {
    if (itMap) {
      const newCenter = itMap.getCenter();
      const lat = newCenter.lat();
      const lng = newCenter.lng();
      setCoords({ lat, lng });
      reverseGeoCodeAddress(lat, lng);
    }
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
      disableDefaultUI: false,
      zoom: 11,
      minZoom: 8
    };
    // maps.Map(엘리먼트, 구글맵 옵션)
    //  - Creates a new map inside of the given HTML container, which is typically a DIV element.
    const map: google.maps.Map = new maps.Map(mapNode!, mapConfig); // 입력한 엘리먼트에 구글 맵 생성
    setItMap(map);
  };

  const onInputBlur = async () => {
    const { value: address } = addressInput;
    if (address) {
      const result = await geoCode(address);
      if (result) {
        const { lat, lng, formatted_address: formatedAddress } = result;
        addressInput.setValue(formatedAddress);
        setCoords({ lat, lng });
        // setCoords로 coords에 새로운 값이 할당 되나, useState는 비동기식으로 re-render 시킨 후 다음 render시
        // 변경된 값이 반영 된다.
        // 하지만 onInputBlur는 re-render시 별도로 다시 실행시켜주지 않으면 발생하지 않으므로 자동으로 위치가 조정 되지않는다.
        itMap!.panTo({ lat, lng });
      }
    }
  };

  const reverseGeoCodeAddress = async (lat: number, lng: number) => {
    const reversedAddress = await reverseGeoCode(lat, lng);
    if (reversedAddress) {
      // console.log("좌표->주소:::::", reversedAddress);
      addressInput.setValue(reversedAddress);
    }
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(hadleGeoSucces, handleGeoError);
  }, []);

  useEffect(() => {
    // loadMap 에서는 아직 itMap이 아직 할당되기전이므로(useState는 비동기적으로 작동, 다음 렌더시 반영되는 느낌)
    // itMap.addListener를 할 수 없다 (undefiend에 이벤트 등록하는 것이랑 동일)
    // 따라서 useEfect를 통해 itMap의 값이 생겼을 때 addListener 등록
    if (itMap) {
      // dragend 이벤트 : 드래그를 끝냈을 때 발생한다.
      const mapEvent = itMap.addListener("dragend", handleDragEnd);
      // useEffect 모든 렌더링 이후 clean-up
      return () => google.maps.event.removeListener(mapEvent);
    }
  }, [itMap]);
  return (
    <FindAddressPresenter
      mapRef={mapRef}
      address={addressInput}
      onInputBlur={onInputBlur}
    />
  );
};

export default FindAddressContainer;
