import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { GET_PLACES } from "../../sharedQueries.queries";
import { getMyPlaces } from "../../types/api";
import PlacesPresenter from "./PlacesPresenter";

const PlacesContainer: React.FC = () => {
  const { data, loading } = useQuery<getMyPlaces>(GET_PLACES);
  return <PlacesPresenter data={data} loading={loading} />;
};

export default PlacesContainer;
