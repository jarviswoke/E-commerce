import { Link } from "react-router-dom";
import { FaLinkedin, FaGithub, FaYoutube, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
     <>
        {/* Footer Top */}
        <footer className="py-4">
          <div className="container-xxl">
            <div className="row align-items-center">
              <div className="col-5">
                <div className="footer-top-data d-flex gap-30 align-items-center"></div>
                <img src="images/newsletter.png" alt="newsletter"/>
                <h2 className="mb-0 text-white">Sign Up for NewsLetter</h2>
              </div>
              <div className="col-7">
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control py-1"
                    placeholder="Your Email Address"
                    aria-label="Your Email Address"
                    aria-describedby="basic-addon2"
                  />
                  <span className="input-group-text p-2" id="basic-addon2">
                    Subscribe
                  </span>
                </div>
              </div>
            </div>
          </div>
        </footer>

        { /* Footer Main */}
        <footer className="py-4">
          <div className="container-xxl">
            <div className="row">
              <div className="col-4">
                <h4 className="text-white mb-4">Contact us</h4>
                <div>
                  <address className="text-white fs-6">
                    Developer&apos;s Corner<br/>
                    Student Project, IIIT Vadodara<br/>
                    Pincode: 382421
                  </address>
                  <a href="tel: +91 9763844464" className="mt-4 d-block mb-1 text-white">
                    +91 9763844464
                  </a>
                  <a href="sachigadkari@gmail.com" className="mt-4 d-block mb-2 text-white">
                    sachigadkari@gmail.com
                  </a>
                  <div className="social_icons d-flex align-itmes-center gap-30 mt-2">
                    <a className="text-white" href="https://www.linkedin.com" target="_blank" rel="noreferrer">
                      <FaLinkedin className="fs-4"/>
                    </a>
                    <a className="text-white"  href="https://www.instagram.com" target="_blank" rel="noreferrer">
                      <FaInstagram className="fs-4"/>
                    </a>
                    <a className="text-white" href="https://github.com" target="_blank" rel="noreferrer">
                      <FaGithub className="fs-4"/>
                    </a>
                    <a className="text-white" href="https://www.youtube.com" target="_blank" rel="noreferrer">
                      <FaYoutube className="fs-4"/>
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-3">
                <h4 className="text-white mb-4">Information</h4>
                <div className="footer-link d-flex flex flex-column">
                  <Link className="text-white py-2 mb-1">Privacy Policy</Link>
                  <Link className="text-white py-2 mb-1">Refund Policy</Link>
                  <Link className="text-white py-2 mb-1">Shipping Policy</Link>
                  <Link className="text-white py-2 mb-1">Terms & Conditions</Link>
                  <Link className="text-white py-2 mb-1">Blogs</Link>
                </div>
              </div>
              <div className="col-3">
                <h4 className="text-white mb-4">Account</h4>
                <div className="footer-link d-flex flex flex-column">
                  <Link className="text-white py-2 mb-1">About Us</Link>
                  <Link className="text-white py-2 mb-1">FAQ</Link>
                  <Link className="text-white py-2 mb-1">Contact</Link>
                </div>
              </div>
              <div className="col-2">
                <h4 className="text-white mb-4">Quick Links</h4>
                <div className="footer-link d-flex flex flex-column">
                  <Link className="text-white py-2 mb-1">Laptop</Link>
                  <Link className="text-white py-2 mb-1">Headphones</Link>
                  <Link className="text-white py-2 mb-1">Tablets</Link>
                  <Link className="text-white py-2 mb-1">Watch</Link>
                </div>
              </div>
            </div>
          </div>
        </footer>

        { /* Footer Bottom */}
        <footer className="py-4">
          <div className="container-xxl">
            <div className="col-12">
               <p className="text-center mb-0 text-white">
                &copy; {new Date().getFullYear()} Powered by Developer's Corner
                </p>
            </div>
          </div>
        </footer>
     </>
  );
};

export default Footer;
