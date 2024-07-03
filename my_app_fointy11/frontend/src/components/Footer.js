import React from 'react';

function Footer() {
  return (
    <div className="footer_section">
      <div className="container">
        <p>
          &copy; <span id="displayYear"></span> All Rights Reserved By
          <a href="https://html.design/">Free Html Templates</a>
        </p>
      </div>
    </div>
  );
}

function ContactNav() {
  return (
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
  );
}

function QuickLinks() {
  return (
    <div className="info_links">
      <h4>
        QUICK LINKS
      </h4>
      <div className="info_links_menu">
        <a className="" href="/">Home</a>
        <a className="" href="/services">Services</a>
        <a className="" href="/about">About</a>
        <a className="" href="/project">Project</a>
        <a className="" href="/client">Testimonial</a>
        <a className="" href="/contact">Contact Us</a>
      </div>
    </div>
  );
}

function InfoSection() {
  return (
    <div className="info_section">
      <div className="container">
        <ContactNav />
        <div className="info_top">
          <div className="row info_main_row">
            <div className="col-sm-6 col-md-4 col-lg-3">
              <QuickLinks />
            </div>
            <div className="col-md-4">
              <div className="info_form">
                <h4>
                  SIGN UP TO OUR NEWSLETTER
                </h4>
                <form action="">
                  <input type="text" placeholder="Enter Your Email" />
                  <button type="submit">
                    Subscribe
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="info_bottom">
          <div className="row">
            <div className="col-md-2">
              <div className="info_logo">
                <a href="/">
                  <img src="images/logo2.png" alt="" />
                </a>
              </div>
            </div>
            {/* Diğer sosyal medya ikonları ve bağlantıları buraya eklenmeli */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <>
      <Footer />
      <InfoSection />
    </>
  );
}
