import React from "react";
import { useMutation } from "@apollo/react-hooks";

import { editPlace, editPlaceVariables } from "../../types/api";
import { EDIT_PLACE } from "./EditPlace.queries";
import { GET_PLACES } from "../../sharedQueries.queries";
import PlacePresenter from "./PlacePresenter";

interface IProps {
  fav: boolean;
  name: string;
  address: string;
  id: number;
}

const PlaceContainer: React.FC<IProps> = ({ id, fav, name, address }) => {
  const [editPlaceMutation] = useMutation<editPlace, editPlaceVariables>(
    EDIT_PLACE,
    {
      variables: {
        isFav: !fav,
        placeId: id
      },
      refetchQueries: [{ query: GET_PLACES }]
    }
  );

  return (
    <PlacePresenter
      onStarPress={editPlaceMutation}
      fav={fav}
      name={name}
      address={address}
    />
  );
};

export default PlaceContainer;
