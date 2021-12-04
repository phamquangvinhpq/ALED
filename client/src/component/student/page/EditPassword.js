import React from 'react'

export default function EditPassword() {
  return (
    <div>
      
            <div className="col-md-9">
              <form  className="form-horizontal" >
                <div className="form-group">
                  <label htmlFor className="col-sm-4 control-label">New Password</label>
                  <div className="col-sm-6">
                    <input type="password" className="form-control" name="password" />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor className="col-sm-4 control-label">Retype New Password</label>
                  <div className="col-sm-6">
                    <input type="password" className="form-control" name="re_password" />
                  </div>
                </div>
                <div className="form-group">
                  <div className="col-sm-offset-4 col-sm-6">
                    <button type="submit" className="btn btn-default btn-success" name="form1">Update</button>
                  </div>
                </div>
              </form>
            </div>
           
          </div>
        
     
  )
}