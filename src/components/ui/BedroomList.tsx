import { useState } from "react";
import BedroomBox, { BedroomArrangement } from "./BedroomBox";
import "./BedroomList.css";

interface BedroomListProps {
  num: number;
  onChange?: (bedrooms: BedroomArrangement[]) => void;
}

export default function BedroomList({ num, onChange }: BedroomListProps) {
  const [bedrooms, setBedrooms] = useState<BedroomArrangement[]>([]);

  const handleChange = (index: number, beds: BedroomArrangement) => {
    const newBedrooms = Array.from(bedrooms);
    newBedrooms[index] = beds;
    setBedrooms(newBedrooms);
    onChange?.(bedrooms);
  };

  return (
    <div className="bedroom-list">
      {Array.from({ length: num }, (_, index) => (
        <BedroomBox
          number={index + 1}
          onChange={(beds) => handleChange(index, beds)}
        ></BedroomBox>
      ))}
    </div>
  );
}
