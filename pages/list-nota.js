import { useState } from 'react';
import { useRouter } from 'next/router';
import { useSession, signIn } from 'next-auth/react'
import useSWR from 'swr';
import Link from 'next/link';
import moment from 'moment';
import CardListNota from '../components/user/list-nota/CardListNota';
import CardListNotaBaru from '../components/user/list-nota/CardListNotaBaru';

export default function ListNota() {
    const { data: session, status } = useSession()

    const fetcher = (...args) => fetch(...args).then((res) => res.json())
    let url = ''
    if (session) {
        url = `/api/listnotadb?emailReq=${session.user.email}`
    }
    const { data: data, error } = useSWR(url, fetcher)

    if (!data) {
        return <div className='my-5'>Anda tidak memilik akses untuk halaman ini</div>
    } else if (error) {
        return <div>Something went wrong</div>
    }

    let transaksi = data['message']
    // console.log(transaksi)
    let notaBaru = []
    for (let i = 0; i < transaksi.length; i++) {
        var now = moment(new Date()); //todays date
        var end = moment(transaksi[i].tglMain); // another date
        var duration = moment.duration(now.diff(end));
        var days = Math.floor(duration.asDays());
        if(days <= 0 ){
            notaBaru.push(transaksi[i])
        }
    }
    console.log('Nota Baru')
    console.log(notaBaru)


    return (

        <div className="container my-2">
            <h1 className='mt-5'><b>List Nota yang telah Diterima</b></h1>
            <hr></hr>
            <h4><b>Nota Baru</b></h4>
            <hr></hr>
            <div className="row row-cols-1 row-cols-md-3 g-4 mt-1">
                <CardListNotaBaru props={notaBaru}/>
                

            </div>
            <hr></hr>
            <h4><b>Nota Lainnya</b></h4>
            <hr></hr>
            

                <CardListNota props={transaksi}/>




        </div>
    )

}