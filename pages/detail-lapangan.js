//@ts-check
import Carousel from '../components/user/detail-lapangan/Carousel'
import CardJadwal from '../components/user/detail-lapangan/CardJadwal'
import useSWR from "swr";
import { useRouter } from 'next/router';
import { useState } from 'react';
import Link from 'next/link'
import { useEffect } from 'react';


export default function Home() {

    //Router
    const router = useRouter()
    const { idLapangan, namaVenue, namaLapangan } = router.query
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    let todayVar = yyyy + '-' + mm + '-' + dd;
    let available = true
    let jamTerisi = []

    //State of Decay
    const [_dataMain, setDataMain] = useState({});
    const [tglMain, setTglMain] = useState(todayVar);
    const [jadwalPesan, setJadwalPesan] = useState([]);
    // const [available, setAvailable] = useState(true);
    const [totalHarga, setTotalHarga] = useState(0);

    //Perubahan
    // let isCheck = []
    const [isCheck, setIsCheck] = useState(true);


    //Suwir
    const fetcher = (...args) => fetch(...args).then((res) => res.json())
    const { data: data, error } = useSWR(`/api/detaillapangandb?idLapangan=${idLapangan}&namaVenueReq=${namaVenue}&namaLapanganReq=${namaLapangan}&tglMainReq=${tglMain}`, fetcher)

    console.log(tglMain)
    if (!data) {
        return <div>Loading...</div>
    } else if (error) {
        return <div>Something went wrong</div>
    }

    //Deklarasi Array JSON SWR
    let lapangan = data['message']
    let infoLapangan = lapangan.infoLapangan[0]
    let namaHasil = infoLapangan.namaLapangan.split(" ").join("");

    //Function SetAvailable dan Input Date
    const setTglMainFunc = (data) => {
        setTglMain(data)
        setJadwalPesan([])
        setTotalHarga(0)
        setAvailableJam()
        setAvailableHari()

    }

    const setAvailableJam = () => {
        // console.log('Jam Booked')
        for (let i = 0; i < lapangan.infoTransaksi.length; i++) {
            for (let j = 0; j < lapangan.infoTransaksi[i].jadwalMain.length; j++) {
                jamTerisi.push(lapangan.infoTransaksi[i].jadwalMain[j])
            }
        }
        // console.log(jamTerisi)
    }

    const setAvailableHari = () => {
        let hariTemp = lapangan.infoVenue[0].hariOperasional.split(" - ")
        // console.log(hariTemp)

        let day = new Date()
        const weekday = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
        const weekdayHitung = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"];
        let today = weekday[day.getUTCDay()]
        // console.log('Available Hari')
        // console.log(today)

        let indexAwalHari = weekdayHitung.indexOf(hariTemp[0])
        let indexAkhirHari = weekdayHitung.indexOf(hariTemp[1])
        // console.log(indexAwalHari)
        // console.log(indexAkhirHari)

        let totalIndex = indexAkhirHari - indexAwalHari
        let arrayAvailableHariTemp = []
        // console.log(totalIndex)
        for (let i = 0; i <= totalIndex; i++) {
            arrayAvailableHariTemp[i] = weekdayHitung[i]
        }
        // console.log('Sudah Jadi:')
        // console.log(arrayAvailableHariTemp)
        // console.log('Hari UTC TGl MAIN')
        let dateCheckerInit = new Date(tglMain)
        let dateChecker = weekday[dateCheckerInit.getUTCDay()]

        if (arrayAvailableHariTemp.indexOf(dateChecker) === -1) {
            available = false
        } else {
            available = true
        }
    }

    setAvailableJam()
    setAvailableHari()


    // Penggabungan Harga dan Jadwal
    let keyJadwalPagi = Object.keys(infoLapangan.jadwalPagi)
    let keyJadwalMalam = Object.keys(infoLapangan.jadwalMalam)
    let gabunganJadwal = keyJadwalPagi.concat(keyJadwalMalam)
    let gabunganHarga = []

    for (let i = 0; i < keyJadwalPagi.length; i++) {
        gabunganHarga.push(infoLapangan.hargaPagi)
    }

    for (let i = 0; i < keyJadwalMalam.length; i++) {
        gabunganHarga.push(infoLapangan.hargaMalam)
    }

    let transaksiArr = lapangan.infoTransaksi.filter((tblDat) => {
        if (tglMain == "") {
            return tblDat
        } else if (tblDat.tglMain === tglMain) {
            return tblDat
        }
    })
    // console.log('Hasil Filter')
    // console.log(transaksiArr)


    const setCheck = (harga, i) => {

        // isCheck[i] = true
        // for (let index = 0; index < isCheck.length; index++) {
        //     console.log(isCheck[index])

        // }


        // // console.log('Total Harga:')
        // HitungHarga(harga)
        // console.log(isCheck)
    }
    let tohar = 0

    const setChange = (e, harga, jadwal) => {
        setIsCheck(e.target.checked)
        if (e.target.checked === true) {
            /*  tohar = tohar + parseInt(harga)
             setTotalHarga(tohar) */
            setTotalHarga(totalHarga => totalHarga + parseInt(harga))
            setJadwalPesan(arr => [...arr, jadwal]);
        } else {
            /* tohar = tohar - parseInt(harga)
            setTotalHarga(tohar) */
            setTotalHarga(totalHarga => totalHarga - parseInt(harga))
            // let filteredArray = jadwalPesan.filter(item => item !== data)
            // console.log(data)
            let index = jadwalPesan.indexOf(jadwal)
            setJadwalPesan(tim => [...tim.slice(0, index), ...tim.slice(index + 1)])
        }
        /*  {
             isCheck ? setTotalHarga(totalHarga => totalHarga + parseInt(harga)) : setTotalHarga(totalHarga => totalHarga - parseInt(harga))
         } */
        console.log(totalHarga + ' ,' + harga)
    }

    // const setCheck = () => {
    //     setJadwalPesan([])
    //     setTotalHarga(0)
    //     let convertedJSON = []
    //     let check = document.getElementsByName('jadwal')
    //     let jadwalValue = []
    //     let hargaValue = []
    //     let len = check.length
    //     let totalHargaVar = 0

    //     for (var i = 0; i < len; i++) {
    //         convertedJSON.push(JSON.parse(check[i].value))
    //         jadwalValue.push(convertedJSON[i][0])
    //         hargaValue.push(convertedJSON[i][1])
    //     }
    //     // console.log(convertedJSON)
    //     // console.log(jadwalValue)
    //     // console.log(hargaValue)
    //     for (var i = 0; i < len; i++) {
    //         if (check[i].checked) {
    //             setJadwalPesan(arr => [...arr, jadwalValue[i]]);
    //             totalHargaVar = totalHargaVar + parseInt(hargaValue[i])

    //         }
    //     }


    //     // console.log(`jadwal Pesan:`)
    //     // console.log(jadwalTemp)
    //     // console.log(hargaTemp)
    //     setTotalHarga(totalHargaVar)
    //     console.log('Jadwal Pesan')
    //     console.log(jadwalPesan)
    // }

    //Handle Post Update DataMain Lapangan
    const handlePost = async (e) => {
        e.preventDefault()
        if (jadwalPesan.length > 3) {
            alert('Batas Maksimum Pemesanan adalah 3')
        } else if (jadwalPesan.length == 0) {
            alert('Tidak ada Jadwal yang dipesan')
        }
        else {
            router.push({
                pathname: '/pembayaran',
                query: {
                    jadwalPesanReq: JSON.stringify(jadwalPesan),
                    totalHargaReq: totalHarga,
                    namaVenueReq: lapangan.infoVenue[0].namaVenue,
                    namaLapanganReq: infoLapangan.namaLapangan,
                    tglMainReq: tglMain
                }
            })
        }
        // e.preventDefault();

        // // reset error and message
        // // fields check
        // try {
        //     // Update post
        //     await fetch('/api/datamaindb', {
        //         method: 'PUT',
        //         headers: {
        //             'Content-Type': 'application/json',
        //         },
        //         body: JSON.stringify({
        //             dataMain: _dataMain,
        //             objectId: infoLapangan._id,
        //         }),
        //     });
        //     // reload the page
        //     alert('Data sukses diupdate')
        //     return router.push('/mitra/home');
        // } catch (error) {
        //     // Stop publishing state
        //     console.log('Not Working')
        // }

    };


    //Penggabungan Harga dan Jadwal

    const checkValue = () => {
        let check = document.getElementsByName('jadwal')
        for (let i = 0; i < check.length; i++) {
            console.log(`index ke-${i}`)
            console.log(JSON.parse(check[i].value))
        }
        let date = document.getElementById('tglMain').value
        console.log(date)
    }


    return (
        <div className="container mt-4">
            <h1 className='mb-3 mt-4'>{infoLapangan.namaLapangan}</h1>
            <div className="row mb-3">
                <div className="col md-3 mb-4">
                    {/* SLIDER */}
                    <div id={`${namaHasil}`} className="carousel slide" data-bs-ride="carousel">
                        <div className="carousel-indicators">
                            {infoLapangan.gambar.map((data, i) => (
                                <>
                                    {i == 0 ?
                                        (<button type="button" data-bs-target={`#${namaHasil}`} data-bs-slide-to={i} className="active" aria-current="true" aria-label={`Slide ${i}`} />) :
                                        (<button type="button" data-bs-target={`#${namaHasil}`} data-bs-slide-to={i} aria-label={`Slide ${i}`} />)}

                                </>
                            ))}
                        </div>
                        <div className="carousel-inner">
                            {infoLapangan.gambar.map((data, i) => (
                                <>
                                    {i == 0 ?
                                        (<div className="carousel-item active">
                                            <img src="lapangan/lapangan1.jpg" className="" width={400} height={200} />
                                        </div>) :
                                        (<div className="carousel-item">
                                            <img src="lapangan/lapangan1.jpg" className="" width={400} height={200} />
                                        </div>)}
                                </>
                            ))}

                        </div>
                        <button className="carousel-control-prev" type="button" data-bs-target={`#${namaHasil}`} data-bs-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true" />
                            <span className="visually-hidden">Previous</span>
                        </button>
                        <button className="carousel-control-next" type="button" data-bs-target={`#${namaHasil}`} data-bs-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true" />
                            <span className="visually-hidden">Next</span>
                        </button>
                    </div>

                    {/* END SLIDER */}
                </div>
            </div>
            <div className='row mb-4'>
                <a data-bs-toggle="collapse" href="#deskripsiCollapse" style={{ color: "black" }}><h5 className='text-start'><icon className='fa fa-caret-down'></icon> Deskripsi Lapangan</h5></a>
                <div>
                    <div className="row collapse multi-collapse text-start" id="deskripsiCollapse">
                        <span>{infoLapangan.deskripsi}</span>
                    </div>
                </div>
            </div>
            <div className='mt-3'>
                <form onSubmit={handlePost}>
                    <h4 className='text-start'>Jadwal Lapangan</h4>
                    <input type='date' id='tglMain' value={tglMain} onChange={(e) => setTglMainFunc(e.target.value)} className='form-control mb-4' required></input>
                    <div className='card p-3'>
                        <div className='row' style={{ color: 'white' }}>
                            {/* THIS IS CARD */}

                            {/* THIS IS CARD */}
                            {available &&
                                <>

                                    {gabunganJadwal.map((data, index) => (

                                        <div className='col-6 col-lg-3 mb-2'>
                                            <div>

                                                <input type="checkbox" className="btn-check" id={`btn-check${index + 1}`}
                                                    autoComplete="off" onChange={(e) => setChange(e, gabunganHarga[index], data)} onClick={() => setCheck(gabunganHarga[index], index)}
                                                    name='jadwal'

                                                    disabled={jamTerisi.indexOf(data) === -1 ? (false) : (true)}
                                                    value={JSON.stringify([`${data}`, gabunganHarga[index]])} />
                                                <label className="btn btn-outline-success" style={jamTerisi.indexOf(data) === -1 ? ({}) : ({ backgroundColor: 'red', color: 'white' })} htmlFor={`btn-check${index + 1}`}>{data}<br />{`Rp ${gabunganHarga[index]}.000`}</label><br />
                                            </div>
                                        </div>
                                    ))}
                                </>
                            }
                            {!available &&
                                <>
                                    <h3 className='text-black'>Mitra tidak beroperasi</h3>
                                </>
                            }
                            {/* {gabunganJadwal.length === 0 ? (
                                <h2>Tidak ada data Jadwal</h2>
                            ) : ( 
                                    <>
                                        
                                        {gabunganJadwal.map((data, index) => (
                                        
                                        <div className='col-6 col-lg-3 mb-2'>
                                            <div>
                                                
                                                <input type="checkbox" className="btn-check" id={`btn-check${index + 1}`} autoComplete="off" onClick={() => setCheck()} name='jadwal' value={JSON.stringify([`${data}`, gabunganHarga[index]])} />
                                                <label className="btn btn-outline-primary" htmlFor={`btn-check${index + 1}`}>{data}<br />{`Rp ${gabunganHarga[index]}.000`}</label><br />
                                            </div>
                                        </div>
                                    ))}
                                </>
                            )} */}

                        </div>
                    </div>


                    <div className='row'>
                        <h2><b>Jadwal yang akan dipesan:</b></h2>
                        <h3>Tgl Main: {tglMain}</h3>
                        <h3>Total Harga: {`Rp ${totalHarga}.000,-`}</h3>
                        <hr></hr>
                        {jadwalPesan.length === 0 ? (
                            <h2>Tidak ada data Jadwal yang dipesan</h2>
                        ) : (
                            <>

                                {jadwalPesan.map((data, index) => (
                                    <div className='col-6 col-sm-3 mb-2'>
                                        <div className='card'>
                                            <div className='card-body'>
                                                <span>{data}</span><br></br>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </>
                        )}


                        {/* <Link href={{
                        pathname: '/pembayaran',
                        query: {
                            jadwalPesanReq: JSON.stringify(jadwalPesan),
                            totalHargaReq: totalHarga,
                            namaVenueReq: lapangan.infoVenue[0].namaVenue
                        }

                        }}> */}

                        <button type='submit' className='btn btn-fill text-white mt-3' onClick={() => checkValue()}>Pesan</button>

                        {/* Session di sini jangan lupa dan button */}
                        {/* disabled={(session) ? (false) : (true)} */}
                      
                        {/* </Link> */}
                    </div>
                </form>
            </div>
        </div>

    )
}