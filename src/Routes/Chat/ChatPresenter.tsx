import React from "react";
import Header from "../../Components/Header";
import styled from "styled-components";

const Container = styled.div``;

const ChatPresenter: React.FC = () => (
  <Container>
    <Header title={"Chat"} />
  </Container>
);

export default ChatPresenter;
