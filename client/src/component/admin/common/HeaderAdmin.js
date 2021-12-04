import React, { useEffect, useState } from 'react'

export default function HeaderAdmin() {
    return (
        <header className="main-header">
            <a href="https://phpscriptpoint.com/cc/courseplus/admin/dashboard" className="logo">
                <span className="logo-lg">CoursePlus</span>
            </a>
            <nav className="navbar navbar-static-top">
                <a href="#" className="sidebar-toggle" data-toggle="offcanvas" role="button">
                    <span className="sr-only">Toggle navigation</span>
                </a>
                <span className="fl-l lh-50 c-fff fz-18 pl_15">Admin Panel</span>
                <div className="navbar-custom-menu">
                    <ul className="nav navbar-nav">
                        <li>
                            <a href="https://phpscriptpoint.com/cc/courseplus/" target="_blank">Visit Website</a>
                        </li>
                        <li className="dropdown user user-menu">
                            <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                                <img src="https://phpscriptpoint.com/cc/courseplus/public/uploads/user-1.jpg" className="user-image" alt="user photo" />
                                <span className="hidden-xs" />
                            </a>
                            <ul className="dropdown-menu">
                                <li className="user-footer">
                                    <div>
                                        <a href="https://phpscriptpoint.com/cc/courseplus/admin/profile" className="btn btn-default btn-flat">Edit Profile</a>
                                    </div>
                                    <div>
                                        <a href="https://phpscriptpoint.com/cc/courseplus/admin/login/logout" className="btn btn-default btn-flat">Log out</a>
                                    </div>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </nav>
        </header>

    )

}