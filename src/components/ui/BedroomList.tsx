import BedroomBox from "./BedroomBox";
import "./BedroomList.css";

interface BedroomListProps {
  num: number;
}

export default function BedroomList({ num }: BedroomListProps) {
  return (
    <div className="bedroom-list">
      {Array.from({ length: num }, (_, index) => (
        <BedroomBox number={index + 1}></BedroomBox>
      ))}
    </div>
  );
}
