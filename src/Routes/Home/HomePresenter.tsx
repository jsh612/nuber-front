import React from "react";
import styled from "styled-components";
import Sidebar from "react-sidebar";
import Helmet from "react-helmet";

import Menu from "../../Components/Menu";
import AddressBar from "../../Components/AddressBar";
import Button from "../../Components/Button";

const Container = styled.div``;

const MenuButton = styled.button`
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

const ExtendedButton = styled(Button)`
  position: absolute;
  bottom: 50px;
  left: 0;
  right: 0;
  margin: auto;
  z-index: 10;
  height: auto;
  width: 80%;
`;

const RequestButton = styled(ExtendedButton)`
  bottom: 250px;
`;

interface IAddresInput {
  value: string | null;
  onChange: React.ChangeEventHandler;
}

interface IProps {
  isMenuOpen: boolean;
  toggleMenu: () => void;
  loading: boolean;
  mapRef: any;
  toAddress: IAddresInput;
  onAddressSubmit: () => void;
  price?: string;
}

const HomePresenter: React.FC<IProps> = ({
  isMenuOpen,
  toggleMenu,
  loading,
  mapRef,
  toAddress,
  onAddressSubmit,
  price
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
        {!loading && <MenuButton onClick={toggleMenu}>|||</MenuButton>}
        <AddressBar
          name={"toAddress"}
          onChange={toAddress.onChange}
          value={toAddress.value ? toAddress.value : ""}
          onBlur={() => null}
        />
        {price && (
          <RequestButton
            onClick={onAddressSubmit}
            disabled={toAddress.value === ""}
            value={`Request Ride ($${price})`}
          />
        )}
        <ExtendedButton
          onClick={onAddressSubmit}
          disabled={toAddress.value === ""}
          value={price ? "Change address" : "Pick Address"}
        />
        <Map ref={mapRef} />
      </Sidebar>
    </Container>
  );
};

export default HomePresenter;
