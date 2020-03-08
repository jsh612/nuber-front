import React, { useState } from "react";
import useInput from "../../hooks/useInput";
import AddPlacePresenter from "./AddPlacePresenter";
import { RouteComponentProps } from "react-router-dom";
import { useMutation } from "@apollo/react-hooks";
import { addPlace, addPlaceVariables } from "../../types/api";
import { ADD_PLACE } from "./AddPlace.queries";
import { GET_PLACES } from "../../sharedQueries.queries";
import { toast } from "react-toastify";
import routes from "../routes";

interface IState {
  lng: number;
  lat: number;
  address: string;
}

const AddPlaceContainer: React.FC<RouteComponentProps<any, any, IState>> = ({
  history,
  location
}) => {
  const {
    state: { lat: orginLat = 0, lng: orginLng = 0, address = "" } = {}
  } = location;

  const addressInput = useInput(address);
  const placeNameInput = useInput("");

  const [lat, setLat] = useState(orginLat);
  const [lng, setLng] = useState(orginLng);

  const [addPlaceMutation, { loading }] = useMutation<
    addPlace,
    addPlaceVariables
  >(ADD_PLACE, {
    variables: {
      address: addressInput.value ? addressInput.value : "",
      name: placeNameInput.value ? placeNameInput.value : "",
      isFav: false,
      lat,
      lng
    },
    refetchQueries: [{ query: GET_PLACES }],
    onCompleted: data => {
      const { AddPlace } = data;
      if (AddPlace.ok) {
        toast.success("Place added!");
        setTimeout(() => {
          history.push(routes.PLACES);
        }, 1000);
      } else {
        toast.error(AddPlace.error);
      }
    }
  });

  return (
    <AddPlacePresenter
      address={addressInput}
      name={placeNameInput}
      loading={loading}
      onSubmit={addPlaceMutation}
      pickedAddress={lat !== 0 && lng !== 0}
    />
  );
};

export default AddPlaceContainer;
