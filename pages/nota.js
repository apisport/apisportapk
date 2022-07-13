//@ts-check
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useSession, signIn } from 'next-auth/react'
import useSWR from "swr";

export default function Nota() {
    //Router
    let router = useRouter()
    const { idTransaksi, kodeNota } = router.query
    const { data: session } = useSession()

    //Suwir
    const fetcher = (...args) => fetch(...args).then((res) => res.json())
    let url = ''
    url = `/api/detailnotifikasidb?idTransaksiReq=${idTransaksi}`
    const { data: data, error } = useSWR(url, fetcher)

    if (!data) {
        return <div>Access denied</div>
    } else if (error) {
        return <div>Something went wrong</div>
    }

    //Deklarasi Array JSON SWR
    let nota = data['message'][0]
    console.log(nota)

    if (session) {
        return (
            <div>

                <div>
                    <div className="container">
                        <div>
                            <h1 className="justify-content-center mt-3">
                                <center><b>NOTA</b></center>
                            </h1>
                            <div className="d-flex flex-row p-0 justify-content-center">
                                <span>Kode Nota: {kodeNota}</span>
                            </div>
                            <hr></hr>
                        </div>
                        <div className="container mb-3">
                            <div className="row justify-content-center">
                                <div className="col-md-10">
                                    <div className="card">
                                        {/* <div className="d-flex flex-row p-2 justify-content-center">
                                            <img src="https://laptopnesia.com/wp-content/uploads/2019/01/Cara-Membuat-Barcode-5-1.jpg" width='200' />
                                        </div> */}
                                        <div className="container-xxl mt-3">
                                            <h3><b>{nota.namaVenue}</b></h3>
                                            <h5>{nota.lapangan}</h5>
                                            <div className="row">
                                                {nota.jadwalMain.map((data, index) => (
                                                    <>
                                                        <div className='col-12 col-sm-4 mb-2'>
                                                            <div className='card'>
                                                                <div className='card-body'>
                                                                    <h3>{data}</h3>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </>
                                                ))}
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="d-flex flex-row justify-content-center">
                                            <div className="form-group">
                                                <label>Nama Pemesan : </label>
                                                <input type="email" className="form-control" value={nota.nama} readOnly />
                                            </div>
                                        </div>
                                        <div className="d-flex flex-row justify-content-center">
                                            <div className="form-group">
                                                <label>Nama Tim : </label>
                                                <input type="email" className="form-control" value={nota.tim} readOnly />
                                            </div>
                                        </div>
                                        <div className="d-flex flex-row justify-content-center">
                                            <div className="form-group">
                                                <label>No. WA Pemesan: </label>
                                                <input type="email" className="form-control" value={nota.noWa} readOnly />
                                            </div>
                                        </div>
                                        <div className="d-flex flex-row justify-content-center">
                                            <div className="form-group">
                                                <label>No. Rekening Venue: </label>
                                                <input type="email" className="form-control" value={nota.noRekening} readOnly />
                                            </div>
                                        </div>
                                        <div className="d-flex flex-row justify-content-center">
                                            <div className="form-group">
                                                <label>Opsi Pembayaran : </label>
                                                <input type="email" className="form-control" value={nota.opsiBayar} readOnly />
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="d-flex flex-row justify-content-center">
                                            <div className="form-group">
                                                <label>Total Bayar : </label>
                                                <input type="email" className="form-control" value={` Rp ${nota.harga.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".")}`} readOnly />
                                            </div>
                                            
                                        </div>
                                        {nota.opsiBayar === 'DP' &&
                                            <div className="d-flex flex-row justify-content-center">
                                                <div className="form-group">
                                                    <label>Harga DP : </label>
                                                    <input type="email" className="form-control" value={` Rp ${nota.hargaDP.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".")}`} readOnly />
                                                </div>
                                            </div>
                                            
                                        }
                                        <hr />
                                        <div className="address p-2">
                                        </div>
                                        <div className="container text-center mb-3">
                                            <h4>Tunjukkan Nota ini saat datang ke lapangan yang Anda pesan</h4>
                                        </div>
                                        <div className="container text-center">
                                            <span>© Api Sport Team - 2022</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div></div>

        )
    } else {
        <div>Anda tidak memiliki akses untuk halaman ini</div>
    }
}
