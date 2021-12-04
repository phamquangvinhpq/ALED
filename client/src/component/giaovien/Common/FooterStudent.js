import React from 'react'

export default function Footer() {
    return (
        <div>
       {/* CTA Section Starts */}
  <section className="cta-section gradient-bg padding-top-60 padding-bottom-30">
    <div className="cta-shape">
      <img src="assets/images/plus-sign.png" alt="image" className="plus-sign item-rotate" />
    </div>
    <div className="container">
      <div className="row align-items-center">
        <div className="col-lg-6">
          <div className="section-title margin-bottom-40">
            <h2>enhance your skills with <span>best online course</span></h2>
          </div>
          <div className="cta-button">
            <a href="#" className="template-button margin-right-20">start teaching</a>
            <a href="#" className="template-button-2">start learning</a>
          </div>
        </div>
        <div className="col-xl-4 offset-xl-2 col-lg-6">
          <div className="cta-image">
            <img src="assets/images/cta-image.png" alt="image" />
          </div>
        </div>
      </div>
    </div>
  </section>
      {/* Footer Section Starts */}
<footer className="footer-section padding-top-30 padding-bottom-60">
  <div className="footer-shape">
    <img src="assets/images/round-shape-3.png" alt="shape" className="round-shape-3" />
  </div>
  <div className="container">
    <div className="footer-widget-section">
      <div className="row">
        <div className="col-lg-3 col-md-6">
          <div className="footer-widget">
            <div className="footer-logo">
              <a href="index-2.html"><img src="assets/images/logo.png" alt="logo" /></a>
            </div>
            <p>Lorem ipsum dolor, sit amet conse adipisicing elit. quidem perspiciatis earum voluptatem enim dolor.</p>
          </div>
        </div>
        <div className="col-lg-3 col-md-6">
          <div className="footer-widget">
            <div className="widget-title">
              <h4 className="title">courses</h4>
            </div>
            <ul>
              <li><a href="#">web page design</a></li>
              <li><a href="#">IOS aplication</a></li>
              <li><a href="#">UX research</a></li>
            </ul>
          </div>
        </div>
        <div className="col-lg-3 col-md-6">
          <div className="footer-widget">
            <div className="widget-title">
              <h4 className="title">useful links</h4>
            </div>
            <ul>
              <li><a href="#">about us</a></li>
              <li><a href="#">terms of service</a></li>
              <li><a href="#">legal info</a></li>
            </ul>
          </div>
        </div>
        <div className="col-lg-3 col-md-6">
          <div className="footer-widget">
            <div className="widget-title">
              <h4 className="title">company</h4>
            </div>
            <div className="company-address d-flex">
              <div className="address-icon template-icon green-icon margin-right-10">
                <i className="icofont-address-book" />
              </div>
              <div className="address-info">
                info@rumbok.com <br />
                <span>new york, 20 south park avenue.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="footer-copyright-section">
      <div className="row align-items-center">
        <div className="col-sm-5">
          <div className="copyright-text">
            <span>© rumbok 2020.</span>
          </div>
        </div>
        <div className="col-sm-7">
          <div className="copyright-button">
            <div className="dropup-item item-1">
              <button className="template-button-2" type="button">
                <span className="margin-right-10">$ USD</span><i className="fa fa-caret-up" />
              </button>
              <ul className="toggle-box box-1">
                <li><a href="#">$ 500</a></li>
                <li><a href="#">$ 700</a></li>
              </ul>
            </div>
            <div className="dropup-item item-2 margin-left-20">
              <button className="template-button" type="button">
                <span className="margin-right-10">English</span><i className="fa fa-caret-up" />
              </button>
              <ul className="toggle-box box-2">
                <li><a href="#">Bengali</a></li>
                <li><a href="#">Arabic</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</footer>
</div>
    )
}
