import React from 'react'
import Router, { useRouter } from 'next/router'
import Link from 'next/link'
import router from 'next/router';
import Navbar from '../../components/user/Navbar'
import Footer from '../../components/user/Footer'
import Helmet from 'react-helmet'


const LayoutUser = ({ children }) => {
    return (
        <div className="container-xxl mx-auto p-0  position-relative header-2-2" style={{ fontFamily: '"Poppins", sans-serif' }}>

            <Helmet>
                <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/js/bootstrap.min.js" integrity="undefined" crossorigin="anonymous"></script>
                <script src="../styles/bootstrap/js/bootstrap.min.js"></script>

            </Helmet>
            {children}
            <Footer></Footer>
            <Helmet>
                <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/js/bootstrap.min.js" integrity="undefined" crossorigin="anonymous"></script>
                <script src="../styles/bootstrap/js/bootstrap.min.js"></script>
            </Helmet>
        </div>

    )
}
export default LayoutUser
