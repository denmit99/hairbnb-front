import { KeyValue } from "./KeyValue";

export const propertyType: KeyValue[] = [
  { key: "APARTMENT", value: "Apartment" },
  { key: "HOUSE", value: "House" },
  { key: "UNIQUE_SPACE", value: "Unique Space" },
  { key: "SECONDARY_UNIT", value: "Secondary Unit" },
];

export enum PropertyType {
  APARTMENT = "APARTMENT",
  HOUSE = "HOUSE",
  SECONDARY_UNIT = "SECONDARY_UNIT",
  UNIQUE_SPACE = "UNIQUE_SPACE",
}
