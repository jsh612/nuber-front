import React from "react";
import styled from "styled-components";
import { TTheme } from "../../theme";

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
}

const Place: React.FC<IProps> = ({ fav, name, address }) => {
  return (
    <SPlace>
      <Icon>{fav ? "✩" : "★"}</Icon>
      <Container>
        <Name>{name}</Name>
        <Address>{address}</Address>
      </Container>
    </SPlace>
  );
};

export default Place;
