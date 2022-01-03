export default function Register() {
  return (
    <div>

      <div className="modal fade" id="rules" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" >
        <div className="modal-dialog modal-vit" role="document">
          <div className="modal-content">
            <div className="modal-body">
              <span>điều khoản</span>
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal">đóng</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <main className="signup-form">
        <div className="cotainer">
          <div className="row justify-content-center">
            <div className="col-md-4">
              <div className="card">
                <h3 className="card-header text-center">Register User</h3>
                <div className="card-body">

                  <form acceptCharset="utf-8" >
                    <div id='testscop'>
                      <div id="dangky" aria-hidden="true">
                        <div className="form-group">
                          <label >Họ và tên</label>
                          <input width="250px" type="text" className="form-control" name="name" placeholder="Full Name" required />
                        </div>
                        <div className="form-group">
                          <label >Email</label>
                          <input type="email" className="form-control" name="email" placeholder="Email Address" required />
                        </div>
                        <div className="form-group">
                          <label >Tên</label>
                          <input type="text" className="form-control" name="username" placeholder="Name" required />
                        </div>
                        <div className="form-group">
                          <label >Điện thoại</label>
                          <input type="text" className="form-control" name="phone" placeholder="Phone" required />
                        </div>
                        <div className="form-group">
                          <label >Kỹ năng</label>
                          <textarea className="form-control" name="skill" placeholder="Skill" required rows="4" cols="50" />
                        </div>
                        <div className="form-group">
                          <label >Ảnh</label>
                          <input type="file" className="form-control" required />
                        </div>
                        <div className="form-group">
                          <label >Ảnh kỹ năng</label>
                          <input type="file" className="form-control" required />
                        </div>
                        <div className="form-group mb-3">
                          <div className="checkbox">
                            <label><input type="checkbox" /> Tôi đã đọc kỹ và đồng ý <a data-dismiss="modal" data-toggle="modal" data-target="#rules">điều khoản</a></label>
                          </div>
                        </div>
                      </div>
                    </div>
                    <a type="submit" className="btn btn-primary btn-success" name="form_registration" >Sign Up</a>
                  </form>

                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

    </div>
  )
}