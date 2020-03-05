import React from "react";
import { RouteComponentProps } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/react-hooks";

import useInput from "../../hooks/useInput";
import { UPDATE_PROFILE } from "./EditAccount.queries";
import {
  updateProfile,
  updateProfileVariables,
  userProfile
} from "../../types/api";
import EditAccountPresenter from "./EditAccountPresenter";
import { USER_PROFILE } from "../../sharedQueries.queries";
import { toast } from "react-toastify";

const EditAccountContainer: React.FC<RouteComponentProps> = () => {
  const firstNameInput = useInput("");
  const lastNameInput = useInput("");
  const emailInput = useInput("");
  const profilePhotoInput = useInput("");

  const [editAccountMutation, { loading }] = useMutation<
    updateProfile,
    updateProfileVariables
  >(UPDATE_PROFILE, {
    // refetchQueries: [{ query: USER_PROFILE }],
    onCompleted: data => {
      const { UpdateMyProfile } = data;
      if (UpdateMyProfile.ok) {
        toast.success("Profile updated!");
      } else if (UpdateMyProfile.error) {
        toast.error(UpdateMyProfile.error);
      }
    }
  });

  useQuery<userProfile>(USER_PROFILE, {
    onCompleted: async (data: {} | userProfile) => {
      if ("GetMyProfile" in data) {
        const {
          GetMyProfile: { user }
        } = data;
        if (user !== null) {
          const { firstName, lastName, email, profilePhoto } = user;
          firstNameInput.setValue(firstName);
          lastNameInput.setValue(lastName);
          emailInput.setValue(email);
          profilePhotoInput.setValue(profilePhoto);
        }
      }
    }
  });

  return (
    <EditAccountPresenter
      firstName={firstNameInput}
      lastName={lastNameInput}
      email={emailInput}
      profilePhoto={profilePhotoInput}
      loading={loading}
      onSubmit={editAccountMutation}
    />
  );
};

export default EditAccountContainer;
