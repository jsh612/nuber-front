import { GoogleApiWrapper } from "google-maps-react";
import FindAddressContainer from "./FindAddressContainer";
import key from "../../googleApi";
export default GoogleApiWrapper({
  apiKey: key
})(FindAddressContainer);
