import React from "react";
import styled from "styled-components";

const Input = styled.input`
  position: absolute;
  background-color: white;
  border-radius: 5px;
  -webkit-appearance: none;
  z-index: 2;
  width: 80%;
  border: 0;
  font-size: 16px;
  padding: 15px 10px;
  box-shadow: 0 18px 35px rgba(50, 50, 93, 0.1), 0 8px 15px rgba(0, 0, 0, 0.07);
  margin: auto;
  top: 50px;
  left: 0;
  right: 0;
  height: auto;
`;

interface IProps {
  value: string;
  onBlur: () => void;
  name: string;
  onChange: React.ChangeEventHandler;
}

const AddressBar: React.FC<IProps> = ({ value, onBlur, onChange, name }) => {
  // onBlur : 해당 input 태그가 focus out 되었을 떄 실행되는 이벤트
  const submitHandler: React.FormEventHandler = e => {
    // The onsubmit event occurs when a form is submitted.
    // (입력란 작성후 엔터 누를시 제출됨)
    e.preventDefault();
    onBlur();
  };
  return (
    <form onSubmit={submitHandler}>
      <Input
        value={value}
        onBlur={onBlur}
        onChange={onChange}
        placeholder={"Type address"}
        name={name}
      />
    </form>
  );
};

export default AddressBar;
