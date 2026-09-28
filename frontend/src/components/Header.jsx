import { useState } from "react";
import Navbar from "./Navbar";
import { TiThMenu } from "react-icons/ti";
export default function Header() {
  const [showMenu, setShowMenu] = useState(false);
  const handleMenu = () => {
    setShowMenu(true);
  };

  const handleClose = () => {
    setShowMenu(false);
  };
  return (
    <header>
      <h1>Russell's Catways</h1>
      {!showMenu && (
        <button onClick={handleMenu}>
          <TiThMenu className="icon" />
        </button>
      )}
      {showMenu && (
        <>
          <div className="modal-overlay"></div>
          <div className="modal-menu">
            <Navbar onClick={handleClose} />
            <button onClick={handleClose}>X</button>
          </div>
        </>
      )}
      <Navbar classDesktop="desktop-nav" />
    </header>
  );
}
