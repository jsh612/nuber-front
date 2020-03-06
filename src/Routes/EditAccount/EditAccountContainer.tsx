import React, { useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/react-hooks";
import axios from "axios";

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
  const [uploading, setUploading] = useState(false);

  const uploadTrigger: React.ChangeEventHandler<HTMLInputElement> = async event => {
    const {
      target: { files }
    } = event;
    if (files) {
      console.log("files", files);
      setUploading(true);
      const formData = new FormData();

      formData.append("file", files[0]);
      //api_key , upload_preset 은  cloudinary 서비스와 관련된 것
      formData.append("api_key", "811881451928618");
      formData.append("upload_preset", "tqecb16q");
      // ==
      formData.append("timestamp", String(Date.now() / 1000));
      console.log("formData:", formData.getAll("file"));
      // const {
      //   data: { secure_url }
      // } = await axios.post(
      //   "https://api.cloudinary.com/v1_1/djjpx4ror/image/upload",
      //   formData
      // );
      // console.log("파일올린 데이터::", secure_url);
      // if (secure_url) {
      //   profilePhotoInput.setValue(secure_url);
      //   setUploading(false);
      // }
    }
  };
  const [editAccountMutation, { loading }] = useMutation<
    updateProfile,
    updateProfileVariables
  >(UPDATE_PROFILE, {
    // refetchQueries를 통해 기존 fetch한 user profile을 갱신
    refetchQueries: [{ query: USER_PROFILE }],
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
        console.log("user:", user);
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
      uploading={uploading}
      uploadTrigger={uploadTrigger}
    />
  );
};

export default EditAccountContainer;
