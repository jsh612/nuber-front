import React from "react";
import styled from "styled-components";
import Sidebar from "react-sidebar";
import Helmet from "react-helmet";

const Container = styled.div``;

interface IProps {
  isMenuOpen: boolean;
  toggleMenu: () => void;
}

const HomePresenter: React.FC<IProps> = ({ isMenuOpen, toggleMenu }) => {
  return (
    <Container>
      <Helmet>
        <title>Home | Number</title>
      </Helmet>
      <Sidebar
        sidebar={<b>Sidebar content</b>}
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
        <button onClick={toggleMenu}>Open sidebar</button>
      </Sidebar>
    </Container>
  );
};

export default HomePresenter;
