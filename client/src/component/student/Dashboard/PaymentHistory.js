import React, { useEffect, useState } from 'react'
export default function PaymentHistory() {
    return (
        <div>
          <div className="col-md-9">
            <div className="table-responsive">
    
              <div id="myModal1" className="modal fade" role="dialog">
                <div className="modal-dialog w-90-p">
                  <div className="modal-content">
                    <div className="modal-header">
                      <button type="button" className="close" data-dismiss="modal">×</button>
                      <h4 className="modal-title">Course Details</h4>
                    </div>
                    <div className="modal-body">
                      <div className="r-table">
                        <div className="r-row">
                          <div className="r-cell w-200">Photo</div>
                          <div className="r-cell"><img src="https://phpscriptpoint.com/cc/courseplus/public/uploads/course-30.jpg" className="w-200" /></div>
                        </div>
                        <div className="r-row">
                          <div className="r-cell w-200">Course Title</div>
                          <div className="r-cell">Build An eCommerce Website With WordPress</div>
                        </div>
                        <div className="r-row">
                          <div className="r-cell w-200">Course Content</div>
                          <div className="r-cell"><p>Lorem ipsum dolor sit amet, illum atomorum hendrerit te mea. At has sint vitae volumus, vix ut minimum deserunt, has corpora suavitate ea. Eam ei vidit mollis, mei no suas fugit iusto, vix nihil populo at. Id magna suscipit has, ei vis ancillae molestiae neglegentur, iuvaret numquam rationibus id pri. Saepe offendit pertinax ne ius, doming viderer referrentur nec eu.</p>
                            <p>Sit alii dicam an, iudico elaboraret quaerendum nec at. Deleniti percipit deterruisset usu ea, laoreet debitis cum id, assum mundi audire vis ea. Ad senserit interesset qui. Nec eu amet scaevola oporteat, iudico moderatius pri an. Ad eam mutat appellantur.</p>
                            <p>Copiosae antiopam cum id, eum no vivendo euripidis deseruisse, vix ad ridens inermis sadipscing. Pri eu meis voluptatum, eum case duis dissentiunt ei. Has antiopam intellegam no, sale labitur ex pri. Quo an solum velit, sumo invidunt qui ne, mea fabulas interesset ex. Tractatos molestiae vim no, no iudico fierent est.</p>
                          </div>
                        </div>
                        <div className="r-row">
                          <div className="r-cell w-200">Course Type</div>
                          <div className="r-cell">Paid</div>
                        </div>
                        <div className="r-row">
                          <div className="r-cell w-200">Course Price</div>
                          <div className="r-cell">11.29</div>
                        </div>
                        <div className="r-row">
                          <div className="r-cell w-200">Course Old Price</div>
                          <div className="r-cell">
                            <del>45.29</del>
                          </div>
                        </div>
                        <div className="r-row">
                          <div className="r-cell w-200">Course Category</div>
                          <div className="r-cell">
                            WooCommerce														</div>
                        </div>
                      </div>
                    </div>
                    <div className="modal-footer">
                      <button type="button" className="btn btn-default bg-ddd c-000 bd-0" data-dismiss="modal"><b>Close</b></button>
                    </div>
                  </div>
                </div>
              </div>
    
              <table className="table table-bordered t3">
                <thead>
                  <tr>
                    <th>Money</th>
                    <th>Bank</th>
                    <th>description</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                      <td>1</td>
                      <td>1</td>
                      <td>1</td>
                      <td>1</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )
}