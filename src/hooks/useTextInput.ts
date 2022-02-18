import { ChangeEventHandler, useState } from "react";

export const useTextInput = (
  initValue = ""
): [
  { value: string; onChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> },
  () => void
] => {
  const [value, setValue] = useState(initValue);
  const onChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (e) => {
    setValue(e.target.value);
  };
  const reset = (resetValue = "") => setValue(resetValue);
  return [{ value, onChange }, reset];
};
