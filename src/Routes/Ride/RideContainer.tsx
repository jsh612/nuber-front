import React, { useEffect, useState } from "react";
import RidePresnter from "./RidePresenter";
import { RouteComponentProps, useParams } from "react-router-dom";
import { useQuery, useMutation, useSubscription } from "@apollo/react-hooks";
import {
  GET_RIDE,
  RIDE_SUBSCRIPTION,
  UPDATE_RIDE_STATUS
} from "./Ride.queries";
import {
  getRide,
  getRideVariables,
  userProfile,
  updateRideStatus,
  updateRideVariables,
  rideUpdates
} from "../../types/api";
import { USER_PROFILE } from "../../sharedQueries.queries";
import routes from "../routes";

const RideContainer: React.FC<RouteComponentProps> = ({ history }) => {
  const [isAllData, setIsAllData] = useState<boolean>(false);

  const { rideId } = useParams();
  if (!rideId) {
    history.push(routes.HOME);
  }
  // user profile query
  const { data: userData } = useQuery<userProfile>(USER_PROFILE);

  // get ride query
  const { data, loading, refetch } = useQuery<getRide, getRideVariables>(
    GET_RIDE,
    {
      variables: {
        rideId: Number(rideId)
      },
      onCompleted: data => {
        console.log("bool값", !!data.GetRide.ride?.driver?.id);
        setIsAllData(!!data.GetRide.ride?.driver?.id);
      },
      onError: () => setIsAllData(false),
      fetchPolicy: "cache-and-network"
    }
  );

  const { data: susbscriptionData } = useSubscription<rideUpdates>(
    RIDE_SUBSCRIPTION,
    {
      fetchPolicy: "network-only",
      onSubscriptionData: data => {
        if (
          data.subscriptionData.data?.RideStatusSubscription?.status ===
          "FINISHED"
        ) {
          history.push(routes.HOME);
        }
      }
    }
  );

  // update ride status mutation
  const [updataRideStatusMutation] = useMutation<
    updateRideStatus,
    updateRideVariables
  >(UPDATE_RIDE_STATUS, {
    onError: error => console.log("업뎃에러", error),
    onCompleted: data => console.log("업뎃오키", data)
  });

  useEffect(() => {
    refetch();
    console.log("susbscriptionData", susbscriptionData);
  }, [susbscriptionData]);

  return (
    <>
      {isAllData ? (
        <RidePresnter
          data={data}
          userData={userData}
          loading={loading}
          updateRideFn={updataRideStatusMutation}
        />
      ) : (
        <div>운전자를 기다리는중....</div>
      )}
    </>
  );
};

export default RideContainer;
