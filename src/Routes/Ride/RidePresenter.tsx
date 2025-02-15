import React, { useEffect } from "react";
import styled from "styled-components";
import { MutationTuple } from "@apollo/react-hooks";
import Button from "../../Components/Button";
import { TTheme } from "../../theme";
import { Link, useHistory } from "react-router-dom";
import {
  getRide,
  userProfile,
  updateRideStatus,
  updateRideVariables,
  StatusOptions
} from "../../types/api.d";
import routes from "../routes";

const Container = styled.div`
  padding: 40px;
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
  max-width: 50px;
  height: 50px;
`;

const Passenger = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const Buttons = styled.div`
  margin: 30px 0px;
`;

const ExtendedButton = styled(Button)`
  margin-bottom: 30px;
`;

interface IProps {
  data?: getRide;
  userData?: userProfile;
  loading: boolean;
  updateRideFn: MutationTuple<updateRideStatus, updateRideVariables>[0];
}

const RidePresenter: React.FC<IProps> = ({
  data: { GetRide: { ride = null } = {} } = {},
  userData: { GetMyProfile: { user = null } = {} } = {},
  updateRideFn
}) => {
  const history = useHistory();
  useEffect(() => {
    if (ride && ride.status === "FINISHED") {
      history.push(routes.HOME);
    }
  }, [ride]);
  return (
    <Container>
      {ride && user && (
        <React.Fragment>
          <Title>Passenger</Title>
          <Passenger>
            <Img src={ride.passenger.profilePhoto!} />
            <Data>{ride.passenger.fullName!}</Data>
          </Passenger>
          {ride && ride?.driver && (
            <React.Fragment>
              <Title>Driver</Title>
              <Passenger>
                <Img src={ride.driver.profilePhoto!} />
                <Data>{ride.driver.fullName!}</Data>
              </Passenger>
            </React.Fragment>
          )}
          <Title>From</Title>
          <Data>{ride.pickUpAddress}</Data>
          <Title>To</Title>
          <Data>{ride.dropOffAddress}</Data>
          <Title>Price</Title>
          <Data>{ride.price}</Data>
          <Title>Distance</Title>
          <Data>{ride.distance}</Data>
          <Title>Duration</Title>
          <Data>{ride.duration}</Data>
          <Title>Status</Title>
          <Data>{ride.status}</Data>
          {ride && (
            <Buttons>
              {ride.driver &&
                ride.driver.id === user.id &&
                ride.status === "ACCEPTED" && (
                  <ExtendedButton
                    value={"Picked Up"}
                    onClick={() =>
                      updateRideFn({
                        variables: {
                          rideId: ride.id,
                          status: StatusOptions.ONROUTE
                        }
                      })
                    }
                  />
                )}
              {ride.driver &&
                ride.driver.id === user.id &&
                ride.status === "ONROUTE" && (
                  <ExtendedButton
                    value={"Finished"}
                    onClick={async () => {
                      console.log("ride.id", ride.id);
                      return updateRideFn({
                        variables: {
                          rideId: ride.id,
                          status: StatusOptions.FINISHED
                        }
                      });
                    }}
                  />
                )}
              {((ride.driver && ride.driver.id === user.id) ||
                ride.passenger.id === user.id) &&
                ride.status === "ACCEPTED" && (
                  <Link to={`/chat/${ride.chatId}`}>
                    <ExtendedButton value={"Chat"} onClick={null} />
                  </Link>
                )}
            </Buttons>
          )}
        </React.Fragment>
      )}
    </Container>
  );
};

export default RidePresenter;
