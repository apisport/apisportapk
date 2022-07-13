import CardJadwal from "./CardJadwal"
import Carousel from "./Carousel"
import Link from 'next/link'
import { useState } from "react"

export default function CardLapangan({ props }) {
    let keyJadwalPagi = Object.keys(props.jadwalPagi)
    let keyJadwalMalam = Object.keys(props.jadwalMalam)
    let gabunganJadwal = keyJadwalPagi.concat(keyJadwalMalam)
    let gabunganHarga = []
    const [deleting, setDeleting] = useState(false)

    for (let i = 0; i < keyJadwalPagi.length; i++) {
        gabunganHarga.push(props.hargaPagi)
    }

    for (let i = 0; i < keyJadwalMalam.length; i++) {
        gabunganHarga.push(props.hargaMalam)
    }


    // const deleteLapangan = () => {
    //     console.log(props._id)
    // }

    const deleteLapangan = async () => {
        //change deleting state
        setDeleting(true);
        try {
            console.log('Try')
            // Delete post
            await fetch('/api/lapangandb', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    _id: props._id
                }),
            });
            // reset the deleting state
            setDeleting(false);
            // reload the page
            alert('Hapus Lapangan Berhasil')
            router.reload()


        } catch (error) {
            console.log('Catch')
            // stop deleting state
            return setDeleting(false);
        }
    };

    return (
        <div className="row text-start" >
            <div className="card border-0 mb-3 shadow-sm">
                <div className="card-body rounded p-3">
                    {/* ROW CONTENT */}
                    <div className="row">
                        <div className="col-md-4">
                            <Carousel gambar={props.gambar} nama={props.namaLapangan} />
                        </div>

                        <div className="col-lg-8 p-0 ">
                            <h5 className="card-title mt-2 justify-content-center text-start" style={{ color: "black" }}><strong>{props.namaLapangan}</strong></h5>
                            <div>
                                <h4 className='text-start'>Daftar Jadwal</h4>
                                <hr></hr>
                            </div>

                            <div className='row' >
                                {gabunganJadwal.length === 0 ? (
                                    <h2>Tidak ada data</h2>
                                ) : (
                                    <>
                                        {gabunganJadwal.map((data, index) => (
                                            <div className='col-6 col-sm-3 mb-2'>
                                                <div className='card'>
                                                    <div className='card-body'>
                                                        <span>{data}</span><br></br>
                                                        <span>Rp {gabunganHarga[index].toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".")}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </>
                                )}
                            </div>
                            <div className="d-flex flex-row justify-content-evenly">
                                <div className='text-center justify-content-center mt-2 mb-2'>
                                    {/* <Link href={`/mitra/update-lapangan?namaVenue=${props.namaVenue}&namaLapangan=${props.namaLapangan}&deskripsi=${props.deskripsi}&gambar=${props.gambar}&jadwalPagi=${JSON.stringify(props.jadwalPagi)}&jadwalMalam=${JSON.stringify(props.jadwalMalam)}&hargaPagi=${props.hargaPagi}&hargaMalam=${props.hargaMalam}`}> */}
                                    <Link href={{
                                        pathname: '/mitra/update-lapangan',
                                        query: {
                                            namaVenue: props.namaVenue,
                                            namaLapangan: props.namaLapangan,
                                            deskripsi: props.deskripsi,
                                            gambarStringify: JSON.stringify(props.gambar),
                                            jadwalPagi: JSON.stringify(props.jadwalPagi),
                                            jadwalMalam: JSON.stringify(props.jadwalMalam),
                                            hargaPagi: props.hargaPagi,
                                            hargaMalam: props.hargaMalam
                                        }
                                    }} >
                                        <button className='btn btn-success text-white p-2' style={{ backgroundColor: '#00cc36', color: 'rgb(255, 255, 255)' }}>
                                            <icon className='fa fa-pencil'></icon >&nbsp;Edit Lapangan
                                        </button>
                                    </Link>
                                </div>
                                <div className='text-center justify-content-center mt-2 mb-2'>
                                    <a href='/mitra/detail-lapangan'><button className='btn btn-success text-white p-2' style={{ backgroundColor: '#2b7ead', color: 'rgb(255, 255, 255)' }}>
                                        <icon className='fa fa-eye'></icon >&nbsp;Lihat Selengkapnya
                                    </button></a>
                                </div>
                                <div className='text-center justify-content-center mt-2 mb-2'>
                                    <button className='btn btn-success text-white p-2'
                                        style={{ backgroundColor: '#ed0010', color: 'rgb(255, 255, 255)' }}
                                        onClick={() => deleteLapangan()}
                                        type='submit'
                                    >
                                        <icon className='fa fa-trash'></icon >&nbsp;Hapus Lapangan
                                    </button>
                                </div>
                            </div>

                        </div>
                    </div>
                    {/* END ROW */}
                </div>
            </div>

        </div >
    )
}
