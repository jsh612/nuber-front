import React, { useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import HomePresenter from "./HomePresenter";

interface IProps extends RouteComponentProps {}

const HomeConainer: React.FC<IProps> = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return <HomePresenter isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />;
};

export default HomeConainer;
