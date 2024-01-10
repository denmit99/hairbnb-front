import { useState } from "react";
import ConfirmButton from "./ConfirmButon";
import "./RegLog.css";

interface Props {
  toggleFunction: () => void;
}

function RegistrationBox({ toggleFunction }: Props) {
  const emailRegex = "/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i;";
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    passwordTwo: "",
    isHost: false,
  });

  return (
    <div className="registration-page">
      <div className="reglog-box">
        <p className="reglog-title">Welcome to HairBnb</p>
        <input
          className="reglog-input"
          placeholder="E-mail"
          onChange={(e) => {
            setFormData({ ...formData, ["email"]: e.target.value });
          }}
        />

        <input
          type="password"
          className="reglog-input"
          placeholder="Password"
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
        <ConfirmButton onClick={() => console.log(formData)}>
          Register
        </ConfirmButton>
        <p>
          Already have an account?{" "}
          <a onClick={toggleFunction} href="#">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}

export default RegistrationBox;
