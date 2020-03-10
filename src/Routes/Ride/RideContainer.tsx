import React, { useEffect } from "react";
import RidePresnter from "./RidePresenter";
import { RouteComponentProps, useParams } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/react-hooks";
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
  updateRideVariables
} from "../../types/api";
import { USER_PROFILE } from "../../sharedQueries.queries";
import { SubscribeToMoreOptions } from "apollo-boost";

const RideContainer: React.FC<RouteComponentProps> = () => {
  const { rideId } = useParams();

  // user profile query
  const { data: userData } = useQuery<userProfile>(USER_PROFILE);

  // get ride query
  const { data, loading, subscribeToMore } = useQuery<
    getRide,
    getRideVariables
  >(GET_RIDE, {
    variables: {
      rideId: Number(rideId)
    }
  });

  const subscribeOptions: SubscribeToMoreOptions = {
    document: RIDE_SUBSCRIPTION,
    updateQuery: (prev, { subscriptionData }) => {
      if (!subscriptionData.data) {
        return prev;
      }
      console.log(prev, subscriptionData);
    }
  };

  // update ride status mutation
  const [updataRideStatusMutation] = useMutation<
    updateRideStatus,
    updateRideVariables
  >(UPDATE_RIDE_STATUS);

  useEffect(() => {
    const unuseFn = subscribeToMore(subscribeOptions);
    return unuseFn;
  }, []);
  return (
    <RidePresnter
      data={data}
      userData={userData}
      loading={loading}
      updateRideFn={updataRideStatusMutation}
    />
  );
};

export default RideContainer;
