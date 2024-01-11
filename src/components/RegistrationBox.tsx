import { useEffect, useState } from "react";
import ConfirmButton from "./ConfirmButon";
import "./RegLog.css";
import axios from "../api/axios";
import { AxiosError } from "axios";

interface Props {
  toggleFunction: () => void;
}

const REGISTER_URL = "/auth/register";
const EMAIL_REGEX =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

function RegistrationBox({ toggleFunction }: Props) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    passwordTwo: "",
    isHost: false,
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [isFormValid, setisFormValid] = useState(true);

  useEffect(() => {
    if (!formData.email) {
      setIsValidEmail(true);
    } else setIsValidEmail(EMAIL_REGEX.test(formData.email));
  }, [formData.email]);

  useEffect(() => {
    setPasswordMatch(formData.password === formData.passwordTwo);
  }, [formData.password, formData.passwordTwo]);

  useEffect(() => {
    const isValid =
      formData.email.trim().length !== 0 && isValidEmail && passwordMatch;
    setisFormValid(isValid);
  }, [isValidEmail, passwordMatch, formData]);

  useEffect(() => {
    setErrorMsg("");
  }, [formData]);

  const submitFrom = async () => {
    console.log(formData);
    try {
      var response = await axios.post(
        REGISTER_URL,
        JSON.stringify({
          email: formData.email,
          firstName: "default first name",
          lastName: "Default last name",
          password: formData.password,
          role: formData.isHost ? "HOST" : "USER",
        }),
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log(response.data);
      console.log(response.status);
    } catch (error) {
      const err = error as AxiosError;
      console.log(err.response?.data);
      if (!err?.response) {
        setErrorMsg("No Server Response");
      } else if (err.response?.status === 409) {
        setErrorMsg("E-mail is already taken");
      } else if (err.response?.status === 400) {
        setErrorMsg("Bad Request");
      } else {
        setErrorMsg("Registration Failed");
      }
    }
  };

  return (
    <div className="registration-page">
      <div className="reglog-box">
        <p className="reglog-title">Welcome to HairBnb</p>
        <p className="error-message">{errorMsg ? errorMsg : <></>}</p>
        <p className="error-message">
          {isValidEmail ? <></> : "E-mail is not valid"}
        </p>
        <input
          className="reglog-input"
          placeholder="E-mail"
          onChange={(e) => {
            setFormData({ ...formData, ["email"]: e.target.value });
          }}
        />
        <p className="error-message">
          {passwordMatch ? <></> : "Passwords don't match"}
        </p>
        <input
          type="password"
          className="reglog-input"
          placeholder="Password"
          style={
            passwordMatch
              ? {}
              : { borderColor: "red", backgroundColor: "rgb(255, 164, 164)" }
          }
          onChange={(e) =>
            setFormData({ ...formData, ["password"]: e.target.value })
          }
        />
        <input
          type="password"
          className="reglog-input"
          placeholder="Repeat Password"
          onChange={(e) =>
            setFormData({ ...formData, ["passwordTwo"]: e.target.value })
          }
        />
        <div className="is-host labeled-checkbox">
          <input
            type="checkbox"
            onChange={(e) =>
              setFormData({ ...formData, ["isHost"]: e.target.checked })
            }
          />
          <label>Host</label>
        </div>
        <ConfirmButton disabled={!isFormValid} onClick={submitFrom}>
          Register
        </ConfirmButton>
        <p>
          Already have an account?
          {/* TODO use react ROUTER */}
          <a onClick={toggleFunction} href="#">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}

export default RegistrationBox;
