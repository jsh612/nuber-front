/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: toggleDrivingMode
// ====================================================

export interface toggleDrivingMode_ToggleDrivingMode {
  __typename: "ToggleDrivingModeResponse";
  ok: boolean;
  error: string | null;
}

export interface toggleDrivingMode {
  ToggleDrivingMode: toggleDrivingMode_ToggleDrivingMode;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: editPlace
// ====================================================

export interface editPlace_EditPlace {
  __typename: "EditPlaceResponse";
  ok: boolean;
  error: string | null;
}

export interface editPlace {
  EditPlace: editPlace_EditPlace | null;
}

export interface editPlaceVariables {
  placeId: number;
  isFav?: boolean | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: addPlace
// ====================================================

export interface addPlace_AddPlace {
  __typename: "AddPlaceRespons";
  ok: boolean;
  error: string | null;
}

export interface addPlace {
  AddPlace: addPlace_AddPlace;
}

export interface addPlaceVariables {
  name: string;
  lat: number;
  lng: number;
  address: string;
  isFav: boolean;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getChat
// ====================================================

export interface getChat_GetChat_chat_messages {
  __typename: "Message";
  id: number;
  text: string;
  userId: number | null;
}

export interface getChat_GetChat_chat {
  __typename: "Chat";
  passengerId: number;
  driverId: number | null;
  messages: (getChat_GetChat_chat_messages | null)[] | null;
}

export interface getChat_GetChat {
  __typename: "GetChatResponse";
  ok: boolean;
  error: string | null;
  chat: getChat_GetChat_chat | null;
}

export interface getChat {
  GetChat: getChat_GetChat;
}

export interface getChatVariables {
  chatId: number;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: sendChatMessage
// ====================================================

export interface sendChatMessage_SendChatMessage_message {
  __typename: "Message";
  id: number;
  text: string;
  userId: number | null;
}

export interface sendChatMessage_SendChatMessage {
  __typename: "SendChatMessageResponse";
  ok: boolean;
  error: string | null;
  message: sendChatMessage_SendChatMessage_message | null;
}

export interface sendChatMessage {
  SendChatMessage: sendChatMessage_SendChatMessage;
}

export interface sendChatMessageVariables {
  text: string;
  chatId: number;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL subscription operation: messageSubscription
// ====================================================

export interface messageSubscription_MessageSubscription {
  __typename: "Message";
  id: number;
}

export interface messageSubscription {
  MessageSubscription: messageSubscription_MessageSubscription | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: updateProfile
// ====================================================

export interface updateProfile_UpdateMyProfile {
  __typename: "UpdateMyProfileResponse";
  ok: boolean;
  error: string | null;
}

export interface updateProfile {
  UpdateMyProfile: updateProfile_UpdateMyProfile;
}

export interface updateProfileVariables {
  firstName?: string | null;
  lastName?: string | null;
  email?: string | null;
  profilePhoto?: string | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: reportMovement
// ====================================================

export interface reportMovement_ReportMovement {
  __typename: "ReportMovementResponse";
  ok: boolean;
}

export interface reportMovement {
  ReportMovement: reportMovement_ReportMovement;
}

export interface reportMovementVariables {
  lat: number;
  lng: number;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getNearbyDrivers
// ====================================================

export interface getNearbyDrivers_GetNearbyDrivers_drivers {
  __typename: "User";
  id: number;
  lastLat: number | null;
  lastLng: number | null;
  fullName: string | null;
}

export interface getNearbyDrivers_GetNearbyDrivers {
  __typename: "GetNearbyDriversResponse";
  ok: boolean;
  drivers: (getNearbyDrivers_GetNearbyDrivers_drivers | null)[] | null;
}

export interface getNearbyDrivers {
  GetNearbyDrivers: getNearbyDrivers_GetNearbyDrivers | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: requestRide
// ====================================================

export interface requestRide_RequestRide_ride {
  __typename: "Ride";
  id: number;
}

export interface requestRide_RequestRide {
  __typename: "RequestRideResponse";
  ok: boolean;
  error: string | null;
  ride: requestRide_RequestRide_ride | null;
}

export interface requestRide {
  RequestRide: requestRide_RequestRide;
}

export interface requestRideVariables {
  pickUpAddress: string;
  pickUpLat: number;
  pickUpLng: number;
  dropOffAddress: string;
  dropOffLat: number;
  dropOffLng: number;
  price: number;
  distance: string;
  duration: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getRides
// ====================================================

export interface getRides_GetNearbyRide_ride_passenger {
  __typename: "User";
  fullName: string | null;
  profilePhoto: string | null;
}

export interface getRides_GetNearbyRide_ride {
  __typename: "Ride";
  status: string;
  id: number;
  pickUpAddress: string;
  dropOffAddress: string;
  price: number;
  distance: string;
  passenger: getRides_GetNearbyRide_ride_passenger;
}

export interface getRides_GetNearbyRide {
  __typename: "GetNearbyRideResponse";
  ok: boolean;
  error: string | null;
  ride: getRides_GetNearbyRide_ride | null;
}

export interface getRides {
  GetNearbyRide: getRides_GetNearbyRide;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: updateRideStatus
// ====================================================

export interface updateRideStatus_UpdateRideStatus {
  __typename: "UpdateRideStatusResponse";
  ok: boolean;
  error: string | null;
  rideId: number | null;
}

export interface updateRideStatus {
  UpdateRideStatus: updateRideStatus_UpdateRideStatus;
}

export interface updateRideStatusVariables {
  rideId: number;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL subscription operation: nearbyRides
// ====================================================

export interface nearbyRides_NearbyRideSubscription_passenger {
  __typename: "User";
  fullName: string | null;
  profilePhoto: string | null;
}

export interface nearbyRides_NearbyRideSubscription {
  __typename: "Ride";
  id: number;
  status: string;
  pickUpAddress: string;
  dropOffAddress: string;
  price: number;
  distance: string;
  passenger: nearbyRides_NearbyRideSubscription_passenger;
}

export interface nearbyRides {
  NearbyRideSubscription: nearbyRides_NearbyRideSubscription | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: StartPhoneVerification
// ====================================================

export interface StartPhoneVerification_StartPhoneVerification {
  __typename: "StartPhoneVerificationResponse";
  ok: boolean;
  error: string | null;
}

export interface StartPhoneVerification {
  StartPhoneVerification: StartPhoneVerification_StartPhoneVerification;
}

export interface StartPhoneVerificationVariables {
  phoneNumber: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getRide
// ====================================================

export interface getRide_GetRide_ride_driver {
  __typename: "User";
  id: number;
  fullName: string | null;
  profilePhoto: string | null;
}

export interface getRide_GetRide_ride_passenger {
  __typename: "User";
  id: number;
  fullName: string | null;
  profilePhoto: string | null;
}

export interface getRide_GetRide_ride {
  __typename: "Ride";
  id: number;
  status: string;
  pickUpAddress: string;
  dropOffAddress: string;
  price: number;
  distance: string;
  duration: string;
  driver: getRide_GetRide_ride_driver | null;
  passenger: getRide_GetRide_ride_passenger;
  chatId: number | null;
}

export interface getRide_GetRide {
  __typename: "GetRideResponse";
  ok: boolean;
  error: string | null;
  ride: getRide_GetRide_ride | null;
}

export interface getRide {
  GetRide: getRide_GetRide;
}

export interface getRideVariables {
  rideId: number;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL subscription operation: rideUpdates
// ====================================================

export interface rideUpdates_RideStatusSubscription_driver {
  __typename: "User";
  id: number;
  fullName: string | null;
  profilePhoto: string | null;
}

export interface rideUpdates_RideStatusSubscription_passenger {
  __typename: "User";
  id: number;
  fullName: string | null;
  profilePhoto: string | null;
}

export interface rideUpdates_RideStatusSubscription {
  __typename: "Ride";
  id: number;
  status: string;
  pickUpAddress: string;
  dropOffAddress: string;
  price: number;
  distance: string;
  duration: string;
  driver: rideUpdates_RideStatusSubscription_driver | null;
  passenger: rideUpdates_RideStatusSubscription_passenger;
  chatId: number | null;
}

export interface rideUpdates {
  RideStatusSubscription: rideUpdates_RideStatusSubscription | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: updateRide
// ====================================================

export interface updateRide_UpdateRideStatus {
  __typename: "UpdateRideStatusResponse";
  ok: boolean;
  error: string | null;
  rideId: number | null;
}

export interface updateRide {
  UpdateRideStatus: updateRide_UpdateRideStatus;
}

export interface updateRideVariables {
  rideId: number;
  status: StatusOptions;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: facebookConnect
// ====================================================

export interface facebookConnect_FacebookConnect {
  __typename: "FacebookConnectResponse";
  ok: boolean;
  error: string | null;
  token: string | null;
}

export interface facebookConnect {
  FacebookConnect: facebookConnect_FacebookConnect;
}

export interface facebookConnectVariables {
  firstName: string;
  lastName: string;
  email?: string | null;
  fbId: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: verifyPhone
// ====================================================

export interface verifyPhone_CompletePhoneVerification {
  __typename: "CompletePhoneVerificationResponse";
  ok: boolean;
  error: string | null;
  token: string | null;
}

export interface verifyPhone {
  CompletePhoneVerification: verifyPhone_CompletePhoneVerification;
}

export interface verifyPhoneVariables {
  key: string;
  phoneNumber: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: userProfile
// ====================================================

export interface userProfile_GetMyProfile_user {
  __typename: "User";
  id: number;
  profilePhoto: string | null;
  fullName: string | null;
  isDriving: boolean;
  firstName: string;
  lastName: string;
  email: string | null;
}

export interface userProfile_GetMyProfile {
  __typename: "GetMyProfileResponse";
  ok: boolean;
  error: string | null;
  user: userProfile_GetMyProfile_user | null;
}

export interface userProfile {
  GetMyProfile: userProfile_GetMyProfile;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getMyPlaces
// ====================================================

export interface getMyPlaces_GetMyPlaces_places {
  __typename: "Place";
  id: number;
  name: string;
  address: string;
  isFav: boolean;
}

export interface getMyPlaces_GetMyPlaces {
  __typename: "GetMyPlacesResponse";
  ok: boolean;
  error: string | null;
  places: (getMyPlaces_GetMyPlaces_places | null)[] | null;
}

export interface getMyPlaces {
  GetMyPlaces: getMyPlaces_GetMyPlaces;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum StatusOptions {
  ACCEPTED = "ACCEPTED",
  CANCELED = "CANCELED",
  FINISHED = "FINISHED",
  ONROUTE = "ONROUTE",
  REQUESTING = "REQUESTING",
}

//==============================================================
// END Enums and Input Objects
//==============================================================
