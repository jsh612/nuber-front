import React from "react";
import { IS_LOGGED_IN } from "./AppQueries";

const AppContainer = ({ data }) => <div>{JSON.stringify(data)}</div>;

export default graphql(IS_LOGGED_IN)(AppContainer);
