import React from "react";
import { RouteComponentProps } from "react-router-dom";
import VerifyPhonePresenter from "./VerifyPhonePresenter";
import routes from "../routes";
import useInput from "../../hooks/useInput";

interface IProps extends RouteComponentProps<any> {}

const VerifyPhoneContainer: React.FC<IProps> = ({ history, location }) => {
  const keyInput = useInput("");
  if (!location.state) {
    history.push(routes.HOME);
  }
  return (
    <VerifyPhonePresenter onChange={keyInput.onChange} value={keyInput.value} />
  );
};

export default VerifyPhoneContainer;
