import React from "react";
import { Link } from "react-router-dom";
import ReactStars from "react-stars";

const SpecialProduct = () => {
  const progress = 25;

  return (
    <div className="col-6 mb-3">
      <div className="special-product-card">
        <div className="d-flex align-items-center gap-15">
          <img
            src="images/watchh.jpg"
            className="img-fluid"
            alt="watch"
            style={{ width: "120px" }}
          />
          <div className="special-product-content">
            <h5 className="brand">Havels</h5>
            <h6 className="title">
              MARVIK Smart Watch, ID116 Plus 2025, IP68 Waterproof
            </h6>
            <ReactStars
              count={5}
              size={20}
              value={3}
              edit={false}
              activeColor="#ffd700"
              inactiveColor="#d3d3d3"
            />
            <p className="price">
              <span className="red-p">$100</span>{" "}
              <strike>$200</strike>
            </p>

            <div className="discount-till">
              <div className="d-flex align-items-center gap-10">
                <p className="mb-0"><b>5 days</b></p>
                <span className="badge rounded-circle p-3 bg-danger">1</span>
                <span className="badge rounded-circle p-3 bg-danger">1</span>
                <span className="badge rounded-circle p-3 bg-danger">1</span>
              </div>

              <div className="prod-count mt-3">
                <p className="mb-1">Products:</p>
                <div className="progress">
                  <div
                    className="progress-bar"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
              <Link className="button">Add to Cart</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpecialProduct;
