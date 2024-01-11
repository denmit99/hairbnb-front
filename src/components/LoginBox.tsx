import { useState } from "react";
import ConfirmButton from "./ConfirmButon";
import "./RegLog.css";

interface Props {
  toggleFunction: () => void;
}

function LoginBox({ toggleFunction }: Props) {
  const [email, setEmail] = useState("");
  const onClick = () => {};

  return (
    <div className="registration-page">
      <div className="reglog-box">
        <p className="reglog-title">Welcome to HairBnb</p>
        <input className="reglog-input" placeholder="E-mail" />
        <input
          onChange={(event) => setEmail(event.currentTarget.value)}
          type="password"
          className="reglog-input"
          placeholder="Password"
        />
        <ConfirmButton onClick={onClick}>Login</ConfirmButton>
        <p>
          Don't have an account? {/* TODO use react ROUTER */}
          <a onClick={toggleFunction} href="#">
            Register
          </a>
        </p>
      </div>
    </div>
  );
}

export default LoginBox;
