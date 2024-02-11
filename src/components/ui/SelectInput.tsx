import { FC } from "react";
import { KeyValue } from "../../constants/KeyValue";

interface SelectInputProps {
  options: KeyValue[];
  onChange?: (event: any) => void;
}

export default function SelectInput({ options, onChange }: SelectInputProps) {
  return (
    <select className="select-input input" onChange={onChange}>
      {options.map((o) => {
        return <option value={o.key}>{o.value}</option>;
      })}
    </select>
  );
}
