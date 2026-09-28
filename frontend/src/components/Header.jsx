import Navbar from "./Navbar";
import { TiThMenu } from "react-icons/ti";
export default function Header() {
  return (
    <header>
      <h1>Russell's Catways</h1>
      <button>
        <TiThMenu className="icon" />
      </button>
      <Navbar classDesktop="desktop-nav" />
    </header>
  );
}
