import React from "react";

interface IMessage {
  value: string | null;
  onChange: React.ChangeEventHandler;
  setValue: React.Dispatch<React.SetStateAction<string | null>>;
}

interface IProps {
  submitFn: any;
  className?: string;
  changeEmpty?: React.Dispatch<React.SetStateAction<string | null>>;
}

const Form: React.FC<IProps> = ({
  submitFn,
  className,
  children,
  changeEmpty
}) => (
  <form
    className={className}
    onSubmit={e => {
      e.preventDefault();
      submitFn();
      if (changeEmpty) {
        changeEmpty("");
      }
    }}
  >
    {children}
  </form>
);

export default Form;
