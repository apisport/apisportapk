import useSWR from "swr"
import Link from 'next/link'
import { useState } from "react"
import Pagination from "../../components/Pagination"

export default function UserDev() {
    const fetcher = (...args) => fetch(...args).then((res) => res.json())
    const { data: data, error } = useSWR('/api/userdb', fetcher)
    const [currentPage, setCurrentPage] = useState(1)
    const [postsPerPage, setPostsPerPage] = useState(5)
    const [filterSearch, setFilterSearch] = useState('')
    const [searchTerm, setSearchTerm] = useState('')



    if (!data) {
        return <div>Loading...</div>
    } else if (error) {
        return <div>Something went wrong</div>
    }


    let user = data['message']
    console.log(user)

    let searchArr = user.filter((tblDat) => {
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
        <>
            <div class="container-fluid">
                <div className="d-flex flex-row justify-content-center mb-5">
                    <h1>Data User </h1>
                </div>

                <div class="row flex-row flex-nowrap mt-3">
                    <div className="col-5 col-md-5 text-nowrap">
                        <div id="dataTable_length" className="dataTables_length" aria-controls="dataTable"><label className="form-label">Show&nbsp;
                            <select className="d-inline-block form-select form-select-sm" value={postsPerPage} onChange={(e) => setPostsPerPage(e.target.value)}>
                                <option value={5}>5</option>
                                <option value={10}>10</option>
                                <option value={20}>20</option>
                                <option value={30}>30</option>
                            </select>&nbsp;</label></div>
                    </div>
                    <div className="col-5 col-md-5">
                        <div className="text-md-end dataTables_filter" id="dataTable_filter">
                            <input type="search"
                                className="form-control form-control-md"
                                aria-controls="dataTable" placeholder="Search" id="searchInput"
                                value={searchTerm}
                                onChange={(event) => { setSearchTerm(event.target.value) }} />
                        </div>
                    </div>
                </div>
                {/* Tambahan Pagination Make Sure Math.ceil adalah searchArr.length */}
                <p>Memuat {user.length} data, Jumlah keseluruhan data adalah 1333 data</p>
                <div className='d-flex flex-row justify-content-center'>
                    <table className="table table-responsive my-0" id="dataTable">
                        <thead>
                            <tr>
                                <th style={{ width: 56 }}>No</th>
                                <th>Nama User</th>
                                <th>Jenis Kelamin</th>
                                <th>No. WA</th>
                                <th>E-mail</th>
                                <th>Aksi</th>
                            </tr>
                        </thead>
                        {currentPosts.length === 0 ? (
                            <h2>Tidak ada data Favorit ditemukan</h2>
                        ) : (
                            <>
                                {currentPosts.map((data, index) => (
                                    <tbody>
                                        <tr>
                                            <td>{index + 1}</td>
                                            <td>{data.nama}</td>
                                            <td>{data.jenisKelamin}</td>
                                            <td>{data.noWa}</td>
                                            <td>{data.email}</td>
                                            <td><div className="btn-group-vertical btn-group-sm">
                                                {/* <Link href={`/dev/detail-mitra-pending?namaVenue=${data.namaVenue}&namaPemilikVenue=${data.namaPemilikVenue}&alamat=${data.alamat}&noWa=${data.noWa}&instagram=${data.instagram}&kategori=${data.kategori}&hariOperasional=${data.hariOperasional}&jamOperasional=${data.jamOperasional}&fasilitas=${data.fasilitas}&opsiBayarStringify=${JSON.stringify(data.opsiBayar)}&rekeningStringify=${JSON.stringify(data.rekening)}&namaAdmin=${data.namaAdmin}&noWaAdmin=${data.noWaAdmin}&username=${data.username}&password=${data.password}&fotoVenue=${data.fotoVenue}objectId=${data._id}`}> */}
                                                <Link href={{
                                                    pathname: '/dev/detail-user',
                                                    query: {
                                                        nama: data.nama,
                                                        jenisKelamin: data.jenisKelamin,
                                                        noWa: data.noWa,
                                                        emailReq: data.email,
                                                        objectId: data._id
                                                    }

                                                }}>
                                                    <button className="btn btn-success text-white mb-2"
                                                        type="button"
                                                        style={{ marginLeft: 'auto', background: 'green' }}
                                                    >Lihat Selengkapnya
                                                    </button>
                                                </Link>

                                            </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                ))}
                            </>
                        )}

                    </table>

                </div>
                <Pagination pages={howManyPages} setCurrentPage={setCurrentPage} />
            </div>
        </>
    )
}
