import useSWR from 'swr'
import Pagination from '../../components/Pagination'
import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import moment from 'moment'

export default function Datatransaksi({ namaVenueProps }) {
    const [currentPage, setCurrentPage] = useState(1)
    const [postsPerPage, setPostsPerPage] = useState(10)
    const [filterSearch, setFilterSearch] = useState('')
    const [searchTerm, setSearchTerm] = useState('')

    let router = useRouter()
    const fetcher = (...args) => fetch(...args).then((res) => res.json())
    const { data: data, error } = useSWR(`/api/transaksidb?namaVenueReq=${namaVenueProps}`, fetcher)

    if (!data) {
        return <div className="spinner"></div>
    } else if (error) {
        return <div>Something went wrong</div>
    }

    let transaksi = data['message']


    let searchArr = transaksi.filter((tblDat) => {
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

    return (
        <div class="container-fluid">
            <div className="d-flex flex-row justify-content-center mb-5">
                <h1>Data Pembukuan Transaksi Lunas</h1>
            </div>

            <div class="row flex-row flex-nowrap mt-3">
                <div className="col-12 col-md-12">
                    <div className="text-md-end dataTables_filter" id="dataTable_filter">
                        <input type="search"
                            className="form-control form-control-md"
                            aria-controls="dataTable" placeholder="Cari (Nama Pemesan)" id="searchInput"
                            onChange={event => { setSearchTerm(event.target.value) }} />
                    </div>
                </div>
            </div>
            {/* Tambahan Pagination Make Sure Math.ceil adalah searchArr.length */}
            <p>Memuat {currentPosts.length} data, Jumlah keseluruhan data adalah {transaksi.length} data</p>
            <div className='d-flex flex-row justify-content-center'>
                <table className="table table-responsive" id="dataTable">
                    <thead>
                        <tr>
                            <th style={{ width: '12px' }}>No</th>
                            <th>Nama Pemesan</th>
                            <th>Nama Tim</th>
                            <th>Tanggal Diterima</th>
                            <th>Tanggal Main</th>
                            <th>Harga</th>
                            <th>Lapangan</th>
                            <th>Opsi Pembayaran</th>
                            <th>Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transaksi.length === 0 ? (
                            <h3>Tidak ada data</h3>
                        ) : (
                            <>
                                {currentPosts.map((data, index) => (
                                    <tr>
                                        <td>{index + 1}</td>
                                        <td>{data.nama}</td>
                                        <td>{data.tim}</td>
                                        <td>{data.diterima}</td>
                                        <td>{moment(data.tglMain, 'YYYY-MM-DD').format('DD/MM/YYYY')}</td>
                                        <td>{` Rp ${data.harga.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".")}`}</td>
                                        <td>{data.lapangan}</td>
                                        <td>{data.opsiBayar}</td>

                                        <td><div className="btn-group-vertical btn-group-sm">
                                            <Link href={{
                                                pathname: '/mitra/detail-transaksi',
                                                query: {
                                                    idTransaksi: data._id
                                                }

                                            }}>
                                                <button className="btn btn-success text-white mb-2"
                                                    value="a"
                                                    type="button"
                                                    style={{ marginLeft: 'auto', background: 'green' }}
                                                >Lihat Detail
                                                </button>
                                            </Link>
                                        </div>
                                        </td>
                                    </tr>
                                ))}
                                <div className='d-flex flex-row justify-content-center'>
                                    <Pagination pages={howManyPages} setCurrentPage={setCurrentPage} />
                                </div>
                            </>
                        )}

                    </tbody>
                </table>
            </div>

        </div>
    )
}
