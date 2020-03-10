import React, { useState, useEffect, useRef } from "react";
import { RouteComponentProps } from "react-router-dom";
import HomePresenter from "./HomePresenter";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { USER_PROFILE } from "../../sharedQueries.queries";
import {
  userProfile,
  reportMovement,
  reportMovementVariables,
  getNearbyDrivers,
  requestRide,
  requestRideVariables,
  updateRideStatus,
  updateRideStatusVariables,
  getRides,
  nearbyRides
} from "../../types/api";
import useInput from "../../hooks/useInput";
import { geoCode, reverseGeoCode } from "../../mapHelpers";
import { toast } from "react-toastify";
import {
  REPORT_LOCATION,
  GET_NEARBY_DRIVERS,
  REQUEST_RIDE,
  UPDATE_RIDE_STATUS,
  GET_NEARBY_RIDE,
  SUBSCRIBE_NEARBY_RIDES
} from "./Home.queries";
import { SubscribeToMoreOptions } from "apollo-boost";

interface IProps extends RouteComponentProps {
  google: typeof google;
}
interface ICoords {
  lat: number;
  lng: number;
}

const HomeContainer: React.FC<IProps> = ({ history }) => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const mapRef = useRef<HTMLDivElement>(null);
  const [itMap, setItMap] = useState<google.maps.Map>();

  // 현재 위치 관련
  const [coords, setCoords] = useState<ICoords>({ lat: 0, lng: 0 });
  const [userMarker, setUserMarker] = useState<google.maps.Marker>();
  const [fromAddress, setFromAddress] = useState<string>("");

  // 목적지 관련
  const [toCoords, setToCoords] = useState<ICoords>({ lat: 0, lng: 0 });
  const toAddressInput = useInput("");
  const [toMarker, setToMarker] = useState<google.maps.Marker>();

  // 기타 정보
  const [distance, setDistance] = useState<string>("");
  const [duration, setDuration] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [directions, setDirections] = useState<
    google.maps.DirectionsRenderer
  >();
  const [isDrivingBool, setIsDriving] = useState<boolean>();

  // 운전자 마커 목록
  const driverMarkersList: google.maps.Marker[] = [];

  // report Movement
  const [reportMoveMutation] = useMutation<
    reportMovement,
    reportMovementVariables
  >(REPORT_LOCATION, {
    onCompleted: data => console.log("뮤테이션결과", data)
  });

  // query user profile
  const handleProfileQuery = (data: userProfile) => {
    const { GetMyProfile } = data;
    if (GetMyProfile.user) {
      const {
        user: { isDriving }
      } = GetMyProfile;
      setIsDriving(isDriving);
    }
  };
  const { data, loading } = useQuery<userProfile>(USER_PROFILE, {
    onCompleted: handleProfileQuery
  });

  // query nearby drivers
  const handleNearbyDrivers = (data: getNearbyDrivers) => {
    // 드라이버들의 정보를 받아 마커 표시
    if (data.GetNearbyDrivers) {
      const {
        GetNearbyDrivers: { drivers, ok }
      } = data;
      if (ok && drivers) {
        for (const driver of drivers) {
          if (driver && driver.lastLat && driver.lastLng) {
            // 해당 드라이버 마커 목록에 서버에서 받아온 driver가 있는지 확인
            // (같은 드라이버가 여러개 마커로 표시 되는 것을 방지)
            const exisitingDriver:
              | google.maps.Marker
              | undefined = driverMarkersList.find(
              (driverMarker: google.maps.Marker) => {
                return driverMarker.get("ID") === driver.id;
              }
            );
            if (exisitingDriver) {
              // 이미 드라이버마커 목로겡 있는 드라이버의 경우 위치값만 변경
              exisitingDriver.setPosition({
                lat: driver.lastLat,
                lng: driver.lastLng
              });
              exisitingDriver.setMap(itMap ? itMap : null);
            } else {
              const markerOptions: google.maps.MarkerOptions = {
                icon: {
                  path: google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
                  scale: 5
                },
                position: {
                  lat: driver.lastLat,
                  lng: driver.lastLng
                }
              };
              const newMarker: google.maps.Marker = new google.maps.Marker(
                markerOptions
              );
              driverMarkersList.push(newMarker);
              // console.log("driverMarkersList", driverMarkersList);
              newMarker.set("ID", driver.id);
              newMarker.set("NAME", driver.fullName);
              newMarker.setMap(itMap ? itMap : null);
            }
          }
        }
      }
    }
  };
  useQuery<getNearbyDrivers>(GET_NEARBY_DRIVERS, {
    // pollInterval: 1000,
    // 로그인된 유저가 운전중일 경우에는 스킵(즉, 가까운거리의 운전자 표시 안함.)
    skip: isDrivingBool,
    onCompleted: handleNearbyDrivers,
    fetchPolicy: "cache-and-network"
  });

  // query nearby rides
  const { data: nearbyRide, subscribeToMore } = useQuery<getRides>(
    GET_NEARBY_RIDE,
    {
      skip: !isDrivingBool
    }
  );
  const rideSubscriptionOptions: SubscribeToMoreOptions<
    getRides,
    any,
    nearbyRides
  > = {
    document: SUBSCRIBE_NEARBY_RIDES,
    updateQuery: (preQueryData, { subscriptionData }) => {
      if (!subscriptionData.data) {
        return preQueryData;
      }
      // getRides쿼리 데이터를 연결된 subscribe를 통해 받아온 데이터로 업데이트
      // (기존 쿼리 데이터와 합쳐지는 subscribe의 데이터는 쿼리 데이터의 구조와 같아야 한다.)
      // (ex/ ride: XX)
      const newObject = Object.assign({}, preQueryData, {
        GetNearbyRide: {
          ...preQueryData.GetNearbyRide, // 기존 쿼리 데이터
          ride: subscriptionData.data.NearbyRideSubscription // subscribe로 받아온 새로운 데이터
        }
      });
      return newObject;
    }
  };

  // requestRide mutation
  const handleRideRequest = (data: requestRide) => {
    const { RequestRide } = data;
    if (RequestRide.ok) {
      toast.success("Drive requested, finding a driver");
      history.push(`/ride/${RequestRide.ride?.id}`);
    } else {
      toast.error(RequestRide.error);
    }
  };
  const [requestRideMutation] = useMutation<requestRide, requestRideVariables>(
    REQUEST_RIDE,
    {
      variables: {
        distance: distance,
        dropOffAddress: toAddressInput.value ? toAddressInput.value : "",
        dropOffLat: toCoords.lat,
        dropOffLng: toCoords.lng,
        duration: duration,
        pickUpAddress: fromAddress,
        pickUpLat: coords.lat,
        pickUpLng: coords.lng,
        price: price
      },
      onCompleted: handleRideRequest
    }
  );

  // updateRideStatus mutation
  const handleRideAcceptance = (data: updateRideStatus) => {
    const { UpdateRideStatus } = data;
    if (UpdateRideStatus.ok) {
      history.push(`/ride/${UpdateRideStatus.rideId}`);
    }
  };
  const [updateRideStatusMutation] = useMutation<
    updateRideStatus,
    updateRideStatusVariables
  >(UPDATE_RIDE_STATUS, {
    onCompleted: handleRideAcceptance
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
    getFromAdress(latitude, longitude);
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

    await reportMoveMutation({
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
      const price = Number(Number(parseFloat(distance) * 3).toFixed(2));
      setPrice(price);
    }
  };

  const getFromAdress = async (lat: number, lng: number) => {
    const address = await reverseGeoCode(lat, lng);
    if (address) {
      setFromAddress(address);
    }
  };

  const unuseSubscribefn = isDrivingBool
    ? subscribeToMore(rideSubscriptionOptions)
    : () => null;

  useEffect(() => {
    // 컴포넌트 렌더시 지도를 보여주기 위함
    navigator.geolocation.getCurrentPosition(
      handleGeoCurrentSucces,
      handleGeoCurrentError
    );
    console.log("지우기함수", unuseSubscribefn);
    return unuseSubscribefn;
  }, []);

  // useEffect(() => {
  //   // componentDidMount 될때 subscription 지워주기
  //   if (isDrivingBool) {
  //     const unuseSubscribefn = subscribeToMore(rideSubscriptionOptions);
  //     return () => unuseSubscribefn();
  //   }
  // }, [isDrivingBool]);

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
      data={data}
      requestRideFn={requestRideMutation}
      nearbyRide={nearbyRide}
      acceptRideFn={updateRideStatusMutation}
    />
  );
};

export default HomeContainer;
