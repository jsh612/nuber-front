import HomeContainer from "./HomeContainer";
import { GoogleApiWrapper } from "google-maps-react";
import MAPS_KEY from "../../googleApi";
export default GoogleApiWrapper({
  apiKey: MAPS_KEY
})(HomeContainer);
