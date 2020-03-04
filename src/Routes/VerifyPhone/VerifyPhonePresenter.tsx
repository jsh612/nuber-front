import React from "react";
import Helmet from "react-helmet";
import Button from "../../Components/Button";
import Header from "../../Components/Header";
import Input from "../../Components/Input";
import styled from "styled-components";
import Form from "../../Components/Form";

const Container = styled.div``;

const ExtendedForm = styled(Form)`
  padding: 0px 40px;
`;

const ExtendedInput = styled(Input)`
  margin-bottom: 20px;
`;

interface IProps {
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  value: string;
  loading: boolean;
  onSubmit: any; // verifyPhoneMutation의 types를 몰라서 그냥 any로 해둠
}

const VerifyPhonePresenter: React.FC<IProps> = ({
  onChange,
  value,
  onSubmit,
  loading
}) => (
  <Container>
    <Helmet>
      <title>Verify Phone | Number</title>
    </Helmet>
    <Header backTo={"/phone-login"} title={"Verify Phone Number"} />
    <ExtendedForm submitFn={onSubmit}>
      <ExtendedInput
        value={value}
        placeholder={"Enter Verification Code"}
        onChange={onChange}
        name={"verificationKey"}
      />
      <Button
        disabled={loading}
        value={loading ? "Verifying" : "Submit"}
        onClick={null}
      />
    </ExtendedForm>
  </Container>
);

export default VerifyPhonePresenter;
