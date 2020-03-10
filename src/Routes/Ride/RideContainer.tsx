import React from "react";
import RidePresnter from "./RidePresenter";
import { RouteComponentProps, useParams } from "react-router-dom";

const RideContainer: React.FC<RouteComponentProps> = () => {
  const { rideId } = useParams();
  console.log(rideId);
  return <RidePresnter />;
};

export default RideContainer;
