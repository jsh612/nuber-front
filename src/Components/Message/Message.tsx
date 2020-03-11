import React from "react";
import styled from "styled-components";

const Container = styled.div<{ mine: boolean }>``;

interface IProps {
  mine: boolean;
  text: string;
}

const Message: React.FC<IProps> = ({ text, mine }) => {
  return <Container mine={mine}>{text}</Container>;
};

export default Message;
