import { Link } from "react-router-dom";
export default function Footer() {
    return (
        <footer className="footer text-center">
            <div className="container small-container">
                <p>Copyright © 2025  <Link to="/">Clocksynk</Link> <span>Professional Sports Timing Solutions</span>. All rights reserved.</p>
                <ul>
                    <li>
                        <Link to="">Terms & conditions</Link>
                    </li>
                    <li>
                        <Link to="">Privacy Policy</Link>
                    </li>
                </ul>
            </div>
        </footer>
    )
}