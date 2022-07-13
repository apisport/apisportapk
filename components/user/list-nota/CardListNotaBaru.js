import { Router } from "next/router";
import Link from "next/link";

export default function CardListNotaBaru({ props }) {
    return (
        <>
            {props.length === 0 ? (
                <h2>Tidak ada Nota Baru</h2>
            ) : (
                <>
                    {props.map((data, index) => (
                        <div className="shadow-sm col-12 col-lg-5 border border-2 mb-1 p-3 text-start">
                            <h1><b>{data.namaVenue}</b></h1>
                            <h4><b>Nama Pemesan:</b> {data.nama}</h4>
                            <h4><b>Tim:</b> {data.tim}</h4>
                            <h4><b>Lapangan:</b> {data.lapangan}</h4>
                            <h4><b>Opsi Pembayaran:</b> {data.opsiBayar}</h4>
                            <h4><b>Total Bayar:</b> {` Rp ${data.harga.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".")}`}</h4>
                            <hr></hr>
                            <h5><b>Dikirim:</b> {data.diterima}</h5>
                            <h5><b>Tanggal Main:</b> {data.tglMain}</h5>
                            <hr></hr>
                            <h5 ><b>Status: {data.status.charAt(0).toUpperCase() + data.status.slice(1)}</b></h5>
                            <hr></hr>
                            <Link href={{
                                pathname: '/nota',
                                query: {
                                    idTransaksi: data._id,
                                    kodeNota: data._id.substring(0,8)
                                }
                            }} >
                                <a className="btn btn-success text-white p-3 mb-2">Lihat Nota</a>
                            </Link>

                        </div>
                    ))}
                </>
            )}


        </>

    )
}

