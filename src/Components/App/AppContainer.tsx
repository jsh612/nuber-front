import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { ThemeProvider } from "styled-components";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

import { IS_LOGGED_IN } from "./AppQueries";
import AppPresenter from "./AppPresenter";
import theme from "../../theme";

const AppContainer = () => {
  const { data } = useQuery(IS_LOGGED_IN);

  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <AppPresenter isLoggedIn={data.auth.isLoggedIn} />
      </ThemeProvider>
      <ToastContainer position={"bottom-center"} />
    </React.Fragment>
  );
};

export default AppContainer;
