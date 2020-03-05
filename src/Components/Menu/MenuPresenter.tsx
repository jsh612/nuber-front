import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import routes from "../../Routes/routes";
import { TTheme } from "../../theme";
import { userProfile } from "../../types/api";

const Container = styled.div`
  height: 100%;
`;

const Header = styled.div`
  background-color: black;
  height: 20%;
  margin-bottom: 30px;
  padding: 0 15px;
  color: white;
`;

const SLink = styled(Link)`
  font-size: 22px;
  display: block;
  margin-left: 15px;
  margin-bottom: 25px;
  font-weight: 400;
`;

const Image = styled.img`
  height: 80px;
  width: 80px;
  background-color: grey;
  border-radius: 40px;
  overflow: hidden;
`;

const Name = styled.h2`
  font-size: 22px;
  color: white;
  margin-bottom: 10px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Rating = styled.h5`
  font-size: 18px;
  color: white;
`;

const Text = styled.span`
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-gap: 10px;
  height: 100%;
  align-items: center;
`;

interface IToggleProps {
  isDriving: boolean;
  theme: TTheme;
}

const ToggleDriving = styled.button`
  -webkit-appearance: none;
  background-color: ${(props: IToggleProps) =>
    props.isDriving ? props.theme.yellowColor : props.theme.greenColor};
  width: 100%;
  color: white;
  font-size: 18px;
  border: 0;
  padding: 15px 0px;
  cursor: pointer;
`;

interface IProps {
  data?: userProfile;
  loading: boolean;
}

const MenuPresenter: React.FC<IProps> = ({
  // data가 없는 경우에 대비한 구조 분해 할당
  data: { GetMyProfile: { user = null } = {} } = {},
  loading
}) => {
  return (
    <Container>
      {!loading && user && user.fullName && (
        <React.Fragment>
          <Header>
            <Grid>
              <Link to={routes.EDIT_ACCOUNT}>
                <Image
                  src={
                    user.profilePhoto ||
                    "https://lh3.googleusercontent.com/-CTwXMuZRaWw/AAAAAAAAAAI/AAAAAAAAAUg/8T5nFuIdnHE/photo.jpg"
                  }
                />
              </Link>
              <Text>
                <Name>{user.fullName}</Name>
                <Rating>4.5</Rating>
              </Text>
            </Grid>
          </Header>
          <SLink to="/trips">Your Trips</SLink>
          <SLink to={routes.SETTINGS}>Settings</SLink>
          <ToggleDriving isDriving={user.isDriving}>
            {user.isDriving ? "Stop driving" : "Start driving"}
          </ToggleDriving>
        </React.Fragment>
      )}
    </Container>
  );
};

export default MenuPresenter;
