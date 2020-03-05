import { gql } from "apollo-boost";

const TOGGL_DRIVING = gql`
  mutation toggleDrivingMode {
    ToggleDrivingMode {
      ok
      error
    }
  }
`;

export default TOGGL_DRIVING;
