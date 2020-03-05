import React, { useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import HomePresenter from "./HomePresenter";
import { useQuery } from "@apollo/react-hooks";
import { USER_PROFILE } from "../../sharedQueries.queries";
import { userProfile } from "../../types/api";

interface IProps extends RouteComponentProps {}

const HomeConainer: React.FC<IProps> = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const { data, loading } = useQuery<userProfile>(USER_PROFILE);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <HomePresenter
      isMenuOpen={isMenuOpen}
      toggleMenu={toggleMenu}
      loading={loading}
    />
  );
};

export default HomeConainer;
