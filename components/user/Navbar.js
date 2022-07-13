import React from 'react'
import Helmet from 'react-helmet'
import Link from 'next/link'
// import { useSession, signIn, signOut } from 'next-auth/react'
// import NavbarPesan from './pesananNavbar'
// import useSWR from 'swr'

const Navbar = () => {
    // const fetcher = (...args) => fetch(...args).then((res) => res.json())
    // let url = ''
    // if (session) {
    //     url = `/api/navbarpesandb?emailReq=${session.user.email}`
    // }
    // const { data: data, error } = useSWR(url, fetcher)

    // if (!data) {
    //     return <div>Tidak ada data</div>
    // } else if (error) {
    //     return <div>Error</div>
    // }

    // let transaksi = data['message']
    // console.log(transaksi)

    // const { data: session } = useSession();

    const handleSignout = (e) => {
        e.preventDefault()
        signOut({callbackUrl: '/'})
    }
    const handleLogin = (e) => {
        e.preventDefault()
        signIn('GOOGLE_ID', { callbackUrl: '/register/login' })
    }
    

    return (
        <>
            <nav className="navbar navbar-expand-lg  navbar-light">
                
                <img style={{ marginRight: '0.75rem', height: '50px' }} src="/y.png" alt />

                <button className="navbar-toggler border-0" type="button" data-bs-toggle="modal" data-bs-target="#targetModal-item">
                    <span className="navbar-toggler-icon" />
                </button>
                <div className="modal-item modal fade" id="targetModal-item" tabIndex={-1} role="dialog" aria-labelledby="targetModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content bg-white border-0">
                            <div className="modal-header border-0" style={{ padding: '2rem', paddingBottom: 0 }}>
                                <a className="modal-title" id="targetModalLabel">
                                    <img style={{ marginRight: '0.75rem', height: '50px' }} src="./y.png" alt />
                                </a>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                            </div>
                            <div className="modal-body" tabindex="-1" role="dialog" style={{ padding: '2rem', paddingTop: 0, paddingBottom: 0 }}>
                                <ul className="navbar-nav responsive me-auto mt-2 mt-lg-0">
                                    <li className="nav-item" >
                                        <a className="nav-link" onClick={() => { window.location.href = '/'; }}>Beranda</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" onClick={() => { window.location.href = '/lapangan'; }}>Lapangan</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" onClick={() => { window.location.href = '/tentang-kami'; }}>Tentang Kami</a>
                                    </li>
                                    {/* {session &&
                                        <li className="nav-item">
                                            <Link href={'/list-nota'}><a className="nav-link" > Nota <span className='numberCircle'>123</span></a></Link>
                                        </li>
                                    }
                                    {session &&
                                        <li className="nav-item">
                                            <Link href={'/pesanan-pending'}><a className="nav-link" > Pesanan Pending <span className='numberCircle'>123</span></a></Link>
                                        </li>
                                    } */}
                                    {/* <NavbarPesan/> */}
                                </ul>
                            </div>
                            {/* <div className="modal-footer border-0 gap-3" style={{ padding: '2rem', paddingTop: '0.75rem' }}>
                                {session &&
                                    <div className="dropdown mb-3">
                                        <a href="#" className="d-flex align-items-center link-dark text-decoration-none dropdown-toggle" id="dropdownUser2" data-bs-toggle="dropdown" aria-expanded="true">
                                            <img src={session.user.image} alt width={32} height={32} className="rounded-circle me-2" />
                                            <strong>{session.user.name}</strong>
                                        </a>
                                        <ul className="dropdown-menu text-small shadow" aria-labelledby="dropdownUser2" >
                                            <li><Link href={{
                                                pathname: '/profil',
                                                query: {
                                                    email: session.user.email
                                                }

                                            }}><a className="dropdown-item">Profil</a></Link></li>
                                            <li><hr className="dropdown-divider" /></li>
                                            <li><a className="dropdown-item" onClick={handleSignout}>Sign out</a></li>
                                        </ul>
                                    </div>
                                }
                                {!session &&
                                    <>
                                        <button onClick={handleLogin} className="btn btn-default btn-no-fill">Log In</button>
                                        <Link href='/register'><button className="btn btn-fill text-white">Register</button></Link>
                                    </>
                                }

                            </div> */}
                        </div>
                    </div>
                </div>
                <div className="collapse navbar-collapse" id="navbarTogglerDemo">
                    <ul className="navbar-nav me-auto mt-2 mt-lg-0">
                        <li className="nav-item">
                            <Link href="/"><a className="nav-link">Beranda</a></Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" href="/lapangan"><a className="nav-link">Lapangan</a></Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" href="/tentang-kami"><a className="nav-link">Tentang Kami</a></Link>
                        </li>
                        {/* {session &&
                            <li className="nav-item">
                                <Link href={'/list-nota'}><a className="nav-link" > Nota <span className='numberCircle'>123</span></a></Link>
                            </li>
                        }
                        {session &&
                            <li className="nav-item">
                                <Link href={'/pesanan-pending'}><a className="nav-link" > Pesanan Pending <span className='numberCircle'>123</span></a></Link>
                            </li>
                        } */}
                        {/* <NavbarPesan /> */}


                    </ul>
                    {/* <div className="gap-3">
                        {session &&
                            <div className="dropdown mb-3">
                                <a href="#" className="d-flex align-items-center link-dark text-decoration-none dropdown-toggle" id="dropdownUser2" data-bs-toggle="dropdown" aria-expanded="true">
                                    <img src={session.user.image} alt width={32} height={32} className="rounded-circle me-2" />
                                    <strong>{session.user.name}</strong>
                                </a>
                                <ul className="dropdown-menu text-small shadow" aria-labelledby="dropdownUser2" >
                                    <li><Link href={{
                                        pathname: '/profil',
                                        query: {
                                            email: session.user.email
                                        }

                                    }}><a className="dropdown-item">Profil</a></Link></li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li><a className="dropdown-item" onClick={handleSignout}>Sign out</a></li>
                                </ul>
                            </div>
                        }
                        {!session &&
                            <>
                                <button onClick={handleLogin} className="btn btn-default btn-no-fill">Log In</button>
                                <Link href='/register'><button className="btn btn-fill text-white">Register</button></Link>
                            </>
                        }

                    </div> */}
                </div>
            </nav>
        </>
    )
}

export default Navbar;
