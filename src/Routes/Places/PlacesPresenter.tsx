import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Helmet from "react-helmet";

import { getMyPlaces } from "../../types/api";
import Place from "../../Components/Place";
import Header from "../../Components/Header";
import routes from "../routes";

const Container = styled.div`
  padding: 0 40px;
`;

const SLink = styled(Link)`
  text-decoration: underline;
`;

interface IProps {
  data?: getMyPlaces;
  loading: boolean;
}

const PlacesPresenter: React.FC<IProps> = ({
  data: { GetMyPlaces: { places = null } = {} } = {},
  loading
}) => {
  return (
    <>
      <Helmet>
        <title>Places | Number</title>
      </Helmet>
      <Header title={"Places"} backTo={"/"} />
      <Container>
        {!loading && places && places.length === 0 && "You have no places"}
        {!loading &&
          places &&
          places.length !== 0 &&
          places.map(place => (
            <Place
              key={place!.id}
              id={place!.id}
              fav={place!.isFav}
              name={place!.name}
              address={place!.address}
            />
          ))}
        <SLink to={routes.ADD_PLACE}>Add some places!</SLink>
      </Container>
    </>
  );
};

export default PlacesPresenter;
