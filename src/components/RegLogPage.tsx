import { useState } from "react";
import LoginBox from "./LoginBox";
import RegistrationBox from "./RegistrationBox";

function RegLogPage() {
  const [isLogin, setIsLogin] = useState(true);
  const toggleFunction = () => {
    setIsLogin(!isLogin);
  };

  if (isLogin) {
    return <LoginBox toggleFunction={toggleFunction}></LoginBox>;
  } else {
    return <RegistrationBox toggleFunction={toggleFunction}></RegistrationBox>;
  }
}

export default RegLogPage;
