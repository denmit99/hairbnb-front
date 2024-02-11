import "./CheckboxInput.css";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { useState } from "react";

interface CheckboxInputProps {
  id: any;
  label: string;
  checked?: boolean;
  onChange?: (isChecked: boolean) => void;
}

export default function CheckboxInput({
  label,
  id,
  checked,
  onChange,
}: CheckboxInputProps) {
  const defaultChecked = checked ? checked : false;
  const [isChecked, setIsChecked] = useState(defaultChecked);

  return (
    <div className="checkbox-input">
      <div
        id={id}
        className="checkbox"
        onClick={() => {
          onChange?.(!isChecked);
          setIsChecked(!isChecked);
        }}
      >
        {isChecked ? (
          <CheckBoxIcon fontSize="large" />
        ) : (
          <></>
          //   <CheckBoxOutlineBlankIcon fontSize="large" />
        )}
      </div>
      {/* <input type="checkbox" className="checkbox"></input> */}
      <span className="checkbox-label">{label}</span>
    </div>
  );
}
