import React from 'react'

export default function ListCourse() {
    return (
<div>
        <div className="col-md-9">
          <form action="https://phpscriptpoint.com/cc/courseplus/user/edit-profile" className="form-horizontal" method="post" acceptCharset="utf-8">
            <div className="form-group">
              <label htmlFor className="col-sm-2 control-label">Name</label>
              <div className="col-sm-10">
                <input type="text" className="form-control" name="user_name" defaultValue="Brent Grundy" />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor className="col-sm-2 control-label">Email Address</label>
              <div className="col-sm-10">
                <input type="email" className="form-control" name defaultValue="instructor@gmail.com" disabled /><span className="c-red">Email address can not be changed</span>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor className="col-sm-2 control-label">Website</label>
              <div className="col-sm-10">
                <input type="text" className="form-control" name="user_website" defaultValue />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor className="col-sm-2 control-label">Headline</label>
              <div className="col-sm-10">
                <input type="text" className="form-control" name="user_headline" defaultValue="Expert Django Developer" />
              </div>
            </div>
            
            <div className="form-group">
              <div className="col-sm-offset-2 col-sm-10">
                <button type="submit" className="btn btn-default btn-success" name="form1">Update</button>
              </div>
            </div>
          </form>
        </div>
        
      </div>

 
)
}