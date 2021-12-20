import React from 'react'
export default function WithdrawHistory() {
    return (
        <div>
            <div class="modal fade" id="exampleModalCenter1" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLongTitle">NOTE</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="tab-three-content tab-content-bg note-content lost">
                            <div className="container">
                                <div className="row clearfix">
                                    <div className="col-lg-6">

                                        <div className="chat">
                                            <div className="chat-header clearfix">
                                                <div className="row">
                                                    <div className="col-lg-6">
                                                        <a href="javascript:void(0);" data-toggle="modal" data-target="#view_info">
                                                            <img src="https://bootdey.com/img/Content/avatar/avatar2.png" alt="avatar" />
                                                        </a>
                                                        <div className="chat-about">
                                                            <h6 className="m-b-0">Aiden Chavez</h6>

                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                            <div className="chat-history">
                                                <ul className="m-b-0">
                                                    <li className="clearfix">
                                                        <div className="message-data text-right">
                                                            <span className="message-data-time">quang vinh:</span>
                                                            <span className="message-data-time">10:10 AM, Today</span>
                                                        </div>
                                                        <div className="message other-message float-right"> Hi Aiden, how are you? How is the project coming along? </div>
                                                    </li>
                                                    <li className="clearfix">
                                                        <div className="message-data">
                                                            <span className="message-data-time">Giảng viên</span>
                                                            <span className="message-data-time">10:12 AM, Today</span>
                                                        </div>
                                                        <div className="message my-message">Are we meeting today?</div>
                                                    </li>

                                                </ul>
                                            </div>
                                            <div className="chat-message clearfix">
                                                <div className="input-group mb-0">
                                                    <div className="input-group-prepend">
                                                        <span className="input-group-text"><i className="fa fa-send" /></span>
                                                    </div>
                                                    <input type="text" className="form-control" placeholder="Enter text here..." />
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>

                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>

                        </div>
                    </div>
                </div>
            </div>

            <div className="col-md-9">
                <div className="table-responsive">
                    <table className="table table-bordered t3">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Title</th>
                                <th>Price</th>
                                <th>Photo</th>
                                <th>Description</th>
                                <th className="w-100">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr >
                                <td>1</td>
                                <td>waybu</td>
                                <td>
                                    73737
                                </td>
                                <td>
                                    <img src={'https://media-cdn.laodong.vn/Storage/NewsPortal/2021/5/26/913299/Ngan-Ha25.jpg'} className="w-100" />
                                </td>
                                <td>đpẹ khỏi bàn</td>
                                <td>
                                    <a data-dismiss="modal" data-toggle="modal" data-target="#exampleModalCenter1" className="btn btn-primary btn-sm btn-block">
                                        View								</a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}