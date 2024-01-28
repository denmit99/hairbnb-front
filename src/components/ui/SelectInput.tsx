import { FC } from "react";

interface SelectInputProps {
  options: string[];
}

export default function SelectInput({ options }: SelectInputProps) {
  return (
    <select className="select-input input">
      {options.map((o) => {
        return <option value="volvo">{o}</option>;
      })}
    </select>
  );
}
