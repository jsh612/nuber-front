import React from "react";
import styled from "styled-components";

import Header from "../../Components/Header";
import { getChat, userProfile } from "../../types/api";
import Message from "../../Components/Message";
import Form from "../../Components/Form";
import Input from "../../Components/Input";

const Container = styled.div``;

const Chat = styled.div`
  height: 80vh;
  overflow: scroll;
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const InputCont = styled.div`
  padding: 0 20px;
`;

interface IMessage {
  value: string | null;
  onChange: React.ChangeEventHandler;
  setValue: React.Dispatch<React.SetStateAction<string | null>>;
}

interface IProps {
  chatLoading: boolean;
  chatData?: getChat;
  userData?: userProfile;
  messageInput: IMessage;
  onSubmit: () => Promise<void>;
}

const ChatPresenter: React.FC<IProps> = ({
  chatLoading,
  chatData: { GetChat: { chat = null } = {} } = {},
  userData: { GetMyProfile: { user = null } = {} } = {},
  messageInput,
  onSubmit
}) => (
  <Container>
    <Header title={"Chat"} />
    {!chatLoading && chat && user && (
      <>
        <Chat>
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
        </Chat>
        <InputCont>
          <Form submitFn={onSubmit} changeEmpty={messageInput.setValue}>
            <Input
              value={messageInput.value ? messageInput.value : ""}
              placeholder={"Type your message"}
              onChange={messageInput.onChange}
              name={"message"}
            />
          </Form>
        </InputCont>
      </>
    )}
  </Container>
);

export default ChatPresenter;
