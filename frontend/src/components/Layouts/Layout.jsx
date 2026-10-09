import Header from "../Header";
import Footer from "../Footer";
import { Outlet } from "react-router-dom";
export default function Layout({ showMenu, setShowMenu, isConnected, logout }) {
  return (
    <div className="container">
      <Header
        setShowMenu={setShowMenu}
        isConnected={isConnected}
        showMenu={showMenu}
        logout={logout}
      />
      {showMenu && <div className="modal-overlay"></div>}
      <Outlet />
      <Footer />
    </div>
  );
}
