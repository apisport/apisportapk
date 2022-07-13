//@ts-check
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useSession, signIn } from 'next-auth/react'
import useSWR from "swr";
import { now } from 'next-auth/client/_utils';

export default function Home() {

  var currentdate = new Date();
  var dateTime = currentdate.getDate() + "/"
    + (currentdate.getMonth() + 1) + "/"
    + currentdate.getFullYear() + " | "
    + currentdate.getHours() + ":"
    + currentdate.getMinutes() + ":"
    + currentdate.getSeconds();

  let nama = ''
  let lapangan = ''
  let noWa = ''
  let email = ''
  const [tim, setTim] = useState('');
  const [noRekening, setNoRekening] = useState('');
  const [opsiBayar, setOpsiBayar] = useState('');
  const [buktiBayar, setBuktiBayar] = useState('');
  const [createObjectURL, setCreateObjectURL] = useState(null);
  const [message, setMessage] = useState('');
  const [image, setImage] = useState('');
  let namaVenue = ''
  let tglMain = ''
  let jadwalMain = []
  let harga = 0
  const [hargaDP, setHargaDP] = useState('-');
  const [opsiBayarDP, setOpsiBayarDP] = useState(false);
  let diterima = ''
  const [status, setStatus] = useState('pending');
  const [error1, setError1] = useState('')

  // Backup State
  // const [nama, setNama] = useState('Yosi');
  // const [noWa, setNoWa] = useState('081');
  // const [tim, setTim] = useState('Ambyar FC');
  // const [namaVenue, setNamaVenue] = useState('Scuttod');
  // const [tglBooking, setTglBooking] = useState('20-03-2022');
  // const [tglMain, setTglMain] = useState('2022-06-09');
  // const [jadwalMain, setJadwalMain] = useState([]);
  // const [lapangan, setLapangan] = useState('Lapangan 2');
  // const [harga, setHarga] = useState(50);
  // const [status, setStatus] = useState('pending');
  // const [noRekening, setNoRekening] = useState('2342543 - Bank BCA');
  // const [opsiBayar, setOpsiBayar] = useState('DP');
  // const [diterima, setDiterima] = useState(dateTime);
  // const [buktiBayar, setBuktiBayar] = useState('');
  // const [createObjectURL, setCreateObjectURL] = useState(null);
  // const [message, setMessage] = useState('');

  //Variabel Biasa


  const { data: session } = useSession()

  //Router
  let router = useRouter()
  const { jadwalPesanReq,
    totalHargaReq,
    namaVenueReq,
    namaLapanganReq,
    tglMainReq
  } = router.query


  //Suwir
  const fetcher = (...args) => fetch(...args).then((res) => res.json())
  let url = ''
  url = `/api/pembayarandb?emailReq=${`api.sport.team@gmail.com`}&namaVenueReq=${namaVenueReq}`
  if (session) {
    url = `/api/pembayarandb?emailReq=${session.user.email}&namaVenueReq=${namaVenueReq}`
  }
  const { data: data, error } = useSWR(url, fetcher)

  if (!data) {
    return <div>Access denied</div>
  } else if (error) {
    return <div>Something went wrong</div>
  }

  //Deklarasi Array JSON SWR
  let profil = data['message']
  // console.log(profil)

  //Pemanggilan Function
  const setValue = () => {
    jadwalMain = JSON.parse(jadwalPesanReq)
    harga = totalHargaReq
    namaVenue = namaVenueReq
    lapangan = namaLapanganReq
    tglMain = tglMainReq
    diterima = dateTime

  }
  setValue()

  const aturOpsiBayar = (data) => {
    setOpsiBayar(data)
    if (data == 'DP') {
      hitungHargaDP()
      setOpsiBayarDP(true)
    } else {
      setOpsiBayarDP(false)
      setHargaDP('-')
    }
    // console.log(opsiBayarDP)

  }

  const hitungHargaDP = () => {
    let DPhitung = parseInt(profil.infoVenue[0].DP)
    let hargaDPHitung = harga - (((DPhitung / 100) * harga))
    let hargaDPhitungString = hargaDPHitung.toString()
    setHargaDP(hargaDPhitungString)
    console.log(hargaDP)
  }

  const handlePost = async (e) => {
    e.preventDefault();
    // reset error and message
    setMessage('');
    // fields check
    

    // post structure
    let transaksi = {
      nama,
      email,
      lapangan,
      noWa,
      tim,
      noRekening,
      opsiBayar,
      buktiBayar,
      namaVenue,
      tglMain,
      jadwalMain,
      harga,
      hargaDP,
      status
    };
    // save the post
    let response = await fetch('/api/transaksidb', {
      method: 'POST',
      body: JSON.stringify(transaksi),
    });
    // get the data
    let data = await response.json();
    if (data.success) {
      // reset the fields
      alert('Transaksi pending, Mohn tunggu persetujuan Mitra!')
      router.push('/')
      return setMessage(data.message);
    }
    else {
      // set the error
      console.log(data.message);
      return setError1(data.message);
    }
  };

  const uploadToClient = (event) => {
    if (event.target.files && event.target.files[0]) {
      const i = event.target.files[0];
      setBuktiBayar(i.name)
      setImage(i);
      setCreateObjectURL(URL.createObjectURL(i));
    }
  };
  const uploadToServer = async (event) => {
    const body = new FormData();
    //console.log("file", image)
    body.append("file", image);
    const response = await fetch("/api/upload", {
      method: "POST",
      body
    });
  };


  return (
    <div className="container-xxl p-3">
      <div className="d-flex flex-row justify-content-center">
        <h1 className="mb-3">Form Pembayaran</h1>
      </div>

      <div className="p-3">
        <div className="container-xxl card p-3 shadow-lg">
          <div className="row">
            <div className="px-md-5 p-3 col-md-12 align-items-start justify-content-center" >
              <h1><b>{namaVenue}</b></h1>
              <h3 ><b>Lapangan:</b>&nbsp;{lapangan}</h3>
              <h4><b>Tgl Main:</b>&nbsp;{tglMain}</h4><br></br>
              <div className="row">
                <h3><b>Jadwal Main:</b></h3>
                {jadwalMain.map((data, i) => (
                  <>
                    <div className='col-12 col-sm-4 mb-2'>
                      <div className='card'>
                        <div className='card-body'>
                          <h2>{data}</h2>
                        </div>
                      </div>
                    </div>
                  </>
                ))}
              </div>
              <h5>Pesanan dibuat pada <b>{dateTime}</b></h5>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4">
        <div className="container-login100">
          <form onSubmit={handlePost}>
            <div className="form-group">
              <label htmlFor="exampleFormControlInput1">Nama Pemesan : </label>
              <input  type="text" className="form-control"  />
            </div>
            <div className="form-group">
              <label htmlFor="exampleFormControlInput1">E-mail : </label>
              <input type="text" className="form-control"  />
            </div>
            <div className="form-group">
              <label htmlFor="exampleFormControlSelect1">Nama Tim</label>
              {/* <select className="form-control form-select" id="exampleFormControlSelect1" onChange={(e) => setTim(e.target.value)}>
                <option>--Pilih Tim--</option>
                {profil.profil[0].tim.map((data, i) => (
                  <option value={data}>{data}</option>
                ))}
              </select> */}
            </div>
            <div className="form-group">
              <label htmlFor="exampleFormControlInput1">No. WA Pemesan: </label>
              <input type="number" className="form-control"   />
            </div>
            <div className="form-group">
              <label htmlFor="exampleFormControlInput1">Total Bayar : </label>
              <input type="text" className="form-control" value={`Rp ${harga}.000`}  />
            </div>
            {opsiBayarDP &&
              <div className="form-group">
                <label htmlFor="exampleFormControlInput1">Total Bayar (DP): </label>
                <input type="text" className="form-control" value={`Rp ${hargaDP}.000`} readOnly />
              </div>
            }

            <div className="form-group">
              <label htmlFor="exampleFormControlSelect1">No. Rekening</label>
              <select className="form-control form-select" id="exampleFormControlSelect1" onChange={(e) => setNoRekening(e.target.value)}>
                <option>--Pilih No. Rekening--</option>
                {profil.infoVenue[0].rekening.map((data, i) => (
                  <option value={data}>{data}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Opsi Bayar</label>
              <select className=" form-select" onChange={(e) => aturOpsiBayar(e.target.value)}>
                <option>--Pilih Opsi Bayar--</option>
                {profil.infoVenue[0].opsiBayar.map((data, i) => (
                  <option value={data}>{data}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <div className="mt-2 col-md-12"><label className="labels" htmlFor="formFile">Bukti Bayar</label>
                <input type="file"
                  id="validatedCustomFile"
                  className="form-control form-file"
                  name="myImage" onChange={uploadToClient}
                  required
                />
              </div>
            </div>

            <div className="mt-4 text-center">
              <img src={createObjectURL} className="img-fluid" />
            </div>
            <div className="d-flex flex-row mt-3">
              <span className='font-weight-normal' style={{ color: 'red' }}><b>*Mohon untuk mengupload bukti pembayaran hingga 13:30 WIB atau pembayaran akan di cancel</b></span>
            </div>
            <div className="d-grid gap-2 py-4 ">
              <button className="btn btn-primary p-3 fw-bold" type="submit" onClick={uploadToServer} style={{ backgroundColor: '#006E61' }}>Kirim</button>
            </div>
          </form>
        </div>
      </div>
    </div>

  )
}