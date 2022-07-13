import { useRouter } from 'next/router';
import useSWR from "swr";
import Router from 'next/router';

export default function DetailNotifikasi() {
    const fetcher = (...args) => fetch(...args).then((res) => res.json())
    const router = useRouter()
    const { idTransaksi } = router.query
    const { data: data, error } = useSWR(`/api/detailnotifikasidb?idTransaksiReq=${idTransaksi}`, fetcher)

    if (!data) {
        return <div className="spinner"></div>
    } else if (error) {
        return <div>Something went wrong</div>
    }


    let transaksi = data['message'][0]
    console.log(transaksi)

    let nama = transaksi.nama
    let email = transaksi.email
    let lapangan = transaksi.lapangan
    let namaVenue = transaksi.namaVenue
    let tglMain = transaksi.tglMain
    let diterima = transaksi.diterima

    const kembali = () => {
        Router.back()
    }

    return (
        <div className="container">
            <h1 className="mb-3">Detail Transaksi</h1>
            <div className="">
                <div className="container card p-3 shadow-lg">
                    <div className="row">
                        <div className="px-md-5 p-3 col-md-12 align-items-start justify-content-center" >
                            <h1><b>{transaksi.namaVenue}</b></h1>
                            <h3 ><b>Lapangan:</b>&nbsp;{transaksi.lapangan}</h3>
                            <h4><b>Tgl Main:</b>&nbsp;{transaksi.tglMain}</h4><br></br>
                            <div className="row">
                                <h3><b>Jadwal Main:</b></h3>
                                {transaksi.jadwalMain.map((data, i) => (
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
                            <h5>Pesanan dibuat pada: <b>{transaksi.diterima}</b></h5>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-4">
                <div className="container">
                    <form>
                        <div className="form-group">
                            <label htmlFor="exampleFormControlInput1">Nama Pemesan : </label>
                            <input type="email" className="form-control" value={transaksi.nama} readOnly />
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleFormControlInput1">Nama Tim : </label>
                            <input type="email" className="form-control" value={transaksi.tim} readOnly />
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleFormControlInput1">No. WhatsApp: </label>
                            <input type="email" className="form-control" value={transaksi.noWa} readOnly />
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleFormControlInput1">Email: </label>
                            <input type="email" className="form-control" value={transaksi.email} readOnly />
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleFormControlInput1">Total Bayar : </label>
                            <input type="email" className="form-control" value={`Rp ${transaksi.harga.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".")}`} readOnly />
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleFormControlInput1">No. Rekening Venue: </label>
                            <input type="email" className="form-control" value={transaksi.noRekening} readOnly />
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleFormControlInput1">Opsi Bayar : </label>
                            <input type="email" className="form-control" value={transaksi.opsiBayar} readOnly />
                        </div>
                        {transaksi.opsiBayar === 'DP' &&
                            <div className="form-group">
                                <label htmlFor="exampleFormControlInput1">Harga DP : </label>
                                <input type="email" className="form-control" value={`Rp ${transaksi.hargaDP.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".")}`} readOnly />
                            </div>
                        }
                        <div className="form-group">
                            <div className="mt-2 col-md-12"><label className="labels" htmlFor="formFile">Bukti Bayar</label>
                            </div>

                        </div>

                        <div className=" text-center">
                            <img className='img-fluid' src={`/uploads/${transaksi.buktiBayar}`} />
                        </div>
                        <div className='row mt-3'>
                            <div className='col-12 d-grid col-lg-12 mb-4'>
                                <button type="button" className="btn btn-outline-secondary" onClick={kembali} style={{ borderRadius: '5cm' }}>Kembali</button>
                            </div>
                        </div>

                    </form>
                </div>
            </div>
        </div>

    )
}