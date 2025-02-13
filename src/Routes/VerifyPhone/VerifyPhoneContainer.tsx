import React from "react";
import { RouteComponentProps } from "react-router-dom";
import VerifyPhonePresenter from "./VerifyPhonePresenter";
import { toast } from "react-toastify";
import { useMutation } from "@apollo/react-hooks";

import routes from "../routes";
import useInput from "../../hooks/useInput";
import { VERIFY_PHONE } from "./VerifyPhone.queries";
import { verifyPhone, verifyPhoneVariables } from "../../types/api";
import { LOG_USER_IN } from "../../sharedQueries.local";

interface IState {
  phone: string;
}
// location.state의 값을 가져오기위해  RouteComponentProps 의 제너릭 자리 중
// 세번쨰가 location의 state와 관련된 타입
interface IProps extends RouteComponentProps<any, any, IState> {}

const VerifyPhoneContainer: React.FC<IProps> = ({ history, location }) => {
  const keyInput = useInput("");

  const {
    state: { phone }
  } = location;
  if (!phone) {
    history.push(routes.HOME);
  }

  const [userLogInMutation] = useMutation(LOG_USER_IN);
  const [verifyPhoneMutation, { loading }] = useMutation<
    verifyPhone,
    verifyPhoneVariables
  >(VERIFY_PHONE, {
    variables: {
      key: keyInput.value !== null ? keyInput.value : "",
      phoneNumber: phone
    },
    onCompleted: async data => {
      const { CompletePhoneVerification } = data;
      if (CompletePhoneVerification.ok) {
        if (CompletePhoneVerification.token) {
          try {
            await userLogInMutation({
              variables: {
                token: CompletePhoneVerification.token
              }
            });
          } catch (error) {
            console.log("Verify container / 내부 로그인 mutation", error);
          }
        }
        toast.success("You're verified, loggin in now");
      } else {
        toast.error(CompletePhoneVerification.error);
      }
    }
  });

  return (
    <VerifyPhonePresenter
      onChange={keyInput.onChange}
      value={keyInput.value !== null ? keyInput.value : ""}
      onSubmit={verifyPhoneMutation}
      loading={loading}
    />
  );
};

export default VerifyPhoneContainer;
