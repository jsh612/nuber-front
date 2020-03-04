import React from "react";
import { RouteComponentProps } from "react-router-dom";
import VerifyPhonePresenter from "./VerifyPhonePresenter";
import routes from "../routes";

interface IProps extends RouteComponentProps<any> {}

const VerifyPhoneContainer: React.FC<IProps> = ({ history, location }) => {
  if (!location.state) {
    history.push(routes.HOME);
  }
  console.log("location.state:::", location.state);
  return <VerifyPhonePresenter />;
};

export default VerifyPhoneContainer;
