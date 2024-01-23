import ConfirmButton from "../ConfirmButon";
import PersonIcon from "@mui/icons-material/Person";
import MenuIcon from "@mui/icons-material/Menu";
import "./Navbar.css";

export default function Navbar() {
  return (
    <nav className="nav-bar">
      <p className="hairbnb-title">hairbnb</p>
      <div className="user-button" onClick={() => console.log("click")}>
        <MenuIcon></MenuIcon>
        <PersonIcon className="profile-pic"></PersonIcon>
      </div>
    </nav>
  );
}
