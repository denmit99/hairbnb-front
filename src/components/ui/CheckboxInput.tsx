import "./CheckboxInput.css";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { useState } from "react";

interface CheckboxInputProps {
  label: string;
}

export default function CheckboxInput({ label }: CheckboxInputProps) {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <div className="checkbox-input">
      <div className="checkbox" onClick={() => setIsChecked(!isChecked)}>
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
