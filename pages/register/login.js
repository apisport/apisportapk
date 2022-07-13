//@ts-check
import { useRouter } from 'next/router';
import { useSession, signIn, signOut } from 'next-auth/react'
import { useEffect } from 'react';
import useSWR from 'swr';
import Link from 'next/link';
import Router from 'next/router';


export default function Login() {
    const { data: session, status } = useSession()

    let router = useRouter()
    const handleSignOut = (e) => {
        signOut({ callbackUrl: '/' })
    }

    const fetcher = (...args) => fetch(...args).then((res) => res.json())
    let url = ''
    if (session) {
        url = `/api/checkmail?emailReq=${session.user.email}`
    }
    const { data: data, error } = useSWR(url, fetcher)

    if (!data) {
        return <div>Access denied</div>
    } else if (error) {
        return <div>Something went wrong</div>
    }

    let emailDb = data['message']
    console.log(emailDb)


        if (session) {
            if (emailDb.mitra.length === 0 && emailDb.user.length === 0 && emailDb.mitraPending.length === 0) {
                alert('Anda belum terdaftar, Mohon untuk register')
                handleSignOut()
            } else if (emailDb.user.length != 0) {
                Router.push('/')
            } else if (emailDb.mitra.length != 0) {
                Router.push('/mitra/home')
            } else if (emailDb.mitraPending.length != 0) {
                alert('Mohon Tunggu untuk persetujuan kami :)')
                handleSignOut()
            }
        }


    return (
        <>
            {session &&
                <div><h3 className='text-white'>Logged In</h3></div>
            }
            {!session &&
                <div><h2 className='text-white'>Not Logged In</h2></div>
            }
        </>
    )


}
