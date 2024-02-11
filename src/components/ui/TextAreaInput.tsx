import { useState } from "react";
import "./TextAreaInput.css";

interface TextAreaInputProps {
  placeholder?: string;
  maxLength?: number;
  onChange?: (event: any) => void;
}

const MAX_LENGTH = 1000;

export default function TextAreaInput({
  placeholder,
  maxLength,
  onChange,
}: TextAreaInputProps) {
  const [symbolCount, setSymbolCount] = useState(0);
  return (
    <div className="textarea-container">
      <textarea
        placeholder={placeholder ?? ""}
        className="textarea"
        maxLength={maxLength ?? MAX_LENGTH}
        onChange={(e) => {
          onChange?.(e);
          setSymbolCount(e.target.value.length);
        }}
      />
      <span className="symbol-counter">{`${symbolCount}/${
        maxLength ?? MAX_LENGTH
      }`}</span>
    </div>
  );
}
