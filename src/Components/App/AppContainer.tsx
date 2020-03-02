import React from "react";
import { IS_LOGGED_IN } from "./AppQueries";
import { useQuery } from "@apollo/react-hooks";

const AppContainer = () => {
  const { data } = useQuery(IS_LOGGED_IN);
  console.log(data.auth.isLoggedIn);
  return <div>{`${data.auth.isLoggedIn}`}</div>;
};

export default AppContainer;
