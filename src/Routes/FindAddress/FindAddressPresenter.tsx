import React from "react";
import Helmet from "react-helmet";
import styled from "styled-components";
import AddressBar from "../../Components/AddressBar";
import Button from "../../Components/Button";

const Map = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: 1;
`;

const Center = styled.div`
  position: absolute;
  width: 40px;
  height: 40px;
  z-index: 2;
  font-size: 30px;
  margin: auto;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
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

interface IData {
  value: string | null;
  onChange: React.ChangeEventHandler;
}

interface IProps {
  mapRef: any;
  address: IData;
  onInputBlur: () => void;
  onPickPlace: () => void;
}

const FindAddressPresenter: React.FC<IProps> = ({
  mapRef,
  address,
  onInputBlur,
  onPickPlace
}) => {
  return (
    <div>
      <Helmet>
        <title>Find Address | Nuber</title>
      </Helmet>
      <AddressBar
        onBlur={onInputBlur}
        onChange={address.onChange}
        value={address.value ? address.value : ""}
        name={"address"}
      />
      <ExtendedButton value={"Pick this place"} onClick={onPickPlace} />
      <Center>
        <span role="img" aria-label="현재 위치">
          📍
        </span>
      </Center>
      <Map ref={mapRef} />
    </div>
  );
};

export default FindAddressPresenter;
