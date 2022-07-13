import Head from 'next/head'
import Image from 'next/image'
import Helmet from 'react-helmet'
import Carousel from 'react-bootstrap/Carousel'
import CardRekomendasi from '../components/user/lapangan/CardRekomendasi'
import CardKategori from '../components/user/lapangan/CardKategori'
import useSWR from 'swr'
import Pagination from '../components/Pagination'
import { useState } from 'react'


export default function Lapangan() {
    const [currentPage, setCurrentPage] = useState(1)
    const [postsPerPage, setPostsPerPage] = useState(8)
    const [filterSearch, setFilterSearch] = useState('')
    const [searchTerm, setSearchTerm] = useState('')
    const fetcher = (...args) => fetch(...args).then((res) => res.json())
    const { data: data, error } = useSWR('/api/lapanganuserdb', fetcher)

    if (!data) {
        return <div className="spinner"></div>
    } else if (error) {
        return <div>Something went wrong</div>
    }

    

    let lapangan = data['message']
    console.log('Agregate:')
    console.log(lapangan)

    //Tambahan Pagination
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    //Fixed Pagintion CurrentPosts hapus filter di bawah
    let currentPosts = lapangan.lapangan.slice(indexOfFirstPost, indexOfLastPost)
    //Fixed Pagination CurrentPosts
    const howManyPages = Math.ceil(lapangan.lapangan.length / postsPerPage)
    //Tambahan Pagination Current Post Map


    
    return (
        <>
            <div className='container my-4'>
                <h1>Daftar Lapangan</h1>
            </div>
            <div>

                <div className="container my-4">
                    <div className="row d-flex justify-content-center align-items-center">
                        <div className="btn-group col-md-12">
                            <input type="text" className="form-control col-10 mt-2 col-md-10" placeholder="Cari Lapangan Disini" />
                            <a href='/cari-lapangan' className="form-control col-2 mt-2 col-sm-2 btn shadow-sm" style={{ backgroundColor: '#ffbe2e' }}><button ><i className="fa fa-search text-white"></i></button></a>
                        </div>
                    </div>
                </div>
                <div className="container my-4 text-black-50" >
                    <h3 style={{ color: 'black' }}>Rekomendasi Lapangan</h3>
                    <hr></hr>
                    <div className="row row-cols-1 row-cols-md-4 g-4 mt-3">
                        {lapangan.favorit.length === 0 ? (
                            <></>
                        ) : (
                            <>

                                {lapangan.favorit.map((data, i) => (
                                    <CardRekomendasi props={data} />
                                ))}
                            </>
                        )}
                    </div>
                </div>

                <div className='container my-4 text-black-50'>
                    <h3 style={{ color: 'black' }}>Daftar Lapangan</h3>
                    <select className='form-control form-select mt-4'>
                        <option>Futsal</option>
                        <option>Bulutangkis</option>
                        <option>Voli</option>
                        <option>Basket</option>
                    </select>
                </div>
                <div className='container mt-4 text-black-50'>

                </div>
                <div className='container mt-4 text-black-50 mt-5'>
                    <div className="row row-cols-1 row-cols-md-4 g-4">

                        {currentPosts.length === 0 ? (
                            <></>
                        ) : (
                            <>
                                
                                {currentPosts.map((data, i) => (
                                    
                                    <CardKategori props={data} />
                                ))}
                            </>
                        )}
                    </div>

                </div>


            </div>
            <div className='container d-flex mt-4 text-center justify-content-center'>
                <Pagination pages={howManyPages} setCurrentPage={setCurrentPage} />
            </div>



        </>
    )
}
