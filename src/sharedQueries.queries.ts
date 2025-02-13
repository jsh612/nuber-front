import { gql } from "apollo-boost";

export const USER_PROFILE = gql`
  query userProfile {
    GetMyProfile {
      ok
      error
      user {
        id
        profilePhoto
        fullName
        isDriving
        firstName
        lastName
        email
      }
    }
  }
`;

export const GET_PLACES = gql`
  query getMyPlaces {
    GetMyPlaces {
      ok
      error
      places {
        id
        name
        address
        isFav
      }
    }
  }
`;
