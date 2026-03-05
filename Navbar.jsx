import { Link } from "react-router-dom";
import { BookOpen, Upload, MessageCircle, History } from "lucide-react";

function Navbar() {
  return (
    <nav className="navbar">

      <h2 className="logo">
        <BookOpen size={28}/> Study Assistant
      </h2>

      <div className="nav-links">

        <Link to="/">
          <BookOpen size={18}/> Home
        </Link>

        <Link to="/upload">
          <Upload size={18}/> Upload
        </Link>

        <Link to="/ask">
          <MessageCircle size={18}/> Ask
        </Link>

        <Link to="/history">
          <History size={18}/> History
        </Link>

      </div>

    </nav>
  );
}

export default Navbar;