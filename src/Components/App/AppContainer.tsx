import React from "react";
import { IS_LOGGED_IN } from "./AppQueries";
import { useQuery } from "@apollo/react-hooks";
import AppPresenter from "./AppPresenter";

const AppContainer = () => {
  const { data } = useQuery(IS_LOGGED_IN);

  return <AppPresenter isLoggedIn={data.auth.isLoggedIn} />;
};

export default AppContainer;
