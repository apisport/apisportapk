import useSWR from 'swr'
import { useSession } from 'next-auth/react'
import moment from 'moment'
import CardListPending from '../components/user/pesanan-pending/CardListPending'
import CardListPendingBelumBayar from '../components/user/pesanan-pending/CardListPendingBelumBayar'

export default function PesananPending() {
    const {data: session} = useSession()
    const fetcher = (...args) => fetch(...args).then((res) => res.json())
    let url = ''
    if (session) {
        url = `/api/transaksipendinguserdb?emailReq=${session.user.email}`
    }
    const { data: data, error } = useSWR(url, fetcher, { refreshInterval: 1000 })

    if (!data) {
        return <div>Anda tidak memiliki akses untuk halaman ini</div>
    } else if (error) {
        return <div>Something went wrong</div>
    }


    let transaksi = data['message']
    console.log(transaksi)

    const deleteNotifikasi = async (e) => {
        try {
            // Delete post
            await fetch('/api/transaksipendinguserdb', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    emailReq: session.user.email
                }),
            });
            // reset the deleting state
            // reload the page
        } catch (error) {
            // stop deleting state
        }
    }

    return (
        <>
            <div className="container my-2">
                <hr></hr>
                <h4><b>Transaksi Pending</b></h4>
                <hr></hr>
                <CardListPending props={transaksi.pending} />
                <hr></hr>
                <h4><b>Transaksi Pending Belum Bayar</b></h4>
                <h5 style={{color:'red'}}><b>Mohon Lakukan Pembayaran atau transaksi akan otomatis di batalkan</b></h5>
                <CardListPendingBelumBayar props={transaksi.belumBayar} />
                <hr></hr>
                <h4><b>Transaksi Ditolak</b></h4>
                {transaksi.notifikasi.length != 0 &&
                    <button className='btn btn-danger' onClick={deleteNotifikasi}>Hapus Semua</button>
                }
                <div className='row mt-3'>
                    {transaksi.notifikasi.length === 0 ? (
                        <h3>Tidak ada notifikasi</h3>
                    ) : (
                        <>
                            {transaksi.notifikasi.map((data, index) => (

                                <div className='card mt-3 p-2'>
                                    {data.status === 'ditolak' &&
                                        <div>
                                            <h4><b>Pesanan Ditolak</b></h4>
                                            <span><b>Nama Venue:</b> {data.namaVenue}</span><br></br>
                                            <span><b>Lapangan:</b> {data.lapangan}</span><br></br>
                                            <span><b>Dibuat:</b> {data.diterima}</span><br></br>
                                            <span><b>Tgl Main:</b> {moment(data.tglMain, 'YYYY-MM-DD').format('DD/MM/YYYY')}</span>
                                        </div>
                                    }
                                </div>
                            ))}

                        </>
                    )}



                </div>
                <hr></hr>






            </div>
        </>
    )

}
// export async function getServerSideProps(ctx) {
//     // get the current environment
//     let dev = process.env.NODE_ENV !== 'production';
//     let { DEV_URL, PROD_URL } = process.env;
//     // request posts from api
//     //let response = await fetch(`${dev ? DEV_URL : PROD_URL}/api/transaksidb`);
//     let response = await fetch(`http://localhost:3000/api/transaksidb`);
//     // extract the data
//     let data = await response.json();
//     return {
//         props: {
//             transaksi: data['message'],
//         },
//     };
// }