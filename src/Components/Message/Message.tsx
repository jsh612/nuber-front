import React from "react";
import styled from "styled-components";
import { TTheme } from "../../theme";

interface ISProps {
  theme: TTheme;
  mine: boolean;
}

const Container = styled.div`
  background-color: ${(props: ISProps) =>
    props.mine ? props.theme.blueColor : props.theme.greyColor};
  color: white;
  padding: 10px 20px;
  border-radius: 20px;
  align-self: ${(props: ISProps) => (props.mine ? "flex-end" : "flex-start")};
  border-bottom-right-radius: ${props => (props.mine ? "0px" : "20px")};
  border-bottom-left-radius: ${props => (!props.mine ? "0px" : "20px")};
`;

interface IProps {
  mine: boolean;
  text: string;
}

const Message: React.FC<IProps> = ({ text, mine }) => {
  return <Container mine={mine}>{text}</Container>;
};

export default Message;
