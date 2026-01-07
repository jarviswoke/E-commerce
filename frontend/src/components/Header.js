import React from "react";
import { Link } from "react-router-dom";
import { BsSearch } from "react-icons/bs";

const Header = () => {
  return (
    <>
      {/* Top strip */}
      <header className="header-top-strip py-3">
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
                <a href="tel:+919763844464" className="text-white">
                  +91 9763844464
                </a>
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main header */}
      <header className="header-upper py-3">
        <div className="container-xxl">
          <div className="row align-items-center">
            
            {/* Logo */}
            <div className="col-2">
              <h2 className="mb-0">
                <Link to="/" className="text-white">
                  Dev Corner
                </Link>
              </h2>
            </div>

            {/* Search */}
            <div className="col-5">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control py-2"
                  placeholder="Search Product Here..."
                />
                <span className="input-group-text p-3">
                  <BsSearch />
                </span>
              </div>
            </div>

            {/* Icons */}
            <div className="col-5">
              <div className="header-upper-links d-flex align-items-center justify-content-between">

                <Link to="/compare" className="d-flex align-items-center gap-10 text-white">
                  <img src="images/compare.svg" alt="compare" />
                  <p className="mb-0">
                    Compare <br /> Products
                  </p>
                </Link>

                <Link to="/wishlist" className="d-flex align-items-center gap-10 text-white">
                  <img src="images/wishlist.svg" alt="wishlist" />
                  <p className="mb-0">
                    Favourite <br /> Wishlist
                  </p>
                </Link>

                <Link to="/login" className="d-flex align-items-center gap-10 text-white">
                  <img src="images/user.svg" alt="user" />
                  <p className="mb-0">
                    Login <br /> My Account
                  </p>
                </Link>

                <Link to="/cart" className="d-flex align-items-center gap-10 text-white">
                  <img src="images/cart.svg" alt="cart" />
                  <div className="d-flex flex-column">
                    <span className="badge bg-white text-dark">0</span>
                    <p className="mb-0">$ 500</p>
                  </div>
                </Link>

              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header; 
