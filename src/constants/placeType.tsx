import { KeyValue } from "./KeyValue";

export const placeType: KeyValue[] = [
  { key: "ENTIRE_PLACE", value: "Entire place" },
  { key: "PRIVATE_ROOM", value: "Private room" },
  { key: "SHARED_ROOM", value: "Shared room" },
];

export enum PlaceType {
  ENTIRE_PLACE = "ENTIRE_PLACE",
  PRIVATE_ROOM = "PRIVATE_ROOM",
  SHARED_ROOM = "SHARED_ROOM",
}
