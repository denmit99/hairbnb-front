import { useContext, useEffect, useState } from "react";
import ConfirmButton from "../ui/ConfirmButon";
import "./RegLog.css";
import axiosInstance from "../../api/axios";
import { AxiosError } from "axios";
import TextInput from "../ui/TextInput";
import { Link, Navigate } from "react-router-dom";
import { EmailUtil } from "../../util/EmailUtil";
import FormTitle from "../ui/FormTitle";
import { AuthContext, AuthContextType } from "../../context/AuthContext";

// https://www.youtube.com/watch?v=X3qyxo_UTR4

const REGISTER_URL = "/auth/register";

function RegistrationPage() {
  const { setUser } = useContext(AuthContext) as AuthContextType;
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    passwordTwo: "",
    isHost: false,
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [isFormValid, setisFormValid] = useState(true);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!formData.email) {
      setIsValidEmail(true);
    } else setIsValidEmail(EmailUtil.isValid(formData.email));
  }, [formData.email]);

  useEffect(() => {
    setPasswordMatch(formData.password === formData.passwordTwo);
  }, [formData.password, formData.passwordTwo]);

  useEffect(() => {
    const isValid =
      formData.email.trim().length !== 0 &&
      formData.firstName.trim().length !== 0 &&
      formData.lastName.trim().length !== 0 &&
      formData.password.trim().length !== 0 &&
      formData.passwordTwo.trim().length !== 0 &&
      isValidEmail &&
      passwordMatch;
    setisFormValid(isValid);
  }, [isValidEmail, passwordMatch, formData]);

  useEffect(() => {
    setErrorMsg("");
  }, [formData]);

  const submitFrom = async () => {
    try {
      var response = await axiosInstance.post(
        REGISTER_URL,
        JSON.stringify({
          email: formData.email,
          firstName: formData.firstName,
          lastName: formData.lastName,
          password: formData.password,
          role: formData.isHost ? "HOST" : "USER",
        }),
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      setUser(response.data.token);
      setSuccess(true);
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

  if (!success) {
    return (
      <div className="registration-page">
        <div className="reglog-box">
          <FormTitle>Welcome to HairBnb</FormTitle>
          <p className="error-message">{errorMsg ? errorMsg : <></>}</p>
          <TextInput
            placeholder="E-mail"
            errorMsg={isValidEmail ? "" : "E-mail is not valid"}
            invalid={!isValidEmail}
            onChange={(e) => {
              setFormData({ ...formData, ["email"]: e.target.value });
            }}
          />
          <TextInput
            placeholder="First Name"
            onChange={(e) => {
              setFormData({ ...formData, ["firstName"]: e.target.value });
            }}
          />
          <TextInput
            placeholder="Last Name"
            onChange={(e) => {
              setFormData({ ...formData, ["lastName"]: e.target.value });
            }}
          />
          <TextInput
            placeholder="Password"
            type="password"
            errorMsg={passwordMatch ? "" : "Passwords don't match"}
            onChange={(e) =>
              setFormData({ ...formData, ["password"]: e.target.value })
            }
            invalid={!passwordMatch}
          />
          <TextInput
            placeholder="Repeat Password"
            type="password"
            onChange={(e) =>
              setFormData({ ...formData, ["passwordTwo"]: e.target.value })
            }
            invalid={!passwordMatch}
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
          <ConfirmButton wide disabled={!isFormValid} onClick={submitFrom}>
            Register
          </ConfirmButton>
          <p>
            Already have an account?
            <Link to={"/login"}>Login</Link>
          </p>
        </div>
      </div>
    );
  } else {
    return <Navigate to={"/"}></Navigate>;
  }
}

export default RegistrationPage;
