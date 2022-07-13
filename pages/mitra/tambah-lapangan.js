//@ts-check
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useSession, signIn, signOut } from 'next-auth/react'
import useSWR from 'swr';

export default function Addlapangan() {

    //Variabel
    const [namaLapangan, setNamaLapangan] = useState('');
    const [deskripsi, setDeskripsi] = useState('');
    const [jadwalPagi, setJadwalPagi] = useState({});
    const [jadwalMalam, setJadwalMalam] = useState({});
    const [jadwalTampilan, setJadwalTampilan] = useState([]);
    const [hargaTampilan, setHargaTampilan] = useState([]);
    const [hargaPagi, setHargaPagi] = useState(0);
    const [hargaMalam, setHargaMalam] = useState(0);
    const [dataMain, setDataMain] = useState({});

    //Gambar
    const [gambar, setGambar] = useState([]);
    const [image, setImage] = useState([]);
    const [createObjectURL, setCreateObjectURL] = useState([]);
    const [error1, setError] = useState('');
    const [message, setMessage] = useState('');

    let router = useRouter()

    const { data: session, status } = useSession()
    const fetcher = (...args) => fetch(...args).then((res) => res.json())
    let url = ''
    // url = `/api/checkmail?emailReq=${`ucihaar6@gmail.com`}`
    // url = `/api/checkmail?emailReq=${`wowmissqueen@gmail.com`}`
    if (session) {
        url = `/api/checkmail?emailReq=${session.user.email}`
    }
    const { data: data, error } = useSWR(url, fetcher)

    if (!data) {
        return <div>Anda tidak Memilik akses untuk halaman ini</div>
    } else if (error) {
        return <div>Something went wrong</div>
    }
    let emailDb = data['message']

    let namaVenue = ''
    namaVenue = emailDb.namaVenue[0].namaVenue
    console.log(namaVenue)

    const handlePost = async (e) => {
        e.preventDefault();
        // reset error and message
        setError('');
        setMessage('');
        // fields check
        if (!namaVenue || !namaLapangan || !deskripsi || !gambar || !jadwalPagi || !jadwalMalam || !hargaPagi || !hargaMalam) {
            alert('Harap untuk mengisi semua data');
            return setError('All fields are required');
        }


        // post structure
        let lapangan = {
            namaVenue,
            namaLapangan,
            deskripsi,
            gambar,
            jadwalPagi,
            jadwalMalam,
            hargaPagi,
            hargaMalam,
            dataMain
        };
        // save the post
        let response = await fetch('/api/lapangandb', {
            method: 'POST',
            body: JSON.stringify(lapangan),
        });
        // get the data
        let data = await response.json();
        if (data.success) {
            alert('Tambah Lapangan berhasil')
            router.push('/mitra/home')
            // set the message
            return setMessage(data.message);
        }
        else {
            // set the error
            console.log(data.message);
            return setError(data.message);
        }
    };
    const bagiJamPagi = () => {
        let pagiMulai = parseInt(document.getElementById('jamPagiMulai').value);
        let pagiAkhir = parseInt(document.getElementById('jamPagiAkhir').value);
        let selisih = pagiAkhir - pagiMulai
        console.log(`Initial value: ${pagiMulai}`)
        if (Object.keys(jadwalPagi).length > 0) {
            for (let key in jadwalPagi) {
                delete jadwalPagi[key]
            }
            for (let i = 0; i < selisih; i++) {
                if (pagiMulai < 10 && (pagiMulai + 1) >= 10) {
                    setJadwalPagi(Object.assign(jadwalPagi, { [`0${pagiMulai}.00-${pagiMulai + 1}.00`]: 'kosong' }))
                } else if (pagiMulai < 10 && (pagiMulai + 1) < 10) {
                    setJadwalPagi(Object.assign(jadwalPagi, { [`0${pagiMulai}.00-0${pagiMulai + 1}.00`]: 'kosong' }))
                } else {
                    setJadwalPagi(Object.assign(jadwalPagi, { [`${pagiMulai}.00-${pagiMulai + 1}.00`]: 'kosong' }))
                }
                pagiMulai = pagiMulai + 1
            }
        } else {
            for (let i = 0; i < selisih; i++) {
                if (pagiMulai < 10 && (pagiMulai + 1) >= 10) {
                    setJadwalPagi(Object.assign(jadwalPagi, { [`0${pagiMulai}.00-${pagiMulai + 1}.00`]: 'kosong' }))
                } else if (pagiMulai < 10 && (pagiMulai + 1) < 10) {
                    setJadwalPagi(Object.assign(jadwalPagi, { [`0${pagiMulai}.00-0${pagiMulai + 1}.00`]: 'kosong' }))
                } else {
                    setJadwalPagi(Object.assign(jadwalPagi, { [`${pagiMulai}.00-${pagiMulai + 1}.00`]: 'kosong' }))
                }
                pagiMulai = pagiMulai + 1
            }
        }

        console.log('Jadwal Pagi:')
        console.log(pagiMulai)
        console.log(jadwalPagi)
        return selisih
    }

    function numberWithCommas(x) {
        return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
    }

    const bagiJamMalam = () => {
        let malamMulai = parseInt(document.getElementById('jamMalamMulai').value);
        let malamAkhir = parseInt(document.getElementById('jamMalamAkhir').value);
        let selisih = malamAkhir - malamMulai
        if (Object.keys(jadwalMalam).length > 0) {
            for (let key in jadwalMalam) {
                delete jadwalMalam[key]
            }
            for (let i = 0; i < selisih; i++) {
                if (malamMulai < 10 && (malamMulai + 1) >= 10) {
                    setJadwalMalam(Object.assign(jadwalMalam, { [`0${malamMulai}.00-${malamMulai + 1}.00`]: 'kosong' }))
                } else if (malamMulai < 10 && (malamMulai + 1) < 10) {
                    setJadwalMalam(Object.assign(jadwalMalam, { [`0${malamMulai}.00-0${malamMulai + 1}.00`]: 'kosong' }))
                } else {
                    setJadwalMalam(Object.assign(jadwalMalam, { [`${malamMulai}.00-${malamMulai + 1}.00`]: 'kosong' }))
                }
                malamMulai = malamMulai + 1
            }
        } else {
            for (let i = 0; i < selisih; i++) {
                if (malamMulai < 10 && (malamMulai + 1) >= 10) {
                    setJadwalMalam(Object.assign(jadwalMalam, { [`0${malamMulai}.00-${malamMulai + 1}.00`]: 'kosong' }))
                } else if (malamMulai < 10 && (malamMulai + 1) < 10) {
                    setJadwalMalam(Object.assign(jadwalMalam, { [`0${malamMulai}.00-0${malamMulai + 1}.00`]: 'kosong' }))
                } else {
                    setJadwalMalam(Object.assign(jadwalMalam, { [`${malamMulai}.00-${malamMulai + 1}.00`]: 'kosong' }))
                }
                malamMulai = malamMulai + 1
            }
        }

        console.log('Jadwal Malam:')
        console.log(malamMulai)
        console.log(jadwalMalam)
        return selisih
    }

    const gabungJadwal = () => {
        let keyJadwalPagi = Object.keys(jadwalPagi)
        let keyJadwalMalam = Object.keys(jadwalMalam)
        let gabunganJadwal = keyJadwalPagi.concat(keyJadwalMalam)
        return gabunganJadwal
    }

    const gabungHarga = () => {
        let gabunganHarga = []

        //Pagi
        let pagiMulai = parseInt(document.getElementById('jamPagiMulai').value);
        let pagiAkhir = parseInt(document.getElementById('jamPagiAkhir').value);
        let selisihPagi = pagiAkhir - pagiMulai
        for (let i = 0; i < selisihPagi; i++) {
            gabunganHarga.push(hargaPagi)
        }

        //Malam
        let malamMulai = parseInt(document.getElementById('jamMalamMulai').value);
        let malamAkhir = parseInt(document.getElementById('jamMalamAkhir').value);
        let selisihMalam = malamAkhir - malamMulai
        for (let i = 0; i < selisihMalam; i++) {
            gabunganHarga.push(hargaMalam)
        }

        return gabunganHarga
    }

    const lihatJadwal = () => {

        bagiJamPagi()
        bagiJamMalam()
        let gabunganJadwal = gabungJadwal()
        let gabunganHarga = gabungHarga()
        setJadwalTampilan(gabunganJadwal)
        setHargaTampilan(gabunganHarga)
        console.log(jadwalTampilan)
        console.log(hargaTampilan)

        // console.log('Jadwal Gabung')
        // console.log(gabunganJadwal)
        // console.log('Harga Gabung')
        // console.log(gabunganHarga)

    }

    const uploadToClient = (event) => {
        if (event.target.files && event.target.files[0]) {
            var x = document.getElementById("image");

            const i = event.target.files[0];
            setGambar(array => [...array, i.name])
            setImage(array => [...array, i]);
            setCreateObjectURL(array => [...array, URL.createObjectURL(i)]);
        }
    };

    const removeItemArrayGambar = (data) => {
        var index = gambar.indexOf(data)
        if (index >= 0) {
            if (gambar.length === 0) {
                setGambar([])
                setImage([])
                setCreateObjectURL([])
            } else {
                setGambar(array => [...array.slice(0, index), ...array.slice(index + 1)])
                setImage(array => [...array.slice(0, index), ...array.slice(index + 1)])
                setCreateObjectURL(array => [...array.slice(0, index), ...array.slice(index + 1)])
            }
        }
    }

    const uploadToServer = async (event) => {
        const body = new FormData();
        //console.log("file", image)
        for (let i = 0; i < image.length; i++) {
            await body.append("file", image[i]);
            const response = await fetch("/api/upload", {
                method: "POST",
                body
            });
        }
    };

    return (
        <div className="container-xxl mx-auto p-4 header-2-2">
            <h1 style={{ color: 'black' }}>Tambah Lapangan</h1>

            <div >
                <form className='' onSubmit={handlePost}>
                    {error ? (
                        <div >
                            <h3 >{error}</h3>
                        </div>
                    ) : null}
                    {message ? (
                        <div >
                            <h3 >{message}</h3>
                        </div>
                    ) : null}
                    <div className="col-md-12">
                        <label className="labels">Nama Lapangan</label><i style={{ color: '#ff0000', fontSize: 'larger' }}>*</i>
                        <input type="text" className="form-control"
                            name="namaLapangan"
                            value={namaLapangan}
                            onChange={(e) => setNamaLapangan(e.target.value)}
                            required />
                    </div>
                    <div className="mt-2 col-md-12"><label className="labels ">Deskripsi Lapangan</label>
                        <i style={{ color: '#ff0000', fontSize: 'larger' }}>*</i>
                        <textarea className="form-control mb-3"
                            id="exampleFormControlTextarea1" rows={3}
                            name="deskripsi"
                            value={deskripsi}
                            onChange={(e) => setDeskripsi(e.target.value)}
                            required />
                    </div>
                    <div className="mt-2 col-12 col-md-12"><label className="labels">Foto Lapangan</label>
                        <i style={{ color: '#ff0000', fontSize: 'larger' }}>*</i>
                        <div className="mt-2 col-md-12">
                            <div className="custom-file">
                                <input type="file"
                                    onChange={uploadToClient}
                                    className="custom-file-input"
                                    id="validatedCustomFile"
                                    name="myImage" required />
                                <label className="custom-file-label" htmlFor="validatedCustomFile">Choose file...</label>
                            </div>
                        </div>
                    </div>
                    <div className="mt-2 col-12 col-md-12"><label className="labels">Foto Lapangan</label>
                        {gambar.length === 0 ? (
                            <h3>Daftar Foto</h3>
                        ) : (
                            <>

                                {gambar.map((data, i) => (
                                    <>
                                        <div className='cols-2 mt-3 mb-3 row row-cols-2'>
                                            <div className='col-10 col-md-10'>
                                                <img id='image' className='img-fluid d-block border border-dark' width={300} height={300} src={createObjectURL[i]} />
                                            </div>
                                            <div className='col-10 col-md-2'>
                                                <button className="form-control"
                                                    onClick={() => removeItemArrayGambar(data)}
                                                >
                                                    <i className="fa fa-trash"></i></button>
                                            </div>


                                        </div>
                                    </>


                                ))}
                            </>
                        )}
                    </div>
                    <div className='card p-3'>
                        <h4 className="labels" style={{ color: 'black' }}>Atur Jadwal dan Harga</h4>
                        <div className=" mt-2 col-md-12" style={{ color: 'black' }}><label className="labels">Jam Operasional</label>
                            <i style={{ color: '#ff0000', fontSize: 'larger' }}>*</i>
                            <div className='row'>
                                <div className='col-3 col-lg-3 mb-2'>
                                    <input type="time" className="form-control " placeholder="Mulai"
                                        id='jamPagiMulai'
                                        required />
                                </div>
                                <div className='col-1 col-lg-1 mb-2 text-center'>
                                    <strong>_</strong>
                                </div>
                                <div className='col-3 col-lg-3 mb-2'>
                                    <input type="time" className="form-control" placeholder="Akhir" required
                                        id='jamPagiAkhir'
                                    />
                                </div>
                                <div className='col-5 col-lg-5 mb-2'>
                                    <div className='d-flex flex-row'>
                                        <div className='col-2 col-sm-2'>
                                            <label>Rp</label>
                                        </div>
                                        <div className='col-10 col-sm-10'>
                                            <input type="number" className="form-control" placeholder="Harga Pagi"
                                                required
                                                value={hargaPagi}
                                                min="0.01" step="0.01"
                                                onChange={(e) => setHargaPagi(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-3 col-lg-3 mb-2'>
                                    <input type="time" className="form-control "
                                        id='jamMalamMulai'
                                        placeholder="Mulai" required /></div>
                                <div className='col-1 col-lg-1 mb-2 text-center'>
                                    <strong>_</strong>
                                </div>
                                <div className='col-3 col-lg-3 mb-2'>
                                    <input type="time"
                                        id='jamMalamAkhir'
                                        className="form-control" placeholder="Akhir" required />
                                </div>
                                <div className='col-5 col-lg-5 mb-2'>
                                    <div className='d-flex flex-row'>
                                        <div className='col-2 col-sm-2'>
                                            <label>Rp</label>
                                        </div>
                                        <div className='col-10 col-sm-10'>
                                            <input type="number" className="form-control"
                                                placeholder="Harga Malam"
                                                value={hargaMalam}
                                                onChange={(e) => setHargaMalam(e.target.value)}
                                                required />
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div className='d-flex-end flex-row justify-content-end mt-3'>
                                <input type='button' className='btn-fill text-white' onClick={lihatJadwal} value='CEKJADWAL' />
                            </div>

                        </div>
                    </div>
                    <div className='mt-3'>
                        <h4>Jadwal</h4>
                        <hr></hr>
                        <div className='row' id='divJadwal'>

                            {jadwalTampilan.length === 0 ? (
                                <h3>Isi daftar tim</h3>
                            ) : (
                                <>

                                    {jadwalTampilan.map((data, i) => (
                                        <div className='col-3 col-sm-3 mb-2'>
                                            <div className='card text-center'>
                                                <div className='card-body'>
                                                    <span>{data}</span><br></br>
                                                    <span>Rp {hargaTampilan[i].toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".")}</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    <div className="container-login100-form-btn">
                                        <button type="submit" className="btn btn-outline-secondary"
                                            style={{
                                                backgroundColor: '#006E61', color: 'rgb(255, 255, 255)',
                                                borderRadius: '5cm', width: 500, height: 50
                                            }}
                                            onClick={uploadToServer}
                                        >SIMPAN</button>
                                    </div>
                                </>
                            )}

                        </div>

                    </div>
                </form>

            </div>

        </div>
    )

}