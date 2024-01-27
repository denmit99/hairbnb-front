import { useEffect, useState } from "react";
import ConfirmButton from "./ConfirmButon";
import "./RegLog.css";
import axios from "../api/axios";
import { AxiosError } from "axios";
import TextInput from "./TextInput";
import { Link, Navigate } from "react-router-dom";
import { EmailUtil } from "../util/EmailUtil";
import { useCookies } from "react-cookie";
import useAuth from "../api/useAuth";

// https://www.youtube.com/watch?v=X3qyxo_UTR4

const REGISTER_URL = "/auth/register";

function RegistrationPage() {
  const [cookies, setCookie] = useCookies(["jwt-auth"]);
  const { login } = useAuth();
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
          password: formData.password,
          role: formData.isHost ? "HOST" : "USER",
        }),
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log(
        `Response ${JSON.stringify(response.data)}, Status: ${response.status}`
      );

      login(response.data.token);
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
          <p className="reglog-title">Welcome to HairBnb</p>
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
          <ConfirmButton disabled={!isFormValid} onClick={submitFrom}>
            Register
          </ConfirmButton>
          <p>
            Already have an account?
            {/* TODO use react ROUTER */}
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
