import React from "react";
import { IS_LOGGED_IN } from "./AppQueries";
import { useQuery } from "@apollo/react-hooks";
import AppPresenter from "./AppPresenter";
import { ThemeProvider } from "styled-components";
import theme from "../../theme";

const AppContainer = () => {
  const { data } = useQuery(IS_LOGGED_IN);

  return (
    <ThemeProvider theme={theme}>
      <AppPresenter isLoggedIn={data.auth.isLoggedIn} />
    </ThemeProvider>
  );
};

export default AppContainer;
