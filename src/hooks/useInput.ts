import React, { useState } from "react";

export default (defaultValue: string) => {
  const [value, setValue] = useState<string>(defaultValue);

  const onChange: React.ChangeEventHandler<
    HTMLInputElement | HTMLSelectElement
  > = event => {
    const {
      target: { value }
    } = event;
    setValue(value);
  };
  return { value, onChange, setValue };
};
