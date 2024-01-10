import { useState } from "react";
import ConfirmButton from "./ConfirmButon";
import "./RegistrationBox.css";

interface Props {
  toggleFunction: () => void;
}

function RegistrationBox({ toggleFunction }: Props) {
  const [email, setEmail] = useState("");
  const onClick = () => {};

  return (
    <div className="registration-page">
      <div className="reglog-box">
        <p className="title">Welcome to HairBnb</p>
        <input className="reglog-input" placeholder="E-mail" />
        <input
          onChange={(event) => setEmail(event.currentTarget.value)}
          type="password"
          className="reglog-input"
          placeholder="Password"
        />
        <input
          type="password"
          className="reglog-input"
          placeholder="Repeat Password"
        />
        <div className="is-host">
          <input type="checkbox" />
          <label>Host</label>
        </div>

        <ConfirmButton onClick={onClick}>Register</ConfirmButton>
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
