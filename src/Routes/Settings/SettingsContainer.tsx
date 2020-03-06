import React from "react";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { LOG_USER_OUT } from "../../sharedQueries.local";
import { USER_PROFILE, GET_PLACES } from "../../sharedQueries.queries";
import { userProfile, getMyPlaces } from "../../types/api";
import SettingsPresenter from "./SettingsPresenter";

const SettingsContainer: React.FC = () => {
  const [logOutMutation] = useMutation(LOG_USER_OUT);
  const { data, loading: userDataLoading } = useQuery<userProfile>(
    USER_PROFILE
  );
  const { data: placesData, loading: placesLoading } = useQuery<getMyPlaces>(
    GET_PLACES
  );
  return (
    <SettingsPresenter
      logUserOut={logOutMutation}
      userData={data}
      userDataLoading={userDataLoading}
      placesData={placesData}
      placesLoading={placesLoading}
    />
  );
};

export default SettingsContainer;
