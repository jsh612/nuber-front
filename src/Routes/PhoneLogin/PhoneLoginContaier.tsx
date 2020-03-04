import React from "react";
import PhoneLoginPresenter from "./PhoneLoginPresenter";
import { RouteComponentProps } from "react-router-dom";
import useInput from "../../hooks/useInput";
import { toast } from "react-toastify";
import { useMutation } from "@apollo/react-hooks";
import { PHONE_SIGN_IN } from "./PhoneQueries.queries";
import {
  StartPhoneVerificationVariables,
  StartPhoneVerification
} from "../../types/api";
import routes from "../routes";

const PhoneLoginContainer: React.FC<RouteComponentProps> = ({ history }) => {
  const phoneNumberInput = useInput("");
  const countryCodeInput = useInput("+82");
  const realPhoneNumber = `${
    countryCodeInput.value
  }${phoneNumberInput.value.slice(1)}`;

  const [verifyPhoneMutation, { loading }] = useMutation<
    StartPhoneVerification,
    StartPhoneVerificationVariables
  >(PHONE_SIGN_IN, {
    variables: {
      phoneNumber: realPhoneNumber
    },
    onCompleted: data => {
      const {
        StartPhoneVerification: { ok, error }
      } = data;
      if (ok) {
        // 방법:1
        // history.push({
        //   pathname: routes.VERIFY_PHOEN,
        //   state: {
        //     phone: realPhoneNumber
        //   }
        // });

        // 방법:2
        toast.success("문자가 발송되었습니다. 인증화면 이동합니다.");
        setTimeout(() => {
          // history.push(routes.VERIFY_PHOEN, {
          //   phone: realPhoneNumber
          // });
          history.push({
            pathname: routes.VERIFY_PHOEN,
            state: {
              phone: realPhoneNumber
            }
          });
        }, 2000);
      } else {
        toast.error(error);
      }
    }
  });

  const onSubmit: React.FormEventHandler<HTMLFormElement> = async e => {
    e.preventDefault();
    const isValid = /^\+[1-9]{1}[0-9]{7,11}$/.test(realPhoneNumber);
    if (isValid) {
      return verifyPhoneMutation();
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
      loading={loading}
    />
  );
};

export default PhoneLoginContainer;
