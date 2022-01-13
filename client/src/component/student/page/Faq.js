export default function Faq() {
    return (
        <div>
            <div className="page-banner" style={{ backgroundImage: 'url(/assets/uploads/banner_course.jpg)' }}>
                <div className="page-banner-bg" />
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h1>Các câu hỏi thường gặp</h1>
                            <h3>
                                <a href="/home">Trang chủ</a>
                                <i className="fa fa-angle-right" />
                                Các câu hỏi thường gặp
                            </h3>
                        </div>
                    </div>
                </div>
            </div>
            <div className="page-content">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="accordion-section mt_20">
                                <div className="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
                                    <div className="panel panel-default">
                                        <div className="panel-heading p-3 mb-3" role="tab" id="heading1">
                                            <h3 className="panel-title">
                                                <a className role="button" data-toggle="collapse" data-parent="#accordion" href="#faq1">
                                                    <span>Phương thức thanh toán trên Aled</span>
                                                </a>
                                            </h3>
                                        </div>
                                        <div id="faq1" className="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingOne">
                                            <div className="panel-body px-3 mb-4">
                                                <p>Để xem các phương thức thanh toán có sẵn cho bạn khi bạn muốn mua một khóa học, vui lòng thực hiện theo các bước dưới đây:

                                                    Sau khi bạn tìm thấy khóa học bạn muốn đăng ký, hãy nhấp vào Mua ngay trên trang của khóa học
                                                    Bạn sẽ được dẫn đến trang Checkout , trang này sẽ giới thiệu các phương thức thanh toán khác nhau có sẵn cho bạn (không bao gồm các tùy chọn thanh toán ứng dụng dành cho thiết bị di động của chúng tôi</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="panel panel-default">
                                        <div className="panel-heading p-3 mb-3" role="tab" id="heading2">
                                            <h3 className="panel-title">
                                                <a className="collapsed" role="button" data-toggle="collapse" data-parent="#accordion" href="#faq2">
                                                    <span>Các khóa học của Aled bao gồm những gì?</span>
                                                </a>
                                            </h3>
                                        </div>
                                        <div id="faq2" className="panel-collapse collapse " role="tabpanel" aria-labelledby="headingOne">
                                            <div className="panel-body px-3 mb-4">
                                                <p>Mỗi khóa học của Aled được tạo, sở hữu và quản lý bởi (các) người hướng dẫn. Nền tảng của mỗi khóa học Aled là các bài giảng của nó , có thể bao gồm video, trang trình bày và văn bản. Ngoài ra, người hướng dẫn có thể bổ sung các nguồn tài nguyên và nhiều loại hoạt động thực hành khác nhau, như một cách để nâng cao trải nghiệm học tập của sinh viên. </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="panel panel-default">
                                        <div className="panel-heading p-3 mb-3" role="tab" id="heading3">
                                            <h3 className="panel-title">
                                                <a className="collapsed" role="button" data-toggle="collapse" data-parent="#accordion" href="#faq3">
                                                    <span>Aled có phải là một tổ chức được công nhận không? Tôi có nhận được gì sau khi hoàn thành một khóa học không?</span>
                                                </a>
                                            </h3>
                                        </div>
                                        <div id="faq3" className="panel-collapse collapse " role="tabpanel" aria-labelledby="headingOne">
                                            <div className="panel-body px-3 mb-4">
                                                <p>Mặc dù Aled không phải là một tổ chức được công nhận, nhưng chúng tôi cung cấp các khóa học dựa trên kỹ năng do các chuyên gia thực tế trong lĩnh vực của họ giảng dạy. Mỗi khóa học trả phí được phê duyệt đều có chứng chỉ hoàn thành để ghi lại thành tích của bạn.</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="panel panel-default">
                                        <div className="panel-heading p-3 mb-3" role="tab" id="heading4">
                                            <h3 className="panel-title">
                                                <a className="collapsed" role="button" data-toggle="collapse" data-parent="#accordion" href="#faq4">
                                                    <span>Tôi có thể đi đâu để được giúp đỡ?</span>
                                                </a>
                                            </h3>
                                        </div>
                                        <div id="faq4" className="panel-collapse collapse " role="tabpanel" aria-labelledby="headingOne">
                                            <div className="panel-body px-3 mb-4">
                                                <p>Nếu bạn có câu hỏi về một khóa học trả phí khi đang tham gia khóa học đó, bạn có thể tìm kiếm câu trả lời cho câu hỏi của mình trong phần Hỏi và Đáp hoặc hỏi người hướng dẫn. </p>
                                            </div>
                                        </div>
                                    </div>
                                
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}