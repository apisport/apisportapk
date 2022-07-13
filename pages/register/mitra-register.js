//@ts-check
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useSession, signIn, signOut } from 'next-auth/react'
import useSWR from 'swr';
import Link from 'next/link';


export default function MitraRegister() {
  const [namaVenue, setNamaVenue] = useState('');
  const [namaPemilikVenue, setNamaPemilikVenue] = useState('');
  const [alamat, setAlamat] = useState('');
  const [noWa, setNoWa] = useState('');
  const [instagram, setInstagram] = useState('');
  const [kategori, setKategori] = useState('');
  const [hariOperasional, setHariOperasional] = useState('');
  const [jamOperasional, setJamOperasional] = useState('');
  const [fasilitas, setFasilitas] = useState('');
  const [opsiBayar, setOpsiBayar] = useState([]);
  const [rekening, setRekening] = useState([]);
  const [DP, setDP] = useState(0);

  //Admin Confined
  const [namaAdmin, setNamaAdmin] = useState('');
  const [noWaAdmin, setNoWaAdmin] = useState('');
  const [email, setEmail] = useState('');
  const { data: session, status } = useSession()

  //Gambar
  const [fotoVenue, setFotoVenue] = useState([]);
  const [image, setImage] = useState([]);
  const [createObjectURL, setCreateObjectURL] = useState([]);
  const [message, setMessage] = useState('');

  let router = useRouter()

  const fetcher = (...args) => fetch(...args).then((res) => res.json())
  let url = ''
  if (session) {
    url = `/api/checkmail?emailReq=${session.user.email}`
  }
  const { data: data, error } = useSWR(url, fetcher)

  if (!data) {
    return <div>Access denied</div>
  } else if (error) {
    return <div>Something went wrong</div>
  }

  let emailDb = data['message']
  console.log(emailDb)


  const handleSignOut = (e) => {
    signOut({ callbackUrl: '/' })
  }

  const handlePost = async (e) => {
    e.preventDefault();
    setEmail(session.user.email)
    setCheck()
    setJam()
    setHari()
    // reset error and message
    setMessage('');
    // fields check
    if (!namaVenue || !namaPemilikVenue || !alamat || !noWa || !instagram || !kategori || !hariOperasional ||
      !jamOperasional || !fasilitas || !opsiBayar || !rekening || !namaAdmin || !noWaAdmin || !fotoVenue || !email) {
      return alert('Harap untuk mengisi semua data');
    }

    // post structure
    let mitraPending = {
      namaVenue,
      namaPemilikVenue,
      alamat,
      noWa,
      instagram,
      kategori,
      hariOperasional,
      jamOperasional,
      fasilitas,
      opsiBayar,
      DP,
      rekening,
      namaAdmin,
      noWaAdmin,
      email,
      fotoVenue
    };
    // save the post
    let response = await fetch('/api/mitrapendingdb', {
      method: 'POST',
      body: JSON.stringify(mitraPending),
    });
    // get the data
    let data = await response.json();
    if (data.success) {
      // reset the fields
      alert('Register berhasil! Mohon Tunggu untuk Persetujuan')
      signOut({ callbackUrl: '/' })
      
      return setMessage(data.message);
    }
    else {
      // set the error
      console.log(data.message);
      return setError(data.message);
    }
  };

  const setJam = () => {
    let valueJamMulai = document.getElementById('jamOperasionalMulai').value
    let valueJamAkhir = document.getElementById('jamOperasionalAkhir').value
    let jadi = `${valueJamMulai} - ${valueJamAkhir}`
    setJamOperasional(jadi)
    setEmail(session.user.email)
  }

  const setHari = () => {
    let hariMulai = document.getElementById('hariOperasionalMulai').value
    let hariAkhir = document.getElementById('hariOperasionalAkhir').value
    let jadi = `${hariMulai} - ${hariAkhir}`
    setHariOperasional(jadi)
    setEmail(session.user.email)
  }

  const setCheck = () => {
    setOpsiBayar([])
    let check = document.getElementsByName('opsiBayar')
    let DP = document.getElementById('DP')
    let len = check.length
    for (var i = 0; i < len; i++) {
      if (check[i].checked) {
        setOpsiBayar(arr => [...arr, check[i].value]);
        if (check[i].value == 'DP') {
          DP.readOnly = false
        }
      } else if (!check[i].checked && check[i].value == 'DP') {
        DP.readOnly = true
        setDP(0)
      }
    }

  };

  const onAddItemArray = () => {
    setCheck()
    setHari()
    setJam()
    let valueBank = document.getElementById('bank').value
    let valueNoRek = document.getElementById('rekening').value
    let jadi = `${valueBank} - ${valueNoRek}`
    setRekening(arr => [...arr, jadi]);
    document.getElementById('bank').value = ''
    document.getElementById('rekening').value = ''
    console.log(`Alamat: ${alamat}`)
    console.log(`Fasilitas: ${fasilitas}`)


  };

  const removeItemArray = (data) => {
    console.log(data)
    console.log('initialSTate:')
    console.log(rekening)
    var index = rekening.indexOf(data)
    if (index >= 0) {
      if (rekening.length === 0) {
        setRekening([])
      } else {
        setRekening(tim => [...tim.slice(0, index), ...tim.slice(index + 1)])
      }
    }

    console.log('afterState:')

  };

  const removeItemArrayGambar = (data) => {
    var index = fotoVenue.indexOf(data)
    if (index >= 0) {
      if (fotoVenue.length === 0) {
        setFotoVenue([])
        setImage([])
        setCreateObjectURL([])
      } else {
        setFotoVenue(array => [...array.slice(0, index), ...array.slice(index + 1)])
        setImage(array => [...array.slice(0, index), ...array.slice(index + 1)])
        setCreateObjectURL(array => [...array.slice(0, index), ...array.slice(index + 1)])
      }
    }

    console.log('afterState:')

  };


  const uploadToClient = (event) => {
    if (event.target.files && event.target.files[0]) {
      var x = document.getElementById("image");

      const i = event.target.files[0];
      setFotoVenue(array => [...array, i.name])
      setImage(array => [...array, i]);
      setCreateObjectURL(array => [...array, URL.createObjectURL(i)]);
    }
  };
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

  

  if (session) {
    if (emailDb.mitra.length === 0 && emailDb.user.length === 0 && emailDb.mitraPending.length === 0) {
      return (
        <div className="limiter">
          <div className="container-login100" style={{ backgroundImage: 'url("/bg-01.jpg")' }}>
            <div className="wrap-login100 p-3">
              <form className="login100-form validate-form" onSubmit={handlePost}>
                <div className="text-center">
                  <img src="/y.png" style={{ height: '5cm', width: '5cm' }} />
                </div>
                <span className="login100-form-title p-b-12" >
                  REGISTER SEBAGAI MITRA
                </span>
                <div className="p-3 py-3">
                  <div className="row mt-2">
                    <div className="col-md-12">
                      <label className="labels">Nama Venue</label><i style={{ color: '#ff0000', fontSize: 'larger' }}>*</i>
                      <input type="text"
                        className="form-control"

                        value={namaVenue}
                        onChange={(e) => setNamaVenue(e.target.value)}
                        required />
                    </div>
                    <div className="col-md-12 mt-2">
                      <label className="labels">Nama Pemilik Venue</label><i style={{ color: '#ff0000', fontSize: 'larger' }}>*</i>
                      <input type="text" className="form-control"
                        value={namaPemilikVenue}
                        onChange={(e) => setNamaPemilikVenue(e.target.value)}

                        required />
                    </div>
                    <div className="mt-2 col-md-12"><label className="labels">Alamat</label>
                      <i style={{ color: '#ff0000', fontSize: 'larger' }}>*</i>
                      <textarea class="form-control"
                        id="exampleFormControlTextarea1"
                        rows="3"
                        value={alamat}
                        onChange={(e) => setAlamat(e.target.value)}
                        required></textarea>
                    </div>
                    <div className="mt-2 col-md-12"><label className="labels">No . WhatsApp Venue</label>
                      <i style={{ color: '#ff0000', fontSize: 'larger' }}>*</i>
                      <input type="text"
                        className="form-control"

                        value={noWa}
                        onChange={(e) => setNoWa(e.target.value)}
                        required />
                    </div>
                    <div className="mt-2 row row-cols col-md-12"><label className="labels">Instagram</label>
                      <div className='col-2 col-md-1 justify-content-center'>
                        <input type="text"
                          value="@" />
                      </div>
                      <div className='col-10 col-md-11'>
                        <input type="text"
                          value={instagram}
                          onChange={(e) => setInstagram(e.target.value)}
                          className="form-control"
                        />
                      </div>

                    </div>
                    <div className="form-group mt-2 col-md-12">
                      <label htmlFor="exampleFormControlSelect1">Kategori Olahraga</label><i style={{ color: '#ff0000', fontSize: 'larger' }}>*</i>
                      <select className="form-control form-select" onChange={(e) => setKategori(e.target.value)} required>
                        <option>--Pilih Olahraga--</option>
                        <option value={'Futsal'}>Futsal</option>
                        <option value={'Bulu Tangkis'}>Bulu Tangkis</option>
                        <option value={'Basket'}>Basket</option>
                        <option value={'Voli'}>Voli</option>
                      </select>
                    </div>

                    <div className="mt-2 col-md-12"><label className="labels">Hari Operasional</label>
                      <i style={{ color: '#ff0000', fontSize: 'larger' }}>*</i>
                      <div className='row'>
                        <div className='col-5 col-lg-5 mb-2'>
                          <select className="form-control form-select" id="hariOperasionalMulai">
                            <option>Mulai</option>
                            <option value={'Senin'}>Senin</option>
                            <option value={'Selasa'}>Selasa</option>
                            <option value={'Rabu'}>Rabu</option>
                            <option value={'Kamis'}>Kamis</option>
                            <option value={"Jum'at"}>Jum'at</option>
                            <option value={'Sabtu'}>Sabtu</option>
                            <option value={'Minggu'}>Minggu</option>
                          </select>
                        </div>
                        <div className='col-2 col-lg-2 mb-2 text-center'>
                          <strong>_</strong>
                        </div>
                        <div className='col-5 col-lg-5 mb-2'>
                          <select className="form-control form-select" id="hariOperasionalAkhir">
                            <option>Akhir</option>
                            <option value={'Senin'}>Senin</option>
                            <option value={'Selasa'}>Selasa</option>
                            <option value={'Rabu'}>Rabu</option>
                            <option value={'Kamis'}>Kamis</option>
                            <option value={"Jum'at"}>Jum'at</option>
                            <option value={'Sabtu'}>Sabtu</option>
                            <option value={'Minggu'}>Minggu</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="mt-2 col-md-12"><label className="labels">Jam Operasional</label>
                      <i style={{ color: '#ff0000', fontSize: 'larger' }}>*</i>
                      <div className='row'>
                        <div className='col-5 col-lg-5 mb-2'>
                          <input type="time" className="form-control " id="jamOperasionalMulai" required /></div>
                        <div className='col-2 col-lg-2 mb-2 text-center'>
                          <strong>_</strong>
                        </div>
                        <div className='col-5 col-lg-5 mb-2'>
                          <input type="time" className="form-control" id="jamOperasionalAkhir" required />
                        </div>
                      </div>
                    </div>
                    <div className="mt-2 col-md-12"><label className="labels">Foto Venue</label>
                      <i style={{ color: '#ff0000', fontSize: 'larger' }}>*</i>
                      <div className="container">
                        <div className="row">
                          <div className="mt-2 col-md-12">
                            <div className="custom-file">
                              <input type="file"
                                onChange={uploadToClient}
                                className="custom-file-input"
                                id="validatedCustomFile" name="myImage" />
                              <label className="custom-file-label" htmlFor="validatedCustomFile">Choose file...</label>
                            </div>
                          </div>
                        </div>
                        <div className="className='col-12 mt-4 col-md-12">
                          {fotoVenue.length === 0 ? (
                            <h2>Daftar Foto</h2>
                          ) : (
                            <>

                              {fotoVenue.map((data, i) => (
                                <>
                                  <div className='cols-2 mt-3 mb-3 row row-cols-2'>
                                    <div className='cols-1 col-md-6'>
                                      <img id='image' className='img-fluid d-block border border-dark' width={150} height={150} src={createObjectURL[i]} />
                                    </div>
                                    <div className='cols-1 col-md-6'>
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
                      </div>
                    </div>

                    <div className="mt-2 col-md-12"><label className="labels">Opsi Pembayaran</label>
                      <i style={{ color: '#ff0000', fontSize: 'larger' }}>*</i>
                      <div>
                        <div className="form-check">
                          <input className="form-check-input" value={'Full Bayar Transfer'} type="checkbox" id="flexCheckDefault" onClick={() => setCheck()} name='opsiBayar' />
                          <label className="form-check-label" htmlFor="flexCheckDefault">
                            Full Bayar Transfer
                          </label>
                        </div>
                        <div className="form-check">
                          <div className='d-flex flex-row gap-2'>
                            <input className="form-check-input" value={'DP'} type="checkbox" onClick={() => setCheck()} id="flexCheckChecked" name='opsiBayar' />
                            <label className="form-check-label" htmlFor="flexCheckChecked">
                              DP
                            </label>
                            <input className='form-control col-xs-2'
                              type='number'
                              style={{ width: '60px' }}
                              id='DP'
                              readOnly={true}
                              value={DP}
                              onChange={(e) => setDP(e.target.value)}
                            /><label>%</label>
                          </div>

                        </div>
                      </div>
                      <div className="form-check">
                        <input className="form-check-input" value={'Bayar di Tempat'} type="checkbox" onClick={() => setCheck()} defaultValue id="flexCheckChecked" name='opsiBayar' />
                        <label className="form-check-label" htmlFor="flexCheckChecked">
                          Bayar Di Tempat
                        </label>
                      </div>
                    </div>
                    <div className="mt-2 col-md-12"><label className="labels">Fasilitas</label>
                      <i style={{ color: '#ff0000', fontSize: 'larger' }}>*</i>
                      <textarea class="form-control"
                        id="exampleFormControlTextarea1"
                        rows="3"
                        required
                        value={fasilitas}
                        onChange={(e) => setFasilitas(e.target.value)}></textarea>
                    </div>
                    <div className="mt-2 col-md-12">
                      <label className="labels">Tambah Rekening</label><i style={{ color: '#ff0000', fontSize: 'larger' }}>*</i>
                    </div>
                    <div className="d-flex flex-row">
                      <div className='row'>
                        <div className='btn-group col-12 col-lg- mb-2'>
                          <input type="text" className='form-control col-3 col-md-3' id='bank' />
                          <strong className='col-1 col-md-1'>_</strong>
                          <input type="text" className="form-control col-6 col-md-6" id='rekening' />
                          <button onClick={onAddItemArray} type='button' className="form-control col-2 col-md-2"><i className="fa fa-plus"></i></button>
                        </div>
                      </div>

                    </div>
                    <div className="mt-2 col-md-12"><label className="labels">Daftar Rekening</label>
                    </div>
                    {rekening.length === 0 ? (
                      <h2>Isi Daftar Rekening</h2>
                    ) : (
                      <>

                        {rekening.map((data, i) => (
                          <div className="btn-group col-md-12">
                            <input type="text" id={i} className="form-control col-10 mt-2 col-md-10" value={data} readOnly />
                            <button className="form-control col-2 mt-2 col-sm-2"
                              onClick={() => removeItemArray(data)} type='button'
                            >
                              <i className="fa fa-trash"></i></button>
                          </div>
                        ))}
                      </>
                    )}

                    <div className="mt-2 col-md-12">
                      <hr className='mt-3'></hr>
                    </div>

                    {/* Bagian Admin */}
                    <div className="mt-1 col-md-12">
                      <label className="labels">Nama Admin</label><i style={{ color: '#ff0000', fontSize: 'larger' }}>*</i>
                      <input type="text"
                        className="form-control"
                        value={namaAdmin}
                        onChange={(e) => setNamaAdmin(e.target.value)}
                        required />
                    </div>
                    <div className="mt-1 col-md-12">
                      <label className="labels">No. Whatsapp Admin</label><i style={{ color: '#ff0000', fontSize: 'larger' }}>*</i>
                      <input type="text" className="form-control"
                        value={noWaAdmin}
                        onChange={(e) => setNoWaAdmin(e.target.value)}
                        required />
                    </div>
                    <div className="mt-1 col-md-12">
                      <label className="labels">Username</label><i style={{ color: '#ff0000', fontSize: 'larger' }}>*</i>
                      <input type="text"
                        className="form-control"
                        value={session.user.name}
                        required
                        readOnly
                        />
                    </div>
                    <div className="mt-1 col-md-12">
                      <label className="labels">E-mail</label><i style={{ color: '#ff0000', fontSize: 'larger' }}>*</i>
                      <input type="text"
                        className="form-control"
                        value={session.user.email}
                        required
                        readOnly
                        />
                    </div>
                  </div>
                  <div className="container-login100-form-btn my-3">
                    <button type="submit"
                      onClick={uploadToServer}
                      className="btn btn-outline-secondary" style={{ backgroundColor: '#006E61', color: 'rgb(255, 255, 255)', borderRadius: '5cm', width: 500, height: 50 }}>DAFTAR</button>
                  </div>
                  <div className="flex-col-c mt-3">
                    <span className="txt1 p-b-10">
                      Sudah punya akun?
                      <a href="./login" className="txt2">
                        &nbsp;<u>LOGIN</u>
                      </a>
                    </span>
                  </div>
                </div>
              </form>
            </div>
          </div>

        </div>
      )
    } else if (emailDb.user.length != 0) {
      return (
        <div className="limiter">
          <div className="container-login100" style={{ backgroundImage: 'url("/bg-01.jpg")' }}>
            <div className="wrap-login100 p-3">
              <form className="login100-form validate-form" >
                <div className='d-flex flex-row justify-content-center'>
                  <h3>Email sudah terdaftar sebagai User</h3>
                </div>
                <div className="p-3 py-5">

                  <div className="flex-c-m">
                    <Link href='/'>
                      <a className="btn btn-primary p-3">
                        <i className="fa fa-google" /> &nbsp; &nbsp; &nbsp; Kembali ke Beranda

                      </a>
                    </Link>
                  </div>
                </div>
              </form>
            </div>
          </div>

        </div>
      )
    } else if (emailDb.mitra.length != 0) {
      return (
        <div className="limiter">
          <div className="container-login100" style={{ backgroundImage: 'url("/bg-01.jpg")' }}>
            <div className="wrap-login100 p-3">
              <form className="login100-form validate-form" >
                <h3>Email sudah terdaftar sebagai Mitra</h3>
                <div className="p-3 py-5">

                  <div className="flex-c-m">
                    <Link href='/mitra/home'>
                      <a className="btn btn-primary p-3">
                        <i className="fa fa-google" /> &nbsp; &nbsp; &nbsp; Lanjut ke Beranda Mitra

                      </a>
                    </Link>
                  </div>
                </div>
              </form>
            </div>
          </div>

        </div>
      )
    }else if (emailDb.mitraPending.length != 0) {
      return (
        <div className="limiter">
          <div className="container-login100" style={{ backgroundImage: 'url("/bg-01.jpg")' }}>
            <div className="wrap-login100 p-3">
              <form className="login100-form validate-form" >
                <h3>Mohon Tunggu untuk Persetujuan Kami</h3>
                <div className="p-3 py-5">

                  <div className="flex-c-m">
                    <Link href='/'>
                      <button className="btn btn-primary p-3" onClick={handleSignOut}>
                        <i className="fa fa-google" /> &nbsp; &nbsp; &nbsp; Kembali ke Beranda

                      </button>
                    </Link>
                  </div>
                </div>
              </form>
            </div>
          </div>

        </div>
      )
    }
  }
  
}
