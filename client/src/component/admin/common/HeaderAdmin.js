import React, { useEffect, useState } from 'react'

export default function HeaderAdmin() {
    return (
        <header className="main-header">
            <a className="logo">
                <span className="logo-lg"> ALED</span>
            </a>
            <nav className="navbar navbar-static-top">
                <a href="#" className="sidebar-toggle" data-toggle="offcanvas" role="button">
                    <span className="sr-only">Toggle navigation</span>
                </a>
                <div className="navbar-custom-menu">
                    <ul className="nav navbar-nav">
                        <li>
                            <a href='/home'>Home</a>
                        </li>
                        
                    </ul>
                </div>
            </nav>
        </header>

    )

}