import React from 'react'

export default function Dashboard() {
    return (
        <div className="content-wrapper">
            <section className="content-header">
                <div className="content-header-left">
                    <h1>Dashboard</h1>
                </div>
            </section>
            <section className="content">
                <div className="row">
                    <div className="col-md-4 col-sm-6 col-xs-12">
                        <div className="info-box">
                            <span className="info-box-icon bg-green"><i className="fa fa-hand-o-right" /></span>
                            <div className="info-box-content">
                                <span className="info-box-text">Course Categories</span>
                                <span className="info-box-number">16</span>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 col-sm-6 col-xs-12">
                        <div className="info-box">
                            <span className="info-box-icon bg-green"><i className="fa fa-hand-o-right" /></span>
                            <div className="info-box-content">
                                <span className="info-box-text">Courses</span>
                                <span className="info-box-number">9</span>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 col-sm-6 col-xs-12">
                        <div className="info-box">
                            <span className="info-box-icon bg-green"><i className="fa fa-hand-o-right" /></span>
                            <div className="info-box-content">
                                <span className="info-box-text">Users</span>
                                <span className="info-box-number">4</span>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 col-sm-6 col-xs-12">
                        <div className="info-box">
                            <span className="info-box-icon bg-green"><i className="fa fa-hand-o-right" /></span>
                            <div className="info-box-content">
                                <span className="info-box-text">Sliders</span>
                                <span className="info-box-number">2</span>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 col-sm-6 col-xs-12">
                        <div className="info-box">
                            <span className="info-box-icon bg-green"><i className="fa fa-hand-o-right" /></span>
                            <div className="info-box-content">
                                <span className="info-box-text">FAQs</span>
                                <span className="info-box-number">6</span>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 col-sm-6 col-xs-12">
                        <div className="info-box">
                            <span className="info-box-icon bg-green"><i className="fa fa-hand-o-right" /></span>
                            <div className="info-box-content">
                                <span className="info-box-text">Features</span>
                                <span className="info-box-number">3</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}