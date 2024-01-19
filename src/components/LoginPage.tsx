import { useEffect, useState } from "react";
import ConfirmButton from "./ConfirmButon";
import "./RegLog.css";
import { Link } from "react-router-dom";
import TextInput from "./TextInput";
import { EmailUtil } from "../util/EmailUtil";
import axios from "../api/axios";
import { AxiosError } from "axios";

const LOGIN_URL = "/auth/login";

function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (!formData.email) {
      setIsValidEmail(true);
    } else setIsValidEmail(EmailUtil.isValid(formData.email));
  }, [formData.email]);

  const submitFrom = async () => {
    console.log(formData);
    try {
      var response = await axios.post(
        LOGIN_URL,
        JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log(
        `Response ${JSON.stringify(response.data)}, Status: ${response.status}`
      );
    } catch (error) {
      const err = error as AxiosError;
      console.log(err.response?.data);
      //TODO use message from response body
      if (!err?.response) {
        setErrorMsg("No Server Response");
      } else if (err.response?.status === 404) {
        setErrorMsg("Not found");
      } else if (err.response?.status === 400) {
        setErrorMsg("Bad Request");
      } else {
        setErrorMsg("Login Failed");
      }
    }
  };

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
          onChange={(e) =>
            setFormData({ ...formData, ["password"]: e.target.value })
          }
        />
        <ConfirmButton disabled={!isValidEmail} onClick={submitFrom}>
          Login
        </ConfirmButton>
        <p>
          Don't have an account?
          <Link to={"/register"}>Register</Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
