import { useEffect, useState } from "react";
import { KeyValue } from "../../constants/KeyValue";
import CheckboxInput from "./CheckboxInput";

interface CheckboxInputListOnChangeEvent {
  value: string[];
}

interface CheckboxInputListProps {
  elements: KeyValue[];
  onChange?: (event: CheckboxInputListOnChangeEvent) => void;
}

function CheckboxInputList({ elements, onChange }: CheckboxInputListProps) {
  const [checkedState, setCheckedState] = useState<string[]>([]);

  const handleOnChange = (key: string, checked: boolean) => {
    let newState = Array.from(checkedState);
    if (checked) {
      newState.push(key);
    } else {
      newState = newState.filter((a) => a !== key);
    }
    setCheckedState(newState);
    onChange?.({ value: newState });
  };

  return (
    <>
      {elements.map(({ key, value }, index) => {
        return (
          <CheckboxInput
            id={key}
            label={value}
            onChange={(checked) => handleOnChange(key, checked)}
          />
        );
      })}
    </>
  );
}

export default CheckboxInputList;
