import { gql } from "apollo-boost";

export const GET_CHAT = gql`
  query getChat($chatId: Int!) {
    GetChat(chatId: $chatId) {
      ok
      error
      chat {
        passengerId
        driverId
        messages {
          id
          text
          userId
        }
      }
    }
  }
`;

export const SEND_MESSAGE = gql`
  mutation sendChatMessage($text: String!, $chatId: Int!) {
    SendChatMessage(text: $text, chatId: $chatId) {
      ok
      error
      message {
        id
        text
        userId
      }
    }
  }
`;

export const SUBSCRIBE_TO_MESSAGES = gql`
  subscription messageSubscription {
    MessageSubscription {
      id
    }
  }
`;
