import { useState } from "react";
import BedroomBox from "../ui/BedroomBox";
import BedroomList from "../ui/BedroomList";
import LabeledInput from "../ui/LabeledInput";
import NumberButtonInput from "../ui/NumberButtonInput";
import SelectInput from "../ui/SelectInput";
import TextInput from "../ui/TextInput";
import CheckboxInput from "../ui/CheckboxInput";
import ConfirmButton from "../ui/ConfirmButon";
import TextAreaInput from "../ui/TextAreaInput";

const AMENITIES = [
  "Wi-Fi",
  "Washing machine",
  "Air conditioning",
  "TV",
  "Hair dryer",
];

export default function ListingsCreatePage() {
  const [bedroomsNum, setBedroomsNum] = useState(0);

  return (
    <div className="reglog-box">
      <LabeledInput
        label="Enter property name"
        element={<TextInput placeholder="Title" />}
      />
      <LabeledInput
        label="Address"
        element={<TextInput placeholder="Address" />}
      />
      <LabeledInput
        label="Description"
        element={
          <TextAreaInput
            placeholder="Enter your description here..."
            maxLength={500}
          />
        }
      />
      <LabeledInput
        label="Price per night"
        element={<TextInput placeholder="Price per night" />}
      />
      <LabeledInput
        label="Currency"
        element={<SelectInput options={["EUR", "USD"]} />}
      />
      <LabeledInput
        label="Property type"
        element={
          <SelectInput
            options={["Apartment", "House", "Unique Space", "Secondary Unit"]}
          />
        }
      />
      <LabeledInput
        label="Place type"
        element={
          <SelectInput
            options={["Entire place", "Private room", "Shared room"]}
          />
        }
      />
      <LabeledInput
        label="Number of guests"
        element={<NumberButtonInput label="Guests" initialValue={0} />}
      />
      <LabeledInput
        label="Number of bathrooms"
        element={<NumberButtonInput label="Bathrooms" initialValue={0} />}
      />
      <LabeledInput
        label="Number of bedrooms"
        element={
          <NumberButtonInput
            label="Bedrooms"
            initialValue={0}
            maxValue={25}
            onChange={(v) => {
              setBedroomsNum(v);
            }}
          />
        }
      />
      <BedroomList num={bedroomsNum} />
      <LabeledInput
        label="Amenities"
        element={
          <>
            {AMENITIES.map((a) => (
              <CheckboxInput label={a} />
            ))}
          </>
        }
      />
      <ConfirmButton onClick={() => {}}>Create</ConfirmButton>
    </div>
  );
}
