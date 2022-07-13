import Link from 'next/link'
import { useState } from 'react'
import Pagination from '../../Pagination'

const CardTransaksiPending = ({ props }) => {
    const [currentPage, setCurrentPage] = useState(1)
    const [postsPerPage, setPostsPerPage] = useState(4)
    const [filterSearch, setFilterSearch] = useState('')
    const [searchTerm, setSearchTerm] = useState('')

    let searchArr = props.filter((tblDat) => {
        if (searchTerm == "") {
            return tblDat
        } else if (tblDat.nama.toLowerCase().includes(searchTerm.toLowerCase())) {
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


    console.log(props)
    return (
        <>
            {props.length === 0 ? (
                <h2>Tidak ada data</h2>
            ) : (
                    <>
                        <div className="btn-group col-md-12">
                            <input type="text" className="form-control col-12 mt-2 col-md-12 mb-3"
                                placeholder="Cari Transaksi Disini (Nama Pemesan)"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            
                            />

                        </div>
                        {currentPosts.map((data, index) => (
                        <div className="shadow-sm col-12 col-lg-5 border border-2 mb-4 ml-3 p-3 text-start">
                            <h1>{data.lapangan}</h1>
                            <h4><b>Nama Pemesan:</b> {data.nama}</h4>
                            <h4><b>Nama Tim:</b> {data.tim}</h4>
                            <h4><b>Opsi Pembayaran:</b> {data.opsiBayar}</h4>
                            {data.opsiBayar != 'DP' ? (
                                <h4><b>Harga :</b>{` Rp ${data.harga.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".")}`}</h4>
                            ) : (
                                    <div>
                                        <h4><b>Harga :</b>{` Rp ${data.harga.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".")}`}</h4>
                                        <h4><b>Harga DP:</b>{` Rp ${data.hargaDP.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".")}`}</h4>
                                    </div>
                            )}
                            
                            <hr></hr>
                            <h5><b>Diterima:</b> {data.diterima}</h5>
                            <h5><b>Tanggal Main:</b> {data.tglMain}</h5><br></br>
                            <Link href={{
                                pathname: '/mitra/detail-notifikasi',
                                query: {
                                    idTransaksi: data._id
                                }

                            }}>
                                <button className="btn btn-primary text-white p-3 mb-2">
                                    Lihat Detail
                                </button>
                            </Link>

                        </div>
                    ))}
                        <div className='d-flex flex-row justify-content-center'>
                            <Pagination pages={howManyPages} setCurrentPage={setCurrentPage} />
                        </div>
                </>
            )}
        </>
    )
}
export default CardTransaksiPending
