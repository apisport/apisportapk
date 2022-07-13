import React from 'react'
import Router, { useRouter } from 'next/router'
import Link from 'next/link'
import router from 'next/router';
import Helmet from 'react-helmet'


const LayoutDev = ({ children }) => {

    return (
        <div >
            <Helmet>
                <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/js/bootstrap.min.js" integrity="undefined" crossorigin="anonymous"></script>
                <script src="../styles/bootstrap/js/bootstrap.min.js"></script>
            </Helmet>
            <div>
                <div className="navbar navbar-dark bg-dark shadow-sm">
                    <div className="container">
                        <a href="#" className="navbar-brand d-flex align-items-center">
                            <strong>Dev Mode</strong>
                        </a>
                        <a className='btn btn-outline text-white' href='/dev/home'>Home</a>
                        <a className='btn btn-outline text-white' href='/'>Logout</a>
                    </div>
                </div>
            </div>

            {children}
            <Helmet>
                <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/js/bootstrap.min.js" integrity="undefined" crossorigin="anonymous"></script>
                <script src="../styles/bootstrap/js/bootstrap.min.js"></script>
            </Helmet>
        </div>

    )
}
export default LayoutDev
