import React from 'react'
import Router, { useRouter } from 'next/router'
import Link from 'next/link'
import router from 'next/router';
import Navbar from '../../components/user/Navbar'
import Footer from '../../components/user/Footer'
import Helmet from 'react-helmet'
import { useSession, signIn, signOut } from 'next-auth/react'
import useSWR from 'swr';
import Head from 'next/head';


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
                <Head>
                    <meta name="application-name" content="PWA App" />
                    <meta name="apple-mobile-web-app-capable" content="yes" />
                    <meta name="apple-mobile-web-app-status-bar-style" content="default" />
                    <meta name="apple-mobile-web-app-title" content="PWA App" />
                    <meta name="description" content="Best PWA App in the world" />
                    <meta name="format-detection" content="telephone=no" />
                    <meta name="mobile-web-app-capable" content="yes" />
                    <meta name="msapplication-config" content="/icons/browserconfig.xml" />
                    <meta name="msapplication-TileColor" content="#2B5797" />
                    <meta name="msapplication-tap-highlight" content="no" />
                    <meta name="theme-color" content="#000000" />

                    <link rel="apple-touch-icon" href="/icons/touch-icon-iphone.png" />
                    <link rel="apple-touch-icon" sizes="152x152" href="/icons/touch-icon-ipad.png" />
                    <link rel="apple-touch-icon" sizes="180x180" href="/icons/touch-icon-iphone-retina.png" />
                    <link rel="apple-touch-icon" sizes="167x167" href="/icons/touch-icon-ipad-retina.png" />

                    <link rel="icon" type="image/png" sizes="32x32" href="/icons/favicon-32x32.png" />
                    <link rel="icon" type="image/png" sizes="16x16" href="/icons/favicon-16x16.png" />
                    <link rel="manifest" href="/manifest.json" />
                    <link rel="mask-icon" href="/icons/safari-pinned-tab.svg" color="#5bbad5" />
                    <link rel="shortcut icon" href="/favicon.ico" />
                    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500" />

                    <meta name="twitter:card" content="summary" />
                    <meta name="twitter:url" content="https://yourdomain.com" />
                    <meta name="twitter:title" content="PWA App" />
                    <meta name="twitter:description" content="Best PWA App in the world" />
                    <meta name="twitter:image" content="https://yourdomain.com/icons/android-chrome-192x192.png" />
                    <meta name="twitter:creator" content="@DavidWShadow" />
                    <meta property="og:type" content="website" />
                    <meta property="og:title" content="PWA App" />
                    <meta property="og:description" content="Best PWA App in the world" />
                    <meta property="og:site_name" content="PWA App" />
                    <meta property="og:url" content="https://yourdomain.com" />
                    <meta property="og:image" content="https://yourdomain.com/icons/apple-touch-icon.png" />
                </Head>
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
