import React from 'react'
import { Link } from 'react-router-dom';

const BlogCard = () => {
  return (
    <div className="col-3">
      <div className="blog-card">
        <img src="images/blog-1.jpg" className="img-fluid" alt="blog" />
      </div>
      <div className="blog-content">
        <p className="date">4 Oct, 2020</p>
        <h5 className="title">A beautiful sunday morning renaissance</h5>
        <p className="desc">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.
        </p>
        <Link to="/" className="button">Read More</Link>
      </div>
    </div>
  );
};

export default BlogCard