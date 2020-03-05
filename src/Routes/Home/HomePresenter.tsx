import React from "react";
import styled from "styled-components";
import Sidebar from "react-sidebar";
import Helmet from "react-helmet";

import Menu from "../../Components/Menu";

const Container = styled.div``;

interface IProps {
  isMenuOpen: boolean;
  toggleMenu: () => void;
  loading: boolean;
}

const HomePresenter: React.FC<IProps> = ({
  isMenuOpen,
  toggleMenu,
  loading
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
        {!loading && <button onClick={toggleMenu}>Open sidebar</button>}
      </Sidebar>
    </Container>
  );
};

export default HomePresenter;
