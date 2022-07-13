import React from 'react'
import Router, { useRouter } from 'next/router'
import Link from 'next/link'
import router from 'next/router';
import Navbar from '../../components/user/Navbar'
import Footer from '../../components/user/Footer'
import Helmet from 'react-helmet'
import { useSession, signIn, signOut } from 'next-auth/react'
import useSWR from 'swr';


const LayoutUser = ({ children }) => {
    //Session
    const { data: session, status } = useSession()
    const fetcher = (...args) => fetch(...args).then((res) => res.json())
    let url = ''
    const handleSignOut = (e) => {
        signOut('GOOGLE_ID', { callbackUrl: '/' })
    }
    // url = `/api/checkmail?emailReq=${`ucihaar6@gmail.com`}`
    // url = `/api/checkmail?emailReq=${`wowmissqueen@gmail.com`}`
    if (session) {
        url = `/api/checkmail?emailReq=${session.user.email}`
    }
    const { data: data, error } = useSWR(url, fetcher)

    if (!data) {
        return (
            <div className="container-xxl mx-auto p-0  position-relative header-2-2" style={{ fontFamily: '"Poppins", sans-serif' }}>

                <Helmet>
                    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/js/bootstrap.min.js" integrity="undefined" crossorigin="anonymous"></script>
                    <script src="../styles/bootstrap/js/bootstrap.min.js"></script>

                </Helmet>
                <Navbar></Navbar>
                {children}
                <Footer></Footer>
                <Helmet>
                    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/js/bootstrap.min.js" integrity="undefined" crossorigin="anonymous"></script>
                    <script src="../styles/bootstrap/js/bootstrap.min.js"></script>
                </Helmet>
            </div>

        )
    } else if (error) {
        return <div>Something went wrong</div>
    }
    let emailDb = data['message']
    //End

    if (session) {
        if (emailDb.mitra.length != 0 || emailDb.mitraPending.length != 0) {
            return (
                <>
                <div>Akun Mitra tidak dapat mengakses untuk halaman ini, mohon untuk Sign Out terlebih dahulu</div>
                {/* <button className='btn btn-primary' onClick={handleSignOut()}>Sign Out</button> */}
                </>
                
            )
        } else {
            return (
                <div className="container-xxl mx-auto p-0  position-relative header-2-2" style={{ fontFamily: '"Poppins", sans-serif' }}>

                    <Helmet>
                        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/js/bootstrap.min.js" integrity="undefined" crossorigin="anonymous"></script>
                        <script src="../styles/bootstrap/js/bootstrap.min.js"></script>

                    </Helmet>
                    <Navbar></Navbar>
                    {children}
                    <Footer></Footer>
                    <Helmet>
                        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/js/bootstrap.min.js" integrity="undefined" crossorigin="anonymous"></script>
                        <script src="../styles/bootstrap/js/bootstrap.min.js"></script>
                    </Helmet>
                </div>
            )
        }
    }
    // return (
    //     <div className="container-xxl mx-auto p-0  position-relative header-2-2" style={{ fontFamily: '"Poppins", sans-serif' }}>

    //         <Helmet>
    //             <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/js/bootstrap.min.js" integrity="undefined" crossorigin="anonymous"></script>
    //             <script src="../styles/bootstrap/js/bootstrap.min.js"></script>

    //         </Helmet>
    //         <Navbar></Navbar>
    //         {children}
    //         <Footer></Footer>
    //         <Helmet>
    //             <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/js/bootstrap.min.js" integrity="undefined" crossorigin="anonymous"></script>
    //             <script src="../styles/bootstrap/js/bootstrap.min.js"></script>
    //         </Helmet>
    //     </div>

    // )
}
export default LayoutUser
