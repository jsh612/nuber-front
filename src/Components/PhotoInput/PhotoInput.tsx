import React from "react";
import styled from "styled-components";

const Container = styled.div``;

const Image = styled.label`
  cursor: pointer;
  height: 80px;
  width: 80px;
  border: 2px solid black;
  display: block;
  border-radius: 50%;
  margin-bottom: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  overflow: hidden;
  & img {
    width: 80px;
    height: 80px;
  }
`;

const Input = styled.input`
  color: white;
  opacity: 0;
  height: 1px;
  &:focus {
    outline: none;
  }
`;

interface IProps {
  uploading: boolean;
  fileUrl: string;
  onChange: React.ChangeEventHandler;
}

const PhotoInput: React.FC<IProps> = ({ uploading, fileUrl, onChange }) => {
  console.log("fileUrl::", fileUrl);
  return (
    <Container>
      <Input id={"photo"} type="file" accept="image/*" onChange={onChange} />
      <Image htmlFor="photo">
        {uploading && "⏰"}
        {!uploading && <img src={fileUrl} alt="이미지" />}
      </Image>
    </Container>
  );
};

export default PhotoInput;
