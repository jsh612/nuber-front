import React, { useRef, useState, useEffect } from "react";
import { RouteComponentProps } from "react-router-dom";
import FindAddressPresenter from "./FindAddressPresenter";

interface ICoords {
  lat: number;
  lng: number;
}

interface IProps extends RouteComponentProps {
  google: any;
}

const FindAddressContainer: React.FC<IProps> = ({ google }) => {
  const mapRef = useRef();
  const [map, setMap] = useState<google.maps.Map>();
  // const [coords, setCoords] = useState<ICoords>({ lat: 0, lng: 0 });

  const hadleGeoSucces = (position: Position) => {
    const {
      coords: { latitude, longitude }
    } = position;
    console.log(position);
    loadMap(latitude, longitude);
  };

  const handleGeoError = () => {
    console.log("No location");
  };

  const loadMap = (lat, lng) => {
    const maps = google.maps;
    const mapNode = mapRef.current;
    const mapConfig: google.maps.MapOptions = {
      center: {
        lat,
        lng
      },
      disableDefaultUI: true,
      zoom: 11
    };

    // maps.Map(엘리먼트, 구글맵 옵션)
    setMap(new maps.Map(mapNode, mapConfig));
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(hadleGeoSucces, handleGeoError);
  }, []);
  return <FindAddressPresenter mapRef={mapRef} />;
};

export default FindAddressContainer;
