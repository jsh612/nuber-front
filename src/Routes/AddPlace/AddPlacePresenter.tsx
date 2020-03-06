import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Helmet from "react-helmet";

import Button from "../../Components/Button";
import Form from "../../Components/Form";
import Header from "../../Components/Header";
import Input from "../../Components/Input";
import routes from "../routes";
import { addPlaceVariables, addPlace } from "../../types/api";
import { MutationTuple } from "@apollo/react-hooks";

const Container = styled.div`
  padding: 0 40px;
`;

const ExtendedInput = styled(Input)`
  margin-bottom: 40px;
`;

const ExtendedLink = styled(Link)`
  text-decoration: underline;
  margin-bottom: 20px;
  display: block;
`;

interface IData {
  onChange: React.ChangeEventHandler;
  value: string | null;
}

interface IProps {
  address: IData;
  name: IData;
  loading: boolean;
  onSubmit: MutationTuple<addPlace, addPlaceVariables>[0];
}

const AddPlacePresenter: React.FC<IProps> = ({
  address,
  name,
  loading,
  onSubmit
}) => {
  const submitFn: React.FormEventHandler = e => {
    e.preventDefault();
    return onSubmit();
  };
  return (
    <React.Fragment>
      <Helmet>
        <title>Add Place | Nuber</title>
      </Helmet>
      <Header title={"Add Place"} backTo={"/"} />
      <Container>
        <Form submitFn={submitFn}>
          <ExtendedInput
            placeholder={"장소 이름"}
            type={"text"}
            onChange={name.onChange}
            value={name.value ? name.value : ""}
            name={"name"}
          />
          <ExtendedInput
            placeholder={"주소"}
            type={"text"}
            onChange={address.onChange}
            value={address.value ? address.value : ""}
            name={"address"}
          />
          <ExtendedLink to={routes.FIND_ADDRESS}>
            Pick place from map
          </ExtendedLink>
          <Button
            onClick={null}
            value={loading ? "Adding place" : "Add Place"}
          />
        </Form>
      </Container>
    </React.Fragment>
  );
};

export default AddPlacePresenter;
