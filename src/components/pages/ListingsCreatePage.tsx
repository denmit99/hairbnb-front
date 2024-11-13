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
import "./UploadFile.css";
import FormTitle from "../ui/FormTitle";
import axiosInstance from "../../api/axios";
import { amenities } from "../../constants/amenities";
import { currency } from "../../constants/currency";
import { placeType } from "../../constants/placeType";
import { propertyType } from "../../constants/propertyType";
import CheckboxInputList from "../ui/CheckboxInputList";
import { BedroomArrangement } from "../ui/BedroomBox";
import { Axios, AxiosError } from "axios";
import { ErrorResponse, useNavigate } from "react-router-dom";

const AMENITIES = amenities;
const CURRENCIES = currency;
const PLACE_TYPES = placeType;
const PROPERTY_TYPES = propertyType;
const CREATE_LISTING_URL = "/host/listings";
const UPLOAD_LISTING_IMAGE_URL = "/host/image/upload";

interface ListingCreatePageFormState {
  title: string;
  country: string;
  city: string;
  street: string;
  houseNumber: string;
  zipCode: string;
  description: string;
  pricePerNight: number;
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
  const navigate = useNavigate();
  const [bedroomsNum, setBedroomsNum] = useState(0);
  const [file, setFile] = useState<File | undefined>();
  const [filePreview, setFilePreview] = useState<string | ArrayBuffer | null>(
    null
  );
  const [formData, setFormData] = useState<ListingCreatePageFormState>({
    title: "",
    country: "",
    city: "",
    street: "",
    houseNumber: "",
    zipCode: "",
    description: "",
    pricePerNight: 0,
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
    const fileReader = new FileReader();
    fileReader.onload = function () {
      setFilePreview(fileReader.result);
    };
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
          pricePerNight: formData.pricePerNight,
          address: {
            country: formData.country,
            city: formData.city,
            street: formData.street,
            houseNumber: formData.houseNumber,
            zipCode: formData.zipCode,
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
      navigate("/listings/my");
      // setSuccess(true);
    } catch (error: AxiosError<ErrorResponse> | unknown) {
      if (error instanceof AxiosError) console.log(error.response);
    }
  };

  return (
    <div className="registration-page">
      <div className="basic-form-container">
        <FormTitle>Create new listing</FormTitle>
        <div className="basic-form-box-wide">
          {/* <LabeledInput
            label="Upload image"
            element={
              <>
                <input
                  className="upload-file"
                  type="file"
                  accept="image/png, image/jpg"
                  onChange={(e) => {
                    onUpload(e);
                  }}
                />
                <button onClick={uploadImage}>Upload</button>
              </>
            }
          /> */}
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
              <>
                <TextInput
                  placeholder="Country"
                  onChange={(e) => {
                    setFormData({ ...formData, ["country"]: e.target.value });
                  }}
                />
                <TextInput
                  placeholder="City"
                  onChange={(e) => {
                    setFormData({ ...formData, ["city"]: e.target.value });
                  }}
                />
                <TextInput
                  placeholder="Street"
                  onChange={(e) => {
                    setFormData({ ...formData, ["street"]: e.target.value });
                  }}
                />
                <TextInput
                  placeholder="House number"
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      ["houseNumber"]: e.target.value,
                    });
                  }}
                />
                <TextInput
                  placeholder="Zip Code"
                  onChange={(e) => {
                    setFormData({ ...formData, ["zipCode"]: e.target.value });
                  }}
                />
              </>
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
                    setFormData({
                      ...formData,
                      ["pricePerNight"]: e.target.value,
                    });
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
