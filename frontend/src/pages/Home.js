import React from 'react';
import { Link } from 'react-router-dom';
import Marquee from "react-fast-marquee";
import BlogCard from '../components/BlogCard';
import ProductCard from '../components/ProductCard';
import SpecialProduct from '../components/SpecialProduct';

const Home = () => {
  return (
    <>
      <section className="home-wrapper-1 py-5">
        <div className="container-xxl">
          <div className="row">
            <div className="col-6">
              <div className="main-banner position-relative">
                <img 
                  src="images/main-banner-1.jpg" 
                  className="img-fluid rounded-3" 
                  alt="main-banner" 
                />
                <div className="main-banner-content position-absolute">
                  <h4>SUPERCHARGED FOR PRO</h4>
                  <h5>iPad S13+ PRO.</h5>
                  <p>From $999.00 or $41.62/mo.</p>
                  <Link className="button">BUY NOW</Link>
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="d-flex flex-wrap gap-10 justify-content-between align-items-center">
                <div className="small-banner position-relative">
                <img 
                  src="images/catbanner-02.jpg" 
                  className="img-fluid rounded-3" 
                  alt="main-banner" 
                />
                <div className="small-banner-content position-absolute">
                  <h4>15% OFF</h4>
                  <h5> Smartwatch 7</h5>
                  <p>Shop the latest brand styles <br/> and colors</p>
                </div>
              </div>
                <div className="small-banner position-relative">
                <img 
                  src="images/catbanner-03.jpg" 
                  className="img-fluid rounded-3" 
                  alt="main-banner" 
                />
                <div className="small-banner-content position-absolute">
                  <h4>NEW ARRIVAL</h4>
                  <h5>Buy IPad Air</h5>
                  <p>From $599 or <br/>$49.91 for 12 mo.</p>
                </div>
              </div>
                <div className="small-banner position-relative">
                <img 
                  src="images/catbanner-01.jpg" 
                  className="img-fluid rounded-3" 
                  alt="main-banner" 
                />
                <div className="small-banner-content position-absolute">
                  <h4>BEST SALE</h4>
                  <h5>Laptops Max</h5>
                  <p>From $699.00 or <br/> $64.62/mo.</p>
                </div>
              </div>
                <div className="small-banner position-relative">
                <img 
                  src="images/catbanner-04.jpg" 
                  className="img-fluid rounded-3" 
                  alt="main-banner" 
                />
                <div className="small-banner-content position-absolute">
                  <h4>FREE ENGRAVING</h4>
                  <h5>Airpods Max</h5>
                  <p>High-fidelity playback &<br/> ultra-low distortion</p>
                </div>
              </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="home-wrapper-2 py-5">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div className="services d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center gap-15">
                  <img src="images/service.png" alt="services" />
                  <div>
                    <h6>Free Shipping</h6>
                    <p>From all orders over $100</p>
                  </div>
                </div>
                <div className="d-flex align-items-center gap-15">
                  <img src="images/service-02.png" alt="services" />
                  <div>
                    <h6>Daily Surprise Offers</h6>
                    <p>Save up to 25% off</p>
                  </div>
                </div>
                <div className="d-flex align-items-center gap-15">
                  <img src="images/service-03.png" alt="services" />
                  <div>
                    <h6>Support 24/7</h6>
                    <p>Shop with an expert</p>
                  </div>
                </div>
                <div className="d-flex align-items-center gap-15">
                  <img src="images/service-04.png" alt="services" />
                  <div>
                    <h6>Affordable Prices</h6>
                    <p>Get Factory direct price</p>
                  </div>
                </div>
                <div className="d-flex align-items-center gap-15">
                  <img src="images/service-05.png" alt="services" />
                  <div>
                    <h6>Secure Payment</h6>
                    <p>500% Protected Payments</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="home-wrapper-2 py-5">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div className="categories d-flex justify-content-between flex-wrap align-items-center">
                <div className="d-flex gap-30 align-items-center">
                  <div>
                    <h6>Cameras</h6>
                    <p>10 Items</p>
                  </div>
                  <img src="images/camera.jpg" alt="camera" />
                </div>
                <div className="d-flex gap-30 align-items-center">
                  <div>
                    <h6>Smart Tv</h6>
                    <p>10 Items</p>
                  </div>
                  <img src="images/tv.jpg" alt="tv" />
                </div>
                <div className="d-flex gap-30 align-items-center">
                  <div>
                    <h6>Smart watch</h6>
                    <p>10 Items</p>
                  </div>
                  <img src="images/watc.jpg" alt="watch" />
                </div>
                <div className="d-flex gap-30 align-items-center">
                  <div>
                    <h6>Music & Gaming</h6>
                    <p>10 Items</p>
                  </div>
                  <img src="images/controlle.jpg" alt="camera" />
                </div>
                <div className="d-flex gap-30 align-items-center">
                  <div>
                    <h6>Cameras</h6>
                    <p>10 Items</p>
                  </div>
                  <img src="images/camera.jpg" alt="camera" />
                </div>
                <div className="d-flex gap-30 align-items-center">
                  <div>
                    <h6>Smart Tv</h6>
                    <p>10 Items</p>
                  </div>
                  <img src="images/tv.jpg" alt="tv" />
                </div>
                <div className="d-flex gap-30 align-items-center">
                  <div>
                    <h6>Smart watch</h6>
                    <p>10 Items</p>
                  </div>
                  <img src="images/watc.jpg" alt="watch" />
                </div>
                <div className="d-flex gap-30 align-items-center">
                  <div>
                    <h6>Music & Gaming</h6>
                    <p>10 Items</p>
                  </div>
                  <img src="images/controlle.jpg" alt="camera" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="featured-wrapper py-3 home-wrapper-2 py-5">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <h3 className="section-heading">Featured Collection</h3>
            </div>
             <ProductCard/>
             <ProductCard/>
             <ProductCard/>
             <ProductCard/>
          </div>
        </div>
      </section>
      <section className="famous-wrapper py-5 home-wrapper-2">
        <div className="container-xxl">
          <div className="row g-4">
            <div className="col-3">
              <div className="famous-card">
                <div className="famous-img-wrapper">
                  <img src="images/famous-2.jpg" alt="Smart Watch" />
                </div>
                <div className="famous-content">
                  <h5>BIG SCREEN</h5>
                  <h6>Smart Watch Series 7</h6>
                  <p>From $399 or $16.62/mo.</p>
                </div>
              </div>
            </div>
            <div className="col-3">
              <div className="famous-card">
                <div className="famous-img-wrapper">
                  <img src="images/famous-1.jpg" alt="Studio Display" />
                </div>
                <div className="famous-content">
                  <h5>STUDIO DISPLAY</h5>
                  <h6>600 nits of brightness</h6>
                  <p>27-inch 5K Retina display</p>
                </div>
              </div>
            </div>
            <div className="col-3">
              <div className="famous-card">
                <div className="famous-img-wrapper">
                  <img src="images/famous-3.jpg" alt="iPhone 13 Pro" />
                </div>
                <div className="famous-content">
                  <h5>SMARTPHONES</h5>
                  <h6>iPhone 13 Pro</h6>
                  <p>Now in Green. From $999</p>
                </div>
              </div>
            </div>
            <div className="col-3">
              <div className="famous-card">
                <div className="famous-img-wrapper">
                  <img src="images/famous-4.jpg" alt="Laptop" />
                </div>
                <div className="famous-content">
                  <h5>HOME SPEAKERS</h5>
                  <h6>Room-filling sound</h6>
                  <p>From $699</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="special--wrapper py-5 home-wrapper">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <h3 className="section-heading">Special Products</h3>
            </div>
          </div>
          <div className="row">
            <SpecialProduct/>
            <SpecialProduct/>
            <SpecialProduct/>
            <SpecialProduct/>
          </div>
        </div>
      </section>
      <section className="marque-wrapper py-5 home-wrapper-2 py-5">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div className="marque-inner-wrapper bg-white card-wrapper">
                <Marquee className="d-flex">
                  <div className="mx-4 w-25">
                    <img src="images/brand-01.png" alt="brand"/>
                  </div>
                  <div className="mx-4 w-25">
                    <img src="images/brand-02.png" alt="brand"/>
                  </div>
                  <div className="mx-4 w-25">
                    <img src="images/brand-03.png" alt="brand"/>
                  </div>
                  <div className="mx-4 w-25">
                    <img src="images/brand-04.png" alt="brand"/>
                  </div>
                  <div className="mx-4 w-25">
                    <img src="images/brand-05.png" alt="brand"/>
                  </div>
                  <div className="mx-4 w-25">
                    <img src="images/brand-06.png" alt="brand"/>
                  </div>
                  <div className="mx-4 w-25">
                    <img src="images/brand-07.png" alt="brand"/>
                  </div>
                  <div className="mx-4 w-25">
                    <img src="images/brand-08.png" alt="brand"/>
                  </div>
                </Marquee>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="blog-wrapper py-3 home-wrapper-2">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <h3 className="section-heading">Our Blogs</h3>
            </div>
            <BlogCard></BlogCard>
            <BlogCard></BlogCard>
            <BlogCard></BlogCard>
            <BlogCard></BlogCard>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
