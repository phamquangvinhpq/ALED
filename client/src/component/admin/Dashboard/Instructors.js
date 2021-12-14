import React from 'react'

export default function Instructors() {
    return (
        <div className="content-wrapper">
        <section className="content-header">
          <div className="content-header-left">
            <h1>View Instructors</h1>
          </div>
        </section>
        <section className="content">
          <div className="row">
            <div className="col-md-12">
              <div className="box box-info">
                <div className="box-body table-responsive">
      
                  
                  <div id="enrolledCourses1" className="modal fade" role="dialog">
                    <div className="modal-dialog w-50-p">
                      <div className="modal-content">
                        <div className="modal-header">
                          <button type="button" className="close" data-dismiss="modal">×</button>
                          <h4 className="modal-title">Payment Details</h4>
                        </div>
                        <div className="modal-body">
                        <table className="table table-bordered t3">
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Price</th>
                <th>Photo</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              
                <tr >
                  <td>1</td>
                  <td>1</td>
                  <td>
                   1
                  </td>
                  <td>
                    <img src="{value.image}" className="w-100" />
                  </td>
                  <td>1</td>
                 
                </tr>
         


            </tbody>
          </table>
                        </div>
                        <div className="modal-footer">
                          <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                        </div>
                      </div>
                    </div>
                  </div>
      
      
                  <table id="example1" className="table table-bordered table-striped">
                    <thead>
                      <tr>
                        <th width={50}>SL</th>
                        <th>Photo</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Status</th>
                        <th width={120}>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>1</td>
                        <td>
                          <img src="https://phpscriptpoint.com/cc/courseplus/public/uploads/user-2.jpg" alt="" className="w-150" />
                        </td>
                        <td>Patrick Henderson</td>
                        <td>student@gmail.com</td>
                        <td>
                          Active </td>
                        <td>
                          <a href className="btn btn-primary btn-xs btn-block" data-toggle="modal" data-target="#enrolledCourses1"> Show Courses </a>
                         
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

    )
}