import { ReactNode } from "react";
import "./LabeledInput.css";

interface LabeledInputProps {
  label: string;
  element: ReactNode;
}

export default function LabeledInput({ label, element }: LabeledInputProps) {
  return (
    <div className="labeled-input-container">
      <p className="labeled-input-container-label">{label}</p>
      {element}
    </div>
  );
}
