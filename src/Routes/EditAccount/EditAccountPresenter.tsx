import React from "react";
import styled from "styled-components";
import Helmet from "react-helmet";

import { updateProfile, updateProfileVariables } from "../../types/api";
import { MutationTuple } from "@apollo/react-hooks";
import Form from "../../Components/Form";
import Input from "../../Components/Input";
import Button from "../../Components/Button";
import Header from "../../Components/Header";

const Container = styled.div``;

const ExtendedForm = styled(Form)`
  padding: 0px 40px;
`;

const ExtendedInput = styled(Input)`
  margin-bottom: 30px;
`;

interface IData {
  value: string | null;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

interface IProps {
  firstName: IData;
  lastName: IData;
  email: IData;
  profilePhoto: IData;
  loading: boolean;
  onSubmit: MutationTuple<updateProfile, updateProfileVariables>[0];
}

const EditAccountPresenter: React.FC<IProps> = ({
  firstName,
  lastName,
  email,
  onSubmit,
  profilePhoto,
  loading
}) => {
  const onSubmitFn = () => {
    return onSubmit({
      variables: {
        email: email.value,
        firstName: firstName.value,
        lastName: lastName.value,
        profilePhoto: profilePhoto.value
      }
    });
  };

  return (
    <Container>
      <Helmet>
        <title>Edit Account | Number</title>
      </Helmet>
      <Header title={"Edit Account"} backTo={"/"} />
      <ExtendedForm submitFn={onSubmitFn}>
        <ExtendedInput
          onChange={firstName.onChange}
          type={"text"}
          value={firstName.value !== null ? firstName.value : ""}
          placeholder={"First name"}
          name={"firstName"}
        />
        <ExtendedInput
          onChange={lastName.onChange}
          type={"text"}
          value={lastName.value !== null ? lastName.value : ""}
          placeholder={"Last name"}
          name={"lastName"}
        />
        <ExtendedInput
          onChange={email.onChange}
          type={"email"}
          value={email.value !== null ? email.value : ""}
          placeholder={"Email"}
          name={"email"}
        />
        <Button onClick={null} value={loading ? "Loading" : "Update"} />
      </ExtendedForm>
    </Container>
  );
};

export default EditAccountPresenter;
