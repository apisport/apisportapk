import React from 'react'
import Helmet from 'react-helmet'
import Link from 'next/link'
import { useSession, signIn, signOut } from 'next-auth/react'
import useSWR from 'swr'

const NavbarPesan = () => {
    const { data: session, status } = useSession()

    const fetcher = (...args) => fetch(...args).then((res) => res.json())
    let url = ''
    if (session) {
        url = `/api/navbarpesandb?emailReq=${session.user.email}`
    }
    const { data: data, error } = useSWR(url, fetcher, {refreshInterval: 1000})

    if (!data) {
        return <li></li>
    } else if (error) {
        return <div>Something went wrong</div>
    }

    let transaksi = data['message']
    // console.log(transaksi)

    return (
        <>
                <li className="nav-item">
<a className="nav-link" onClick={() => { window.location.href = '/list-nota'; }}> Nota <span className='numberCircle'>{transaksi.diterima.length}</span></a>
                </li>

                <li className="nav-item">
                <a className="nav-link" onClick={() => { window.location.href = '/pesanan-pending'; }}> Pending <span className='numberCircle'>{transaksi.pending.length + transaksi.notifikasi.length}</span></a>
                </li>
        </>

    )
}

export default NavbarPesan;
