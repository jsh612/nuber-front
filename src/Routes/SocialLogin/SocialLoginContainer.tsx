import React from "react";
import SocialLoginPresenter from "./SocialLoginPresenter";
import { useMutation } from "@apollo/react-hooks";
import { FACEBOOK_CONNECT } from "./SocialLogin.queries";
import { toast } from "react-toastify";

import { facebookConnect, facebookConnectVariables } from "../../types/api";
import { LOG_USER_IN } from "../../sharedQueries";

const SocialLoginContainer: React.FC = () => {
  const [userLogInMutation] = useMutation(LOG_USER_IN);
  const [socialLoginMutation] = useMutation<
    facebookConnect,
    facebookConnectVariables
  >(FACEBOOK_CONNECT, {
    onCompleted: async data => {
      const { FacebookConnect } = data;
      if (FacebookConnect.ok) {
        try {
          await userLogInMutation({
            variables: {
              token: FacebookConnect.token
            }
          });
          console.log("로그인 뮤테이션 완료");
        } catch (error) {
          console.log("Verify container / 내부 로그인 mutation", error);
        }
      } else {
        toast.error(FacebookConnect.error);
      }
    }
  });

  const loginCallback = async response => {
    const { name, first_name, last_name, email, id, accessToken } = response;
    if (accessToken) {
      toast.success(`Welcome ${name}!`);
      await socialLoginMutation({
        variables: {
          email,
          fbId: id,
          firstName: first_name,
          lastName: last_name
        }
      });
    } else {
      toast.error("Could not log you in 😔");
    }
  };

  return <SocialLoginPresenter loginCallback={loginCallback} />;
};

export default SocialLoginContainer;
