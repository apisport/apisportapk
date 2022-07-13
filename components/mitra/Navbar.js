import React from 'react'
import useSWR from 'swr'
import Link from 'next/link'
import { useSession, signIn, signOut } from 'next-auth/react'

const Navbar = ({ namaVenueProps }) => {
    const fetcher = (...args) => fetch(...args).then((res) => res.json())
    const { data: data, error } = useSWR(`/api/countnotifmitradb?namaVenueReq=${namaVenueProps}`, fetcher, {refreshInterval: 1000})
    const { data: session, status } = useSession()

    if (!data) {
        return <div>Loading...</div>
    } else if (error) {
        return <div>Something went wrong</div>
    }


    let transaksi = data['message']

    const handleSignOut = (e) => {
        signOut({ callbackUrl: '/' })
    }
    // let transaksiPending = transaksi.filter(data => data.opsiBayar != "Full Bayar" && data.status == 'pending')
    // let transaksiDPBelumLunas = transaksi.filter(data => data.opsiBayar == "DP" && data.status == 'diterima')
    // let transaksiBayarDiTempat = transaksi.filter(data => data.opsiBayar == "Bayar di Tempat" && data.status == 'diterima')

    // let total = transaksiPending.length + transaksiDPBelumLunas.length + transaksiBayarDiTempat.length

    return (
        <>
            <nav className="navbar navbar-expand-lg  navbar-light">
                <a href="#">
                    <img style={{ marginRight: '0.75rem', height: '50px' }} src="/y.png" alt />
                </a>
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
                            <div className="modal-body" style={{ padding: '2rem', paddingTop: 0, paddingBottom: 0 }}>
                                <ul className="navbar-nav responsive me-auto mt-2 mt-lg-0">
                                    <li className="nav-item">
                                        <a className="nav-link" href="/mitra/home">Beranda</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="/mitra/transaksi-pending">Notifikasi <span className='numberCircle'>{transaksi.length}</span></a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="/mitra/data-transaksi">Pembukuan Transaksi</a>
                                    </li>
                                    <li className="nav-item">
                                        <div className="dropdown mb-3">
                                            <a href="#" className="d-flex align-items-center link-dark text-decoration-none dropdown-toggle" id="dropdownUser2" data-bs-toggle="dropdown" aria-expanded="true">
                                                <img src={session.user.image} alt width={32} height={32} className="rounded-circle me-2" />
                                                <strong>Admin</strong>
                                            </a>
                                            <ul className="dropdown-menu text-small shadow" aria-labelledby="dropdownUser2" >
                                                <li><a className="dropdown-item" onClick={handleSignOut}>Sign out</a></li>
                                            </ul>
                                        </div>

                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="collapse navbar-collapse" id="navbarTogglerDemo">
                    <ul className="navbar-nav me-auto mt-2 mt-lg-0">
                        <li className="nav-item">
                            <a className="nav-link" href="/mitra/home">Beranda</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/mitra/transaksi-pending">Notifikasi <span className='numberCircle'>{transaksi.length}</span></a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/mitra/data-transaksi">Pembukuan Transaksi</a>
                        </li>
                    </ul>
                    <div className="gap-3">
                        <div className="dropdown">
                            <a href="#" className="d-flex align-items-center link-dark text-decoration-none dropdown-toggle" id="dropdownUser2" data-bs-toggle="dropdown" aria-expanded="false">
                                <img src={session.user.image} alt width={32} height={32} className="rounded-circle me-2" />
                                <strong>Admin</strong>
                            </a>
                            <ul className="dropdown-menu text-small shadow" aria-labelledby="dropdownUser2">
                                <li><a className="dropdown-item" onClick={handleSignOut}>Sign out</a></li>
                            </ul>
                        </div>
                    </div>
                </div>

            </nav>
        </>
    )
}

export default Navbar;
