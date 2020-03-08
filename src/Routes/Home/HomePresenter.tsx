import React from "react";
import styled from "styled-components";
import Sidebar from "react-sidebar";
import Helmet from "react-helmet";

import Menu from "../../Components/Menu";

const Container = styled.div``;

const Button = styled.button`
  appearance: none;
  padding: 10px;
  position: absolute;
  top: 50px;
  left: 10px;
  text-align: center;
  font-weight: 800;
  border: 0;
  cursor: pointer;
  font-size: 50px;
  transform: rotate(90deg);
  z-index: 2;
  background-color: transparent;
`;

const Map = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
`;

interface IProps {
  isMenuOpen: boolean;
  toggleMenu: () => void;
  loading: boolean;
  mapRef: any;
}

const HomePresenter: React.FC<IProps> = ({
  isMenuOpen,
  toggleMenu,
  loading,
  mapRef
}) => {
  return (
    <Container>
      <Helmet>
        <title>Home | Number</title>
      </Helmet>
      <Sidebar
        sidebar={<Menu />}
        open={isMenuOpen}
        onSetOpen={toggleMenu}
        styles={{
          sidebar: {
            backgroundColor: "white",
            width: "80%",
            zIndex: "10"
          }
        }}
      >
        {!loading && <Button onClick={toggleMenu}>|||</Button>}
        <Map ref={mapRef} />
      </Sidebar>
    </Container>
  );
};

export default HomePresenter;
