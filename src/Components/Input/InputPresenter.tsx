import React from "react";
import styled from "styled-components";

const Input = styled.input`
  border: none;
  border-bottom: 2px solid ${props => props.theme.greyColor};
  font-size: 20px;
  width: 100%;
  padding-bottom: 10px;
  font-weight: 500;
  transition: border-bottom 0.1s linear;
  &:-webkit-autofill {
    box-shadow: 0 0 0px 1000px white inset !important;
  }
  &:focus {
    border-bottom-color: blue;
    outline: none;
  }
  &::placeholder {
    color: ${props => props.theme.greyColor};
    font-weight: 300;
  }
`;

interface IProps {
  placeholder?: string;
  type?: string;
  required?: boolean;
  value: string | undefined;
  name?: string;
  onChange: any;
  className?: string;
}

const InputPresenter: React.FC<IProps> = ({
  placeholder = "",
  type = "text",
  required = true,
  value,
  name = "",
  onChange,
  className
}) => (
  <Input
    type={type}
    required={required}
    value={value}
    placeholder={placeholder}
    name={name}
    onChange={onChange}
    className={className}
  />
);

export default InputPresenter;
