import React from "react";
import styled from "styled-components";
import { TTheme } from "../../theme";
import { editPlace, editPlaceVariables } from "../../types/api";
import { MutationTuple } from "@apollo/react-hooks";

const SPlace = styled.div`
  margin: 15px 0;
  display: flex;
  align-items: center;
  & i {
    font-size: 12px;
  }
`;

const Container = styled.div`
  margin-left: 10px;
`;

const Name = styled.span`
  display: block;
`;

const Icon = styled.span`
  cursor: pointer;
`;

interface ISProps {
  theme: TTheme;
}

const Address = styled.span`
  color: ${(props: ISProps) => props.theme.greyColor};
  font-size: 14px;
`;

interface IProps {
  fav: boolean;
  name: string;
  address: string;
  onStarPress: MutationTuple<editPlace, editPlaceVariables>[0];
}

const PlacePresenter: React.FC<IProps> = ({
  fav,
  name,
  address,
  onStarPress
}) => {
  const onClick = () => onStarPress();
  return (
    <SPlace>
      <Icon onClick={onClick}>{fav ? "★" : "✩"}</Icon>
      <Container>
        <Name>{name}</Name>
        <Address>{address}</Address>
      </Container>
    </SPlace>
  );
};

export default PlacePresenter;
