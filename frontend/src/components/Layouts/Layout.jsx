import Header from "../Header";
import Footer from "../Footer";
import { Outlet } from "react-router-dom";
export default function Layout({ showMenu, setShowMenu, isConnected }) {
  return (
    <div className="container">
      <Header
        setShowMenu={setShowMenu}
        isConnected={isConnected}
        showMenu={showMenu}
      />
      {showMenu && <div className="modal-overlay"></div>}
      <Outlet />
      <Footer />
    </div>
  );
}
