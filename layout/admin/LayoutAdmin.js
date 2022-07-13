import React from 'react'
import Router, { useRouter } from 'next/router'
import Link from 'next/link'
import router from 'next/router';
import Navbar from '../../components/mitra/Navbar'
import Footer from '../../components/user/Footer'
import Helmet from 'react-helmet'
import useSWR from 'swr';
import { useSession, signIn, signOut } from 'next-auth/react'



const LayoutAdmin = ({ children }) => {

    //Session
    const { data: session, status } = useSession()
    const fetcher = (...args) => fetch(...args).then((res) => res.json())
    let url = ''
    // url = `/api/checkmail?emailReq=${`ucihaar6@gmail.com`}`
    // url = `/api/checkmail?emailReq=${`wowmissqueen@gmail.com`}`
    if (session) {
        url = `/api/checkmail?emailReq=${session.user.email}`
    }
    const { data: data, error } = useSWR(url, fetcher)

    if (!data) {
        return (<> <div className="spinner"></div><div className='d-flex flex-row justify-content-center'>Anda tidak Memiliki akses untuk halaman ini<Link href={'./'}>silahkanlogin</Link></div></>
       )
    } else if (error) {
        return <div>Something went wrong</div>
    }
    let emailDb = data['message']
    //End

    //Session
    if (session) {
        if (emailDb.user.length != 0 || emailDb.mitraPending.length != 0) {
            return (
                <div>Anda tidak Memiliki akses untuk halaman ini</div>
            )
        } else {
            return (
                <div className="container-xxl mx-auto p-0  position-relative header-2-2" style={{ fontFamily: '"Poppins", sans-serif' }}>
                    <Helmet>
                        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/js/bootstrap.min.js" integrity="undefined" crossorigin="anonymous"></script>
                        <script src="../styles/bootstrap/js/bootstrap.min.js"></script>
                    </Helmet>
                    <Navbar namaVenueProps={emailDb.namaVenue[0].namaVenue}></Navbar>
                    {
                        React.cloneElement(children, {
                            namaVenueProps: emailDb.namaVenue[0].namaVenue
                        })
                    }
                    {/* {children} */}
                    <Footer></Footer>
                    <Helmet>
                        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/js/bootstrap.min.js" integrity="undefined" crossorigin="anonymous"></script>
                        <script src="../styles/bootstrap/js/bootstrap.min.js"></script>
                    </Helmet>
                </div>
            )
        }
    } else {
        return (
            <div>Anda tidak Memilik akses untuk halaman ini</div>
        )
    }
    //End

    // return (
    //     <div className="container-xxl mx-auto p-0  position-relative header-2-2" style={{ fontFamily: '"Poppins", sans-serif' }}>
    //         <Helmet>
    //             <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/js/bootstrap.min.js" integrity="undefined" crossorigin="anonymous"></script>
    //             <script src="../styles/bootstrap/js/bootstrap.min.js"></script>
    //         </Helmet>
    //         <Navbar></Navbar>
    //         {
    //             React.cloneElement(children, {
    //                 namaVenueProps: emailDb.namaVenue[0].namaVenue
    //             })
    //         }
    //         {/* {children} */}
    //         <Footer></Footer>
    //         <Helmet>
    //             <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/js/bootstrap.min.js" integrity="undefined" crossorigin="anonymous"></script>
    //             <script src="../styles/bootstrap/js/bootstrap.min.js"></script>
    //         </Helmet>
    //     </div>

    // )
}
export default LayoutAdmin
