import { useState } from "react";
import ConfirmButton from "./ConfirmButon";
import "./RegistrationBox.css";

interface Props {
  toggleFunction: () => void;
}

function LoginBox({ toggleFunction }: Props) {
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
        {/* 
        <label>
          <input type="checkbox" />
          Remember Me
        </label> */}

        <ConfirmButton onClick={onClick}>Login</ConfirmButton>
        <p>
          Don't have an account?{" "}
          <a onClick={toggleFunction} href="#">
            Register
          </a>
        </p>
      </div>
    </div>
  );
}

export default LoginBox;
