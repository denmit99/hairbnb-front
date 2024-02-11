import React, { useState } from "react";
import BedroomList from "../ui/BedroomList";
import LabeledInput from "../ui/LabeledInput";
import NumberButtonInput from "../ui/NumberButtonInput";
import SelectInput from "../ui/SelectInput";
import TextInput from "../ui/TextInput";
import ConfirmButton from "../ui/ConfirmButon";
import TextAreaInput from "../ui/TextAreaInput";
import "./BasicForm.css";
import "./RegLog.css";
import FormTitle from "../ui/FormTitle";
import axiosInstance from "../../api/axios";
import { amenities } from "../../constants/amenities";
import { currency } from "../../constants/currency";
import { placeType } from "../../constants/placeType";
import { propertyType } from "../../constants/propertyType";
import CheckboxInputList from "../ui/CheckboxInputList";
import { BedroomArrangement } from "../ui/BedroomBox";

const AMENITIES = amenities;
const CURRENCIES = currency;
const PLACE_TYPES = placeType;
const PROPERTY_TYPES = propertyType;
const CREATE_LISTING_URL = "/host/listings";
const UPLOAD_LISTING_IMAGE_URL = "/host/image/upload";

interface ListingCreatePageFormState {
  title: string;
  address: string;
  description: string;
  price: number;
  currency: string;
  propertyType: string;
  placeType: string;
  guests: number;
  bathrooms: number;
  bedrooms: number;
  bedroomArrangement: BedroomArrangement[];
  amenities: string[];
}

export default function ListingsCreatePage() {
  const [bedroomsNum, setBedroomsNum] = useState(0);
  const [file, setFile] = useState<File | undefined>();
  const [formData, setFormData] = useState<ListingCreatePageFormState>({
    title: "",
    address: "",
    description: "",
    price: 0,
    currency: CURRENCIES[0].key,
    propertyType: PROPERTY_TYPES[0].key,
    placeType: PLACE_TYPES[0].key,
    guests: 0,
    bathrooms: 0,
    bedrooms: 0,
    bedroomArrangement: [],
    amenities: [],
  });

  const onUpload = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement & {
      files: FileList;
    };
    setFile(target.files[0]);
  };

  const uploadImage = async () => {
    console.log("upload triggered");
    if (typeof file === "undefined") {
      console.log("undefined");
      return;
    }

    const fd = new FormData();
    fd.append("file", file);
    try {
      var resp = await axiosInstance.post(UPLOAD_LISTING_IMAGE_URL, fd);
      console.log(resp);
    } catch (error) {
      console.log("error while uploading file");
    }
  };

  const submitFrom = async () => {
    try {
      var response = await axiosInstance.post(
        CREATE_LISTING_URL,
        JSON.stringify({
          title: formData.title,
          description: formData.description,
          pricePerNight: formData.price,
          address: {
            country: "",
            city: "",
            street: formData.address,
            zipCode: "",
          },
          bedrooms: formData.bedroomArrangement.map((b) => {
            return {
              doubleNum: b.double,
              singleNum: b.single,
              queenNum: b.queen,
              sofaNum: b.sofa,
            };
          }),
          currency: formData.currency,
          propertyType: formData.propertyType,
          placeType: formData.placeType,
          maxGuests: formData.guests,
          numberOfBathrooms: formData.bathrooms,
          amenities: formData.amenities,
        })
      );
      // setSuccess(true);
    } catch (error) {}
  };

  return (
    <div className="registration-page">
      <div className="basic-form-container">
        <FormTitle>Create new listing</FormTitle>
        <div className="basic-form-box-wide">
          <LabeledInput
            label="Upload image"
            element={
              <>
                <input
                  type="file"
                  onChange={(e) => {
                    onUpload(e);
                  }}
                />
                <button onClick={uploadImage}>Upload</button>
              </>
            }
          />
          <LabeledInput
            label="Enter property name"
            element={
              <TextInput
                placeholder="Title"
                onChange={(e) => {
                  setFormData({ ...formData, ["title"]: e.target.value });
                }}
              />
            }
          />
          <LabeledInput
            label="Address"
            element={
              <TextInput
                placeholder="Address"
                onChange={(e) => {
                  setFormData({ ...formData, ["address"]: e.target.value });
                }}
              />
            }
          />
          <LabeledInput
            label="Description"
            element={
              <TextAreaInput
                placeholder="Enter your description here..."
                maxLength={500}
                onChange={(e) => {
                  setFormData({ ...formData, ["description"]: e.target.value });
                }}
              />
            }
          />
          <div>
            <LabeledInput
              label="Price per night"
              element={
                <TextInput
                  placeholder="Price per night"
                  onChange={(e) => {
                    setFormData({ ...formData, ["price"]: e.target.value });
                  }}
                />
              }
            />
            <LabeledInput
              label="Currency"
              element={
                <SelectInput
                  options={CURRENCIES}
                  onChange={(e) => {
                    setFormData({ ...formData, ["currency"]: e.target.value });
                  }}
                />
              }
            />
          </div>
          <LabeledInput
            label="Property type"
            element={
              <SelectInput
                options={PROPERTY_TYPES}
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    ["propertyType"]: e.target.value,
                  });
                }}
              />
            }
          />
          <LabeledInput
            label="Place type"
            element={
              <SelectInput
                options={PLACE_TYPES}
                onChange={(e) => {
                  setFormData({ ...formData, ["placeType"]: e.target.value });
                }}
              />
            }
          />
          <LabeledInput
            label="Number of guests"
            element={
              <NumberButtonInput
                label="Guests"
                initialValue={0}
                onChange={(num) => {
                  setFormData({ ...formData, ["guests"]: num });
                }}
              />
            }
          />
          <LabeledInput
            label="Number of bathrooms"
            element={
              <NumberButtonInput
                label="Bathrooms"
                initialValue={0}
                onChange={(num) => {
                  setFormData({ ...formData, ["bathrooms"]: num });
                }}
              />
            }
          />
          <div>
            <LabeledInput
              label="Number of bedrooms"
              element={
                <NumberButtonInput
                  label="Bedrooms"
                  initialValue={0}
                  maxValue={25}
                  onChange={(num) => {
                    setFormData({ ...formData, ["bedrooms"]: num });
                    setBedroomsNum(num);
                  }}
                />
              }
            />
            <BedroomList
              num={bedroomsNum}
              onChange={(bedrooms) =>
                setFormData({ ...formData, ["bedroomArrangement"]: bedrooms })
              }
            />
          </div>
          <LabeledInput
            label="Amenities"
            element={
              <CheckboxInputList
                elements={AMENITIES}
                onChange={(e) => {
                  setFormData({ ...formData, ["amenities"]: e.value });
                }}
              />
            }
          />
        </div>
        <ConfirmButton
          onClick={() => {
            submitFrom();
            console.log(JSON.stringify(formData));
          }}
        >
          Create
        </ConfirmButton>
      </div>
    </div>
  );
}
