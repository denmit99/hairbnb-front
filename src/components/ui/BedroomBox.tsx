import NumberButtonInput from "./NumberButtonInput";
import "./BedroomBox.css";
import { useEffect, useState } from "react";

interface BedroomBoxProps {
  number: number;
}

export default function BedroomBox({ number }: BedroomBoxProps) {
  console.log("inside");
  const [open, setOpen] = useState(false);
  const [beds, setBeds] = useState({
    sofa: 0,
    queen: 0,
    single: 0,
    double: 0,
  });
  const [bedsText, setBedsText] = useState("0 beds");
  const calculateBeds = () => {
    if (
      beds.sofa === 0 &&
      beds.queen === 0 &&
      beds.single === 0 &&
      beds.sofa === 0
    ) {
      return "0 beds";
    }
    let bedsArray: string[] = [];

    if (beds.single > 0) {
      bedsArray.push(bedNumToString(beds.single, ""));
    }
    if (beds.double > 0) {
      bedsArray.push(bedNumToString(beds.double, "double"));
    }
    if (beds.queen > 0) {
      bedsArray.push(bedNumToString(beds.queen, "queen"));
    }
    if (beds.sofa > 0) {
      bedsArray.push(bedNumToString(beds.sofa, "sofa"));
    }

    return bedsArray.join(" / ");
  };

  const bedNumToString = (num: number, bedType: string) => {
    return `${num}${bedType === "single" ? "" : " "}${bedType} bed${
      num > 1 ? "s" : ""
    }`;
  };

  useEffect(() => {
    console.log(JSON.stringify(beds));
    setBedsText(calculateBeds());
  }, [beds]);

  return (
    <div className="bedroom-box">
      <div className="bedroom-box-header">
        <div className="bedroom-box-header-left">
          <span className="bedroom-title">Bedroom {number}</span>
          <span className="bed-sum">{bedsText}</span>
        </div>
        <button
          className="bedroom-box-header-button"
          onClick={() => setOpen(!open)}
        >
          {open ? "Done" : "Edit"}
        </button>
      </div>
      {open ? (
        <>
          <NumberButtonInput
            label="Queen"
            initialValue={beds.queen}
            maxValue={25}
            onChange={(v) => setBeds({ ...beds, ["queen"]: v })}
          />
          <NumberButtonInput
            label="Single"
            initialValue={beds.single}
            maxValue={25}
            onChange={(v) => setBeds({ ...beds, ["single"]: v })}
          />
          <NumberButtonInput
            label="Double"
            initialValue={beds.double}
            maxValue={25}
            onChange={(v) => setBeds({ ...beds, ["double"]: v })}
          />
          <NumberButtonInput
            label="Sofa bed"
            initialValue={beds.sofa}
            maxValue={25}
            onChange={(v) => setBeds({ ...beds, ["sofa"]: v })}
          />
        </>
      ) : (
        <></>
      )}
    </div>
  );
}
