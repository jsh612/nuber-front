import React from "react";
import { RouteComponentProps, useParams } from "react-router-dom";
import routes from "../routes";
import ChatPresenter from "./ChatPresenter";
import { useQuery } from "@apollo/react-hooks";
import { USER_PROFILE } from "../../sharedQueries.queries";
import { userProfile, getChat, getChatVariables } from "../../types/api";
import { GET_CHAT } from "./Chat.queries";

interface IProps extends RouteComponentProps {}

const ChatContainer: React.FC<IProps> = ({ history }) => {
  const { chatId } = useParams();
  if (!chatId) {
    history.push(routes.HOME);
  }

  // user Profile query
  const { data: userData } = useQuery<userProfile>(USER_PROFILE);

  // chat query
  const { data: chatData, loading: chatLoading } = useQuery<
    getChat,
    getChatVariables
  >(GET_CHAT, {
    variables: {
      chatId: Number(chatId)
    }
  });

  return (
    <ChatPresenter
      userData={userData}
      chatData={chatData}
      chatLoading={chatLoading}
    />
  );
};

export default ChatContainer;
