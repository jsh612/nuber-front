import React from "react";
import Header from "../../Components/Header";
import styled from "styled-components";
import { getChat, userProfile } from "../../types/api";
import Message from "../../Components/Message";

const Container = styled.div``;

interface IProps {
  chatLoading: boolean;
  chatData?: getChat;
  userData?: userProfile;
}

const ChatPresenter: React.FC<IProps> = ({
  chatLoading,
  chatData: { GetChat: { chat = null } = {} } = {},
  userData: { GetMyProfile: { user = null } = {} } = {}
}) => (
  <Container>
    <Header title={"Chat"} />
    {!chatLoading && chat && user && (
      <>
        {chat.messages &&
          chat.messages.map(message => {
            if (message) {
              return (
                <Message
                  key={message.id}
                  text={message.text}
                  mine={user.id === message.userId}
                />
              );
            }
            return null;
          })}
      </>
    )}
  </Container>
);

export default ChatPresenter;
