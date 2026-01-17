import React from 'react';
import BreadCrumb from '../components/BreadCrumb';
import Meta from '../components/Meta';
import ReactStars from "react-stars";

const OurStore = () => {
  return (
    <> 
      <Meta title={"Our Store"} />
      <BreadCrumb title="Our Store" />

      <div className="store-wrapper home-wrapper-2 py-5">
        <div className="container-xxl">
          <div className="row">

            {/* LEFT FILTER COLUMN */}
            <div className="col-3">

              <div className="filter-card mb-3">
                <h3 className="filter-title">Shop By Categories</h3>
                <ul className="ps-0">
                  <li>Watch</li>
                  <li>TV</li>
                  <li>Camera</li>
                  <li>Laptop</li>
                </ul>
              </div>
              <div className="filter-card mb-3">
                <h3 className="filter-title">Filter By</h3>
                <h5 className="sub-title">Availability</h5>
                <div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="inStock"
                    />
                    <label className="form-check-label" htmlFor="inStock">
                      In Stock (1)
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="outStock"
                    />
                    <label className="form-check-label" htmlFor="outStock">
                      Out of Stock (0)
                    </label>
                  </div>
                </div>
                 <h5 className="sub-title">Price</h5>
                 <div className="d-flex align-items-center gap-10">
                  <div className="form-floating ">
                    <input 
                      type="email" 
                      className="form-control" 
                      id="floatingInput" 
                      placeholder="From" 
                    />
                    <label htmlFor="floatingInput">From</label>
                  </div>
                  <div className="form-floating ">
                    <input 
                      type="email" 
                      className="form-control" 
                      id="floatingInput" 
                      placeholder="To" 
                    />
                    <label htmlFor="floatingInput">To</label>
                  </div>
                 </div>
                 <h5 className="sub-title">Colors</h5>
                  <div>
                    <ul className="colors ps-0">
                      <li></li>
                      <li></li>
                      <li></li>
                      <li></li>
                      <li></li>
                      <li></li>
                      <li></li>
                      <li></li>
                      <li></li>
                      <li></li>
                      <li></li>
                      <li></li>
                      <li></li>
                    </ul>
                  </div>
                  <h5 className="sub-title">Size</h5>
                  <div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="color-1"
                      />
                      <label className="form-check-label" htmlFor="color-1">
                        S (2)
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="color-1"
                      />
                      <label className="form-check-label" htmlFor="color-1">
                        M (2)
                      </label>
                    </div>
                  </div>
              </div>
              <div className="filter-card mb-3">
                <h3 className="filter-title">Product Tags</h3>
                <div>
                  <div className="product-tags flex-wrap align-items-center gap-10">
                    <span className="badge bg-light text-secondary rounded-3 py-2 px-3">Headphone</span>
                    <span className="badge bg-light text-secondary rounded-3 py-2 px-3">Laptop</span>
                    <span className="badge bg-light text-secondary rounded-3 py-2 px-3">Mobile</span>
                    <span className="badge bg-light text-secondary rounded-3 py-2 px-3">Vivo</span>
                    <span className="badge bg-light text-secondary rounded-3 py-2 px-3">Wire</span>
                  </div>
                </div>
              </div>
              <div className="filter-card mb-3">
                <h3 className="filter-title">Random Product</h3>
                <div className="random-product d-flex align-items-center gap-10">
                  <div className="random-product-image">
                    <img
                      src="images/watch.jpg"
                      className="img-fluid"
                      alt="watch"
                    />
                  </div>
                  <div className="random-product-details">
                    <h5>Kids Headphones bulk 10npack multi colored for students</h5>
                    <ReactStars
                      count={5}
                      size={24}
                      value={3}
                      edit={false}
                      activeColor="#ffd700"
                      inactiveColor="#d3d3d3"
                    />
                    <b>$ 300</b>
                  </div>
                </div>
                <div className="random-product d-flex align-items-center gap-10">
                  <div className="random-product-image">
                    <img
                      src="images/watch.jpg"
                      className="img-fluid"
                      alt="watch"
                    />
                  </div>
                  <div className="random-product-details">
                    <h5>Kids Headphones bulk 10n pack multi colored for students</h5>
                    <ReactStars
                      count={5}
                      size={24}
                      value={3}
                      edit={false}
                      activeColor="#ffd700"
                      inactiveColor="#d3d3d3"
                    />
                    <b>$ 300</b>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT PRODUCTS COLUMN */}
            <div className="col-9">
              <div className="filter-sort-grid mb-4 ">
                <div className="d-flex justify-content-between align-items-center">
                  <div className="d-flex align-items-center gap-10">
                    <p className="mb-0 d-block">Sort By:</p>
                    <select className="form-control form-select" defaultValue="best-selling">
                      <option value="manual">Featured</option>
                      <option value="best-selling">Best selling</option>
                      <option value="title-ascending">Alphabetically, A-Z</option>
                      <option value="title-descending">Alphabetically, Z-A</option>
                      <option value="price-ascending">Price, low to high</option>
                      <option value="price-descending">Price, high to low</option>
                      <option value="created-ascending">Date, old to new</option>
                      <option value="created-descending">Date, new to old</option>
                      </select>
                  </div>
                  <div className="d-flex align-items-center gap-10 ">
                    <p className="totalproducts mb-0" style={{width: "100px"}}>21 Products</p>
                    <div className="d-flex gap-10 align-items-center grid">
                      <img src="images/gr4.svg" className="d-block img-fluid" alt="grid" />
                      <img src="images/gr3.svg" className="d-block img-fluid" alt="grid" />
                      <img src="images/gr2.svg" className="d-block img-fluid" alt="grid" />
                      <img src="images/gr.svg" className="d-block img-fluid" alt="grid" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="product-list pb-5"></div>
            </div>
          </div>
        </div>
      </div>
    </> 
  );
};

export default OurStore;
