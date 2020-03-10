import React from "react";
import { RouteComponentProps, useParams } from "react-router-dom";
import routes from "../routes";
import ChatPresenter from "./ChatPresenter";

interface IProps extends RouteComponentProps {}

const ChatContainer: React.FC<IProps> = ({ history }) => {
  const { chatId } = useParams();
  if (!chatId) {
    history.push(routes.HOME);
  }
  return <ChatPresenter />;
};

export default ChatContainer;
