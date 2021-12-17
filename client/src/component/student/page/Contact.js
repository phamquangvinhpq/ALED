export default function Contact() {
return(
    <div>
  <div className="page-banner" style={{ backgroundImage: "url(/assets/uploads/banner_course.jpg)" }}>
    <div className="page-banner-bg" />
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <h1>Contact</h1>
          <h3>
            <a href="https://phpscriptpoint.com/cc/courseplus/">Home</a>
            <i className="fa fa-angle-right" />
            Contact
          </h3>
        </div>
      </div>
    </div>
  </div>
  <div className="page-content">
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <div className="col-xs-12 col-sm-6 col-lg-4">
            <div className="box">
              <div className="icon">
                <div className="image"><i className="fa fa-envelope" aria-hidden="true" /></div>
                <div className="info">
                  <h3 className="title">Email &amp; Website</h3>
                  <p>
                    aled@gmail.com
                    </p>
                </div>
              </div>
              <div className="space" />
            </div>
          </div>
          <div className="col-xs-12 col-sm-6 col-lg-4">
            <div className="box">
              <div className="icon">
                <div className="image"><i className="fa fa-phone" aria-hidden="true" /></div>
                <div className="info">
                  <h3 className="title">Contact</h3>
                  <p>
                    Office 1: 0989999999
                    </p>
                </div>
              </div>
              <div className="space" />
            </div>
          </div>
          <div className="col-xs-12 col-sm-6 col-lg-4">
            <div className="box">
              <div className="icon">
                <div className="image"><i className="fa fa-map-marker" aria-hidden="true" /></div>
                <div className="info">
                  <h3 className="title">Address</h3>
                  <p>
                    Trịnh văn Bô, Xuân Phương<br />
                    Hà Nội </p>
                </div>
              </div>
              <div className="space" />
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6 map">
          <h3>Find Us on Map</h3>
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3723.863981044336!2d105.74459841473154!3d21.038127785993204!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x313454b991d80fd5%3A0x53cefc99d6b0bf6f!2zVHLGsOG7nW5nIENhbyDEkeG6s25nIEZQVCBQb2x5dGVjaG5pYw!5e0!3m2!1svi!2s!4v1639710344574!5m2!1svi!2s" width={600} height={450} style={{border: 0}} allowFullScreen loading="lazy" />
           </div>
        <div className="col-md-6 contact-container">
          <h3>Contact us Through the Form:</h3>
          <form action="#" className="contact-form" method="post" acceptCharset="utf-8">
            <label>Name</label>
            <div className="form-group">
              <input type="text" name="name" className="form-control" placeholder required />
            </div>
            <label>Email</label>
            <div className="form-group">
              <input type="email" name="email" className="form-control" placeholder required />
            </div>
            <label>Phone Number</label>
            <div className="form-group">
              <input type="text" name="phone" className="form-control" placeholder required />
            </div>
            <label>Message</label>
            <div className="form-group">
              <textarea name="message" className="form-control" cols={30} rows={10} placeholder required defaultValue={""} />
            </div>
            <button type="submit" className="btn btn-default btn-success" name="form_contact">Submit</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</div>

)
}