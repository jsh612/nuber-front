import React, { useEffect } from "react";
import { RouteComponentProps, useParams } from "react-router-dom";
import routes from "../routes";
import ChatPresenter from "./ChatPresenter";
import { useQuery, useMutation, useSubscription } from "@apollo/react-hooks";
import { USER_PROFILE } from "../../sharedQueries.queries";
import {
  userProfile,
  getChat,
  getChatVariables,
  sendChatMessage,
  sendChatMessageVariables,
  messageSubscription
} from "../../types/api";
import { GET_CHAT, SEND_MESSAGE, SUBSCRIBE_TO_MESSAGES } from "./Chat.queries";
import useInput from "../../hooks/useInput";

interface IProps extends RouteComponentProps {}

const ChatContainer: React.FC<IProps> = ({ history }) => {
  const { chatId } = useParams();
  if (!chatId) {
    history.push(routes.HOME);
  }

  //메시지 입력란
  const messageInput = useInput("");

  // user Profile query
  const { data: userData } = useQuery<userProfile>(USER_PROFILE);

  // chat query
  const {
    data: chatData,
    loading: chatLoading,
    refetch: chatRefetch
  } = useQuery<getChat, getChatVariables>(GET_CHAT, {
    variables: {
      chatId: Number(chatId)
    }
  });

  // send chat mutation
  const [sendChatMutation] = useMutation<
    sendChatMessage,
    sendChatMessageVariables
  >(SEND_MESSAGE);

  // message subscription
  const { loading: subsLoading, data: subsData } = useSubscription<
    messageSubscription
  >(SUBSCRIBE_TO_MESSAGES);

  const onSubmit = async () => {
    if (messageInput.value !== "" && messageInput.value) {
      await sendChatMutation({
        variables: {
          chatId: Number(chatId),
          text: messageInput.value
        }
      });
      return;
    }
  };

  useEffect(() => {
    chatRefetch();
  }, [subsData]);

  return (
    <ChatPresenter
      userData={userData}
      chatData={chatData}
      chatLoading={chatLoading}
      messageInput={messageInput}
      onSubmit={onSubmit}
    />
  );
};

export default ChatContainer;
