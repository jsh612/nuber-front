import React from "react";
import { RouteComponentProps } from "react-router-dom";
import VerifyPhonePresenter from "./VerifyPhonePresenter";
import routes from "../routes";
import useInput from "../../hooks/useInput";
import { useMutation } from "@apollo/react-hooks";
import { VERIFY_PHONE } from "./VerifyPhone.queries";
import { verifyPhone, verifyPhoneVariables } from "../../types/api";
import { toast } from "react-toastify";

// location.state의 값을 가져오기위해  RouteComponentProps 의 제너릭 자리 중
// 세번쨰가 location 관련이므로, any값을 넣어 준다
interface IProps extends RouteComponentProps<any, any, any> {}

const VerifyPhoneContainer: React.FC<IProps> = ({ history, location }) => {
  const keyInput = useInput("");

  const {
    state: { phone }
  } = location;
  if (!phone) {
    history.push(routes.HOME);
  }

  const [verifyPhoneMutation, { loading }] = useMutation<
    verifyPhone,
    verifyPhoneVariables
  >(VERIFY_PHONE, {
    variables: {
      key: keyInput.value,
      phoneNumber: phone
    },
    onCompleted: data => {
      const { CompletePhoneVerification } = data;
      if (CompletePhoneVerification.ok) {
        toast.success("You're verified, loggin in now");
      } else {
        toast.error(CompletePhoneVerification.error);
      }
    }
  });

  return (
    <VerifyPhonePresenter
      onChange={keyInput.onChange}
      value={keyInput.value}
      onSubmit={verifyPhoneMutation}
      loading={loading}
    />
  );
};

export default VerifyPhoneContainer;
