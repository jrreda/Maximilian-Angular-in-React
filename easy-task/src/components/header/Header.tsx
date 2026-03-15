import LogoImage from "../../assets/task-management-logo.png";
import "./Header.css";

function Header() {
  return (
    <header>
      <img src={LogoImage} alt="Task Management Logo" />
      <h1>Easy Task</h1>
      <p>Task Management System</p>
    </header>
  );
}

export default Header;
