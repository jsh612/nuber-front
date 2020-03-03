import React from "react";
import PhoneLoginPresenter from "./PhoneLoginPresenter";
import { RouteComponentProps } from "react-router-dom";
import useInput from "../../hooks/useInput";
import { toast } from "react-toastify";

const PhoneLoginContainer: React.FC<RouteComponentProps> = () => {
  const phoneNumberInput = useInput("");
  const countryCodeInput = useInput("+82");

  const onSubmit: React.FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault();
    console.log(`${countryCodeInput.value}${phoneNumberInput.value}`);
    const isValid = /^\+[1-9]{1}[0-9]{7,11}$/.test(
      `${countryCodeInput.value}${phoneNumberInput.value}`
    );
    if (isValid) {
      return;
    } else {
      toast.error("올바른 휴대전화 번호를 입력해주세요");
    }
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
