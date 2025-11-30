import "../styles/footer.css";
import React from "react";

export default function Footer() {
    return (
        <footer>
            {/* <div className="cg-divider" /> */}

            <div className="cg-footer-bottom">
                <p className="cg-copy">&copy; 2025 CyberGuard — Built with <span aria-hidden="true">♥</span> by the team.</p>

                <div className="cg-legal">
                    <a>Privacy</a>
                    <a>Terms</a>
                </div>
            </div>
        </footer>
    );
}
