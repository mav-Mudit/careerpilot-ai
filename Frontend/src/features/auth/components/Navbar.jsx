import { useNavigate, Link } from "react-router";
import { useAuth } from "../hooks/useAuth";

const Navbar = () => {
  const { handleLogout } = useAuth();
  const navigate = useNavigate();

  const onLogout = async () => {
    await handleLogout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <span className="navbar__brand">CareerPilot AI 🚀</span>
      <Link to="/" className="navbar__center">
        + Generate New Report
      </Link>
      <button onClick={onLogout} className="button primary-button">
        Logout
      </button>
    </nav>
  );
};

export default Navbar;
