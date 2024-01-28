import { useEffect, useState } from "react";
import "./NumberButtonInput.css";

interface NumberButtonInputProps {
  label: string;
  step?: number;
  initialValue?: number;
  maxValue?: number;
  onChange?: (value: number) => void;
}

const MIN_VALUE = 0;
const MAX_VALUE = 9999;

export default function NumberButtonInput({
  label,
  step,
  maxValue,
  initialValue,
  onChange,
}: NumberButtonInputProps) {
  //TODO what if initialValue is greater than maxValue

  if (initialValue && maxValue && initialValue > maxValue) {
    initialValue = maxValue;
  }
  const [value, setValue] = useState(initialValue ?? 0);

  const increment = () => {
    const max = maxValue ? Math.min(maxValue, MAX_VALUE) : MAX_VALUE;
    const stepSize = step ?? 1;
    const newValue = Math.min(value + stepSize, max);
    setValue(newValue);
    onChange?.(newValue);
  };

  const decrement = () => {
    const stepSize = step ?? 1;
    const newValue = Math.max(value - stepSize, MIN_VALUE);
    setValue(newValue);
    onChange?.(newValue);
  };

  return (
    <div className="number-button-input">
      <span className="number-button-input-label">{label}</span>
      <div className="number-button-input-container">
        <button className="number-button-input-button" onClick={decrement}>
          -
        </button>
        <span className="number-button-input-value">{value}</span>
        <button className="number-button-input-button" onClick={increment}>
          +
        </button>
      </div>
    </div>
  );
}
