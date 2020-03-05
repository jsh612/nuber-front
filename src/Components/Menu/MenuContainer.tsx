import React from "react";
import MenuPresenter from "./MenuPresenter";
import { useQuery } from "@apollo/react-hooks";
import { USER_PROFILE } from "../../sharedQueries.queries";
import { userProfile } from "../../types/api";

const MenuContainer: React.FC = () => {
  const { data, loading } = useQuery<userProfile>(USER_PROFILE);
  return <MenuPresenter data={data} loading={loading} />;
};

export default MenuContainer;
