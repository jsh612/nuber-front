import React, { useState } from "react";
import useInput from "../../hooks/useInput";
import AddPlacePresenter from "./AddPlacePresenter";
import { RouteComponentProps } from "react-router-dom";
import { useMutation } from "@apollo/react-hooks";
import { addPlace, addPlaceVariables } from "../../types/api";
import { ADD_PLACE } from "./AddPlace.queries";
import { GET_PLACES } from "../../sharedQueries.queries";
import { toast } from "react-toastify";

const AddPlaceContainer: React.FC<RouteComponentProps> = ({ history }) => {
  const addressInput = useInput("");
  const placeNameInput = useInput("");
  const [lat, setLat] = useState(1.34);
  const [lng, setLng] = useState(1.34);

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
          history.push("/places");
        }, 2000);
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
    />
  );
};

export default AddPlaceContainer;
