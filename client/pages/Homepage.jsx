import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/homepage.css";

export default function Homepage() {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/quizhome"); // Navigate to quiz
  };

  return (
    <div className="homepage">
      {/* Main Content */}
      <main className="main-content">
        <div className="content-card">
          {/* Left Column */}
          <div className="text-section">
            <h1>
              CyberGuard
              <br />
              SECURITY
            </h1>

            <p className="content-text">
              CyberGuard Challenge is designed for everyday technology
              users—students, families, professionals, and anyone who spends
              time online. Our interactive game teaches the most common
              cybersecurity awareness topics through simple, real-world
              scenarios. From spotting phishing attempts and social engineering
              tricks to creating stronger passwords, browsing safely,
              recognizing scams, protecting your devices, and staying safe on
              social media or gaming platforms, CyberGuard Challenge helps users
              build practical digital safety skills in a fast, engaging, and
              easy-to-understand way.
            </p>

            <p className="content-text">
              Ransomware attacks occur every 11 seconds worldwide. Weak or
              reused passwords contribute to 81% of breaches. Cybercrime is
              expected to cost $10.5 trillion globally by 2025.
            </p>

            <p className="content-text bold">
              Test Your Cyber Smarts. Learn to Stay Safe Online!
            </p>

            <button className="get-started-btn" onClick={handleGetStarted}>
              Get Started
            </button>
          </div>

          {/* Right Column - Illustration */}
          <div className="illustration-section">
            <div className="illustration-container">
              {/* Central Shield */}
              <div className="shield">
                <svg viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>

              {/* WiFi Icon */}
              <div className="wifi-icon">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#2563eb"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0"
                  />
                </svg>
              </div>

              {/* Document Card */}
              <div className="doc-card">
                <div className="doc-line"></div>
                <div className="doc-line"></div>
                <div className="doc-line"></div>
              </div>

              {/* Folder Icon */}
              <div className="folder-icon">
                <svg viewBox="0 0 24 24" fill="#1e3a8a">
                  <path d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                </svg>
              </div>

              {/* Server Box */}
              <div className="server-box">
                <div className="server-line"></div>
                <div className="server-line"></div>
                <div className="server-line"></div>
              </div>

              {/* Plus Icons */}
              <div className="plus-icon plus-1">+</div>
              <div className="plus-icon plus-2">+</div>
              <div className="plus-icon plus-3">+</div>

              {/* Search Icon */}
              <div className="search-icon">
                <svg viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>

              {/* Connecting Lines */}
              <svg className="connecting-lines" viewBox="0 0 400 400">
                <path
                  d="M 100 150 Q 200 100 240 180"
                  stroke="#CBD5E0"
                  strokeWidth="2"
                  strokeDasharray="5,5"
                  fill="none"
                />
                <path
                  d="M 300 200 Q 280 260 240 300"
                  stroke="#CBD5E0"
                  strokeWidth="2"
                  strokeDasharray="5,5"
                  fill="none"
                />
              </svg>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
