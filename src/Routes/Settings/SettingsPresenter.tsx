import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { MutationTuple } from "@apollo/react-hooks";
import Helmet from "react-helmet";

import { userProfile, getMyPlaces } from "../../types/api";
import Header from "../../Components/Header";
import Place from "../../Components/Place";
import routes from "../routes";
import { basicProfilePhoto } from "../../utils";

const Container = styled.div`
  padding: 0px 40px;
`;

const Image = styled.img`
  height: 60px;
  width: 60px;
  border-radius: 50%;
`;

const GridLink = styled(Link)`
  width: 15%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 10px;
  margin-bottom: 10px;
`;

const Keys = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Key = styled.span`
  display: block;
  margin-bottom: 5px;
`;

const FakeLink = styled.span`
  text-decoration: underline;
  cursor: pointer;
`;

const SLink = styled(Link)`
  display: block;
  text-decoration: underline;
  margin: 20px 0px;
`;

interface IProps {
  logUserOut: MutationTuple<any, any>[0];
  userData?: userProfile;
  userDataLoading: boolean;
  placesData?: getMyPlaces;
  placesLoading: boolean;
}

const SettingsPresenter: React.FC<IProps> = ({
  logUserOut,
  userData: { GetMyProfile: { user = null } = {} } = {},
  userDataLoading,
  placesData: { GetMyPlaces: { places = null } = {} } = {},
  placesLoading
}) => {
  const onClick = () => {
    return logUserOut();
  };
  return (
    <>
      <Helmet>
        <title>Settings | Nuber</title>
      </Helmet>
      <Header title={"Account Settings"} backTo={"/"} />
      <Container>
        <GridLink to={routes.EDIT_ACCOUNT}>
          {!userDataLoading && user && user.email && user.fullName && (
            <>
              <Image
                src={user.profilePhoto ? user.profilePhoto : basicProfilePhoto}
              />
              <Keys>
                <Key>{user.fullName}</Key>
                <Key>{user.email}</Key>
              </Keys>
            </>
          )}
        </GridLink>
        {!placesLoading &&
          places &&
          places.map(place => (
            <Place
              id={place!.id}
              key={place!.id}
              fav={place!.isFav}
              name={place!.name}
              address={place!.address}
            />
          ))}
        <SLink to={routes.PLACES}>Go to Places</SLink>
        <FakeLink onClick={onClick}>Log Out</FakeLink>
      </Container>
    </>
  );
};

export default SettingsPresenter;
