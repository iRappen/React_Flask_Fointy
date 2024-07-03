import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
    return (
        <div className="header_section">
            <div className="header_top">
                <div className="container-fluid header_top_container">
                    <div className="lang_box dropdown">
                        <a href="#" title="Language" className="nav-link" data-toggle="dropdown" aria-expanded="true">
                            <img src="/images/flag-uk.png" alt="flag" className=" " title="United Kingdom" /> <i className="fa fa-angle-down " aria-hidden="true"></i>
                        </a>
                        <div className="dropdown-menu ">
                            <a href="#" className="dropdown-item">
                            
                            </a>
                        </div>
                        <span>
                            English
                        </span>
                    </div>
                    <div className="contact_nav">
                        <a href="tel:+905532963226">
                            <i className="fa fa-phone" aria-hidden="true"></i>
                            <span>
                                Call : +90 5532963226
                            </span>
                        </a>
                        <a href="mailto:i.tahaozgul@gmail.com">
                            <i className="fa fa-envelope" aria-hidden="true"></i>
                            <span>
                                Email : i.tahaozgul@gmail.com
                            </span>
                        </a>
                        <a href="https://www.google.com/maps/search/?api=1&query=Adagülü+Çıkmazı+No:4" target="_blank">
                            <i className="fa fa-map-marker" aria-hidden="true"></i>
                            <span>
                                Location
                            </span>
                        </a>
                    </div>
                    <div className="social_box">
                        <a href="#">
                            <i className="fa fa-facebook" aria-hidden="true"></i>
                        </a>
                        <a href="#">
                            <i className="fa fa-twitter" aria-hidden="true"></i>
                        </a>
                        <a href="#">
                            <i className="fa fa-linkedin" aria-hidden="true"></i>
                        </a>
                        <a href="#">
                            <i className="fa fa-instagram" aria-hidden="true"></i>
                        </a>
                    </div>
                </div>
            </div>
            <div className="header_bottom">
                <div className="container-fluid">
                    <nav className="navbar navbar-expand-lg custom_nav-container ">
                        <Link className="navbar-brand" to="/">
                            <img src="/images/logo.png" alt="" />
                        </Link>

                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className=""> </span>
                        </button>

                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav">
                                <li className="nav-item active">
                                    <Link className="nav-link" to="/">Home <span className="sr-only">(current)</span></Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/services">Services</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/about"> About</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/project">Project</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/client">Client</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/contact">Contact Us</Link>
                                </li>
                                <li className="nav-item">
                                    <form className="form-inline">
                                        <button className="btn  my-2 my-sm-0 nav_search-btn" type="submit">
                                            <i className="fa fa-search" aria-hidden="true"></i>
                                        </button>
                                    </form>
                                </li>
                            </ul>
                            <div className="quote_btn-container">
                                <Link to="/auth/register" className="quote_btn">
                                    Register
                                </Link>
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
        </div>
    );
}

export default Header;
