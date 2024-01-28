import ConfirmButton from "../ui/ConfirmButon";
import PersonIcon from "@mui/icons-material/Person";
import MenuIcon from "@mui/icons-material/Menu";
import "./Navbar.css";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="nav-bar">
      <p className="hairbnb-title" onClick={() => {}}>
        hairbnb
      </p>
      <div className="user-button" onClick={() => console.log("click")}>
        <MenuIcon></MenuIcon>
        <PersonIcon className="profile-pic"></PersonIcon>
      </div>
    </nav>
  );
}
