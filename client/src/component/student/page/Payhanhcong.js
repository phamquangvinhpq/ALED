import React from 'react'

export default function Payhanhcong() {
    return (


        <section id="cover" style={{ 
            backgroundImage: `url("https://i.pinimg.com/564x/db/f7/7b/dbf77b09006b15c60809fa8ab3d802f8.jpg")` 
          }}>
        <div id="cover-caption">
          <div id="container" className="container">
            <div className="row">
              <div className="col-sm-10 offset-sm-1 text-center">
                  <br /><br /><br /><br /><br /><br /><br />
                <h1 >   Payment success </h1>
                <div className="info-form">
                  <form action className="form-inline justify-content-center">
                
                    <h2>    Thank you for using the service</h2>
                    <a href='/home' className="btn btn-success ">Home</a>
                  </form>
                </div>
                <br />
              </div>
            </div>
          </div>
        </div>
      </section>
      
        
    )
}
