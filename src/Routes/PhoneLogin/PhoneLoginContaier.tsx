import React from "react";
import PhoneLoginPresenter from "./PhoneLoginPresenter";
import { RouteComponentProps } from "react-router-dom";
import useInput from "../../hooks/useInput";

const PhoneLoginContainer: React.FC<RouteComponentProps> = () => {
  const phoneNumberInput = useInput("");
  const countryCodeInput = useInput("+82");

  const onSubmit: React.FormEventHandler = e => {
    e.preventDefault();
    console.log(
      "폰번호:",
      phoneNumberInput.value,
      "국가:",
      countryCodeInput.value
    );
  };

  return (
    <PhoneLoginPresenter
      countryCode={countryCodeInput.value}
      phoneNumber={phoneNumberInput.value}
      onInputChange={phoneNumberInput.onChange}
      onSelectChange={countryCodeInput.onChange}
      onSubmit={onSubmit}
    />
  );
};

export default PhoneLoginContainer;
