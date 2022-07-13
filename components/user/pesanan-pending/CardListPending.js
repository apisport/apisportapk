import { Router } from "next/router";
import Link from "next/link";
import { useState } from "react";
import Pagination from "../../Pagination";

export default function CardListPending({ props }) {
    const [currentPage, setCurrentPage] = useState(1)
    const [postsPerPage, setPostsPerPage] = useState(4)
    const [filterSearch, setFilterSearch] = useState('')
    const [searchTerm, setSearchTerm] = useState('')

    let searchArr = props.filter((tblDat) => {
        if (searchTerm == "") {
            return tblDat
        } else if (tblDat.namaVenue.toLowerCase().includes(searchTerm.toLowerCase())) {
            return tblDat
        }
    })

    //Tambahan Pagination
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    //Fixed Pagintion CurrentPosts hapus filter di bawah
    let currentPosts = searchArr.slice(indexOfFirstPost, indexOfLastPost)
    //Fixed Pagination CurrentPosts
    const howManyPages = Math.ceil(searchArr.length / postsPerPage)
    //Tambahan Pagination Current Post Map

    return (
        <>
            <div className="row row-cols-1 row-cols-md-3 g-4 mt-1 justify-content-center">
                {props.length === 0 ? (
                    <h2>Tidak ada data Pesanan</h2>
                ) : (
                        <>
                            
                        <div className="btn-group col-md-12">
                            <input type="text" className="form-control col-12 mt-2 col-md-12 mb-3"
                                placeholder="Cari Transaksi Disini (Nama Venue)"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}

                            />

                        </div>
                            {currentPosts.map((data, index) => (
                            <Link href={{
                                    pathname: '/detail-transaksi',
                                    query: {
                                        idTransaksi: data._id,
                                    }
                                }} >
                                    <div className="shadow-sm col-12 col-lg-5 border border-2 mb-1 p-3 text-start">
                                        <h1><b>{data.namaVenue}</b></h1>
                                        <h4><b>Nama Pemesan:</b> {data.nama}</h4>
                                        <h4><b>Tim:</b> {data.tim}</h4>
                                        <h4><b>Lapangan:</b> {data.lapangan}</h4>
                                        <h4><b>Opsi Pembayaran:</b> {data.opsiBayar}</h4>
                                        {data.opsiBayar != 'DP' ? (
                                            <h4><b>Total Harga :</b>{` Rp ${data.harga.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".")}`}</h4>
                                        ) : (
                                            <div>
                                                <h4><b>Total Harga :</b>{` Rp ${data.harga.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".")}`}</h4>
                                                <h4><b>Harga DP:</b>{` Rp ${data.hargaDP.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".")}`}</h4>
                                            </div>
                                        )}
                                        <hr></hr>
                                        <h5><b>Dikirim:</b> {data.diterima}</h5>
                                        <h5><b>Tanggal Main:</b> {data.tglMain}</h5>
                                        <hr></hr>
                                        <h5 ><b>Status: {data.status.charAt(0).toUpperCase() + data.status.slice(1)}</b></h5>
                                        <hr></hr>
                                        <Link href={{
                                            pathname: '/detail-transaksi',
                                            query: {
                                                idTransaksi: data._id,
                                            }
                                        }} >
                                            <a className="btn btn-success text-white p-3 mb-2">Lihat Detail</a>
                                        </Link>

                                    </div>
                                </Link>
                            
                        ))}

                    </>
                )}

            </div>
            <div className='d-flex flex-row justify-content-center mt-5'>
                <Pagination pages={howManyPages} setCurrentPage={setCurrentPage} />
            </div>



        </>

    )
}

