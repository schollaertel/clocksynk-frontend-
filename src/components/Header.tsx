import { Link } from "react-router-dom";
import logo from "../assets/images/logo.svg"
export default function Header() {
    return (
       <header className="header">
            <div className="container small-container">
                <div className="logo-area text-center">
                    <Link to="/"><img src={logo} alt="" /></Link>
                </div>
            </div>
       </header>
    )
}
