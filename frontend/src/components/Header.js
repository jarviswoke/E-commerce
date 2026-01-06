import React from "react";
import { NavLink, Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      <header className="bg-dark py-3">
        <div className="container-xxl">
          <div className="row align-items-center">
            <div className="col-6">
              <p className="text-white mb-0">
                Free Shipping Over $100 & Free Returns
              </p>
            </div>
            <div className="col-6 text-end">
              <p className="text-white mb-0">
                Helpline:{" "}
                <a href="tel:+919763844464"
                  className="text-white text-decoration-none">
                  +91 9763844464
                </a>
              </p>
            </div>
          </div>
        </div>
      </header>
      <header className="header-upper py-3">
        <div className="row"></div>
          <div className="col-2"></div>
          <div className="col-3"></div>
      </header>
    </>
  );
};

export default Header;
