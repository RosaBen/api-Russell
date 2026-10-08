import Navbar from "./Navbar";
import { TiThMenu } from "react-icons/ti";
export default function Header({ showMenu, setShowMenu, isConnected }) {
  return (
    <header>
      <h1>Russell's Catways</h1>
      {!showMenu && (
        <button
          onClick={() => setShowMenu(true)}
          aria-label="Ouvrir le menu"
          aria-expanded={showMenu}
          aria-controls="modal-menu"
        >
          <TiThMenu className="icon" />
        </button>
      )}
      {showMenu && (
        <>
          <div className="modal-menu">
            <Navbar
              onClick={() => setShowMenu(false)}
              isConnected={isConnected}
            />
            <button
              onClick={() => setShowMenu(false)}
              aria-label="Fermer le menu"
            >
              X
            </button>
          </div>
        </>
      )}
      <Navbar classDesktop="desktop-nav" isConnected={isConnected} />
    </header>
  );
}
