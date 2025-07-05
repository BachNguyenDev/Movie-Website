import React from "react";
import { BsSearch } from "react-icons/bs";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./NavBar.css"; 
export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navigateToSearch = () => {
    navigate('/search');
  };

  const navigateToHome = () => {
    navigate('/');
  };

  return (  
    <nav
      className={`navbar navbar-expand-lg fixed-top ${
        scrolled ? "bg-dark" : ""
      }`}
      style={{
        transition: "background-color 0.3s ease",
        backgroundColor: scrolled ? "#000" : "transparent",
        height: "80px",
      }}
    >
      <div className="container-fluid d-flex justify-content-between align-items-center" >
        <a className="navbar-brand text-danger fw-bold" style={{cursor: "pointer"}} onClick={navigateToHome}>
          Movie App
        </a>
        <BsSearch className="text-white" style={{ cursor: "pointer" }} onClick={navigateToSearch} />
      </div>
    </nav>
  );
}
