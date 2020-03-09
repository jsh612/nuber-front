import React from "react";
import styled from "styled-components";
import Button from "../Button";
import { TTheme } from "../../theme";

const Container = styled.div`
  background-color: white;
  position: absolute;
  margin: auto;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 80%;
  height: 60%;
  z-index: 9;
  padding: 20px;
`;

const Title = styled.h4`
  font-weight: 800;
  margin-top: 30px;
  margin-bottom: 10px;
  &:first-child {
    margin-top: 0;
  }
`;

interface ISProps {
  theme: TTheme;
}

const Data = styled.span`
  color: ${(props: ISProps) => props.theme.blueColor};
`;

const Img = styled.img`
  border-radius: 50%;
  margin-right: 20px;
`;

const Passenger = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

interface IProps {
  pickUpAddress: string;
  dropOffAddress: string;
  price: number;
  distance: string;
  passengerName: string;
  passengerPhoto: string;
  acceptRideFn: any;
  id: number;
}

const RidePopUp: React.FC<IProps> = ({
  pickUpAddress,
  dropOffAddress,
  price,
  distance,
  passengerName,
  passengerPhoto,
  acceptRideFn,
  id
}) => {
  const onClick = async () => acceptRideFn({ variables: { rideId: id } });
  return (
    <Container>
      <Title>Pick Up Address</Title>
      <Data>{pickUpAddress}</Data>
      <Title>Drop Off Address</Title>
      <Data>{dropOffAddress}</Data>
      <Title>Price</Title>
      <Data>{price}</Data>
      <Title>Distance</Title>
      <Data>{distance}</Data>
      <Title>Distance</Title>
      <Data>{distance}</Data>
      <Title>Passenger:</Title>
      <Passenger>
        <Img src={passengerPhoto} />
        <Data>{passengerName}</Data>
      </Passenger>
      <Button onClick={onClick} value={"Accept Ride"} />
    </Container>
  );
};

export default RidePopUp;
