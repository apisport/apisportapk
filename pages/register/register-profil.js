import { useState } from 'react';
import { useRouter } from 'next/router';
import { useSession, signIn } from 'next-auth/react'
import useSWR from 'swr';
import Link from 'next/link';

export default function Userregister() {
    const [nama, setNama] = useState('');
    const [jenisKelamin, setJenisKelamin] = useState('');
    const [noWa, setNoWa] = useState('');
    const [email, setEmail] = useState('');
    const [available, setAvailable] = useState(true);
    const [timTemp, setTimTemp] = useState('');
    const [tim, setTim] = useState([]);
    const [message, setMessage] = useState('')
    const { data: session, status } = useSession()

    
    const fetcher = (...args) => fetch(...args).then((res) => res.json())
    let url = ''
    if(session){
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




    let router = useRouter()

    const handleSignOut = (e) => {
        signOut({ callbackUrl: '/' })
    }
    

    const handlePost = async (e) => {
        e.preventDefault();
        setEmail(session.user.email)
        // reset error and message
        // fields check
        if (!nama || !jenisKelamin || !noWa || !email || !tim) {
            alert('Harap untuk mengisi semua data');
            return setError('All fields are required');
        }

        if (available) {
            let user = {
                nama,
                jenisKelamin,
                noWa,
                email,
                tim,
            };
            // save the post
            let response = await fetch('/api/userdb', {
                method: 'POST',
                body: JSON.stringify(user),
            });
            // get the data
            let data = await response.json();
            if (data.success) {
                alert('Simpan profil berhasil')
                router.push('/')
                // set the message
                return setMessage(data.message);
            }
            else {
                // set the error
                console.log(data.message);
                return setError(data.message);
            }
        } else {
            alert('Email sudah terdaftar, Mohon gunakan yang lain')
        }
        // post structure

    };

    const onAddItemArray = () => {
        setEmail(session.user.email)
        setTim(tim => [...tim, timTemp]);
        setTimTemp('')
        console.log(tim)

    };

    const removeItemArray = (data) => {
        var index = tim.indexOf(data)
        if (index >= 0) {
            if (tim.length === 0) {
                setTim([])
            } else {
                setTim(tim => [...tim.slice(0, index), ...tim.slice(index + 1)])
            }
        }
    };

    if (session) {
        if(emailDb.user.length != 0){
            return (
                <div className="limiter">
                    <div className="container-login100" style={{ backgroundImage: 'url("/bg-01.jpg")' }}>
                        <div className="wrap-login100 p-3">
                            <form className="login100-form validate-form" >
                                <div className='d-flex flex-row justify-content-center'>
                                    <h3>Email sudah terdaftar</h3>
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
        } else if (emailDb.mitraPending.length != 0) {
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
        }else{
            return(
                <div className="limiter">
                    <div className="container-login100" style={{ backgroundImage: 'url("/bg-01.jpg")' }}>
                        <div className="wrap-login100 p-3">
                            <form className="login100-form validate-form" onSubmit={handlePost}>
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
                                <div className="text-center">
                                    <img className='img-fluid d-blok p-5' src="/y.png" />
                                </div>
                                <span className="login100-form-title p-b-12">
                                    ISI DAFTAR DIRI
                                </span>
                                <div className="p-3 py-2">
                                    <div className="row mt-2">
                                        <div className="mt-2 col-md-12">
                                            <label className="labels">Nama Lengkap</label><i style={{ color: '#ff0000', fontSize: 'larger' }}>*</i>
                                            <input type="text" className="form-control"
                                                required
                                                id='nama'
                                                value={nama}
                                                onChange={(e) => setNama(e.target.value)}
                                            />
                                        </div>
                                        <div className="mt-2 form-radio col-md-12">
                                            <label htmlFor="gender" className="radio-label">Jenis Kelamin</label><i style={{ color: '#ff0000', fontSize: 'larger' }}>*</i>
                                            <div className="form-radio-item">
                                                <input
                                                    type="radio"
                                                    name="gender"
                                                    id="male"
                                                    value={'Laki-laki'}
                                                    onChange={(e) => setJenisKelamin(e.target.value)}

                                                />
                                                <label htmlFor="male">&nbsp;Laki-laki</label>
                                                <span className="check ml-5" />
                                                <input type="radio"
                                                    name="gender"
                                                    id="male"
                                                    value={'Perempuan'}
                                                    onChange={(e) => setJenisKelamin(e.target.value)}
                                                />
                                                <label htmlFor="female">&nbsp;Perempuan</label>
                                                <span className="check" />
                                            </div>
                                        </div>
                                        <div className="mt-2 col-md-12"><label className="labels">No . WhatsApp</label><i style={{ color: '#ff0000', fontSize: 'larger' }}>*</i>
                                            <input type="text" className="form-control" required
                                                name="noWa"
                                                onChange={(e) => setNoWa(e.target.value)}
                                                value={noWa}
                                            />
                                        </div>
                                        {/* <div className="mt-2 col-md-12"><label className="labels">Username</label><i style={{ color: '#ff0000', fontSize: 'larger' }}>*</i>
                                            <input type="text" className="form-control" required
                                                value={session.user.name}
                                            />
                                        </div> */}
                                        <div className="mt-2 col-md-12"><label className="labels">Email</label><i style={{ color: '#ff0000', fontSize: 'larger' }}>*</i>
                                            <input type="text" className="form-control" required
                                                name="email"
                                                id='email'
                                                onChange={(e) => setEmail(e.target.value)}
                                                value={session.user.email}
                                                readOnly
                                            />
                                        </div>
                                        <div className="mt-2 col-md-12"><label className="labels">Username</label><i style={{ color: '#ff0000', fontSize: 'larger' }}>*</i>
                                            <input type="text" className="form-control" required
                                                name="email"
                                                id='email'
                                                value={session.user.name}
                                                readOnly
                                            />
                                        </div>
                                        <div className="mt-2 col-md-12">
                                            <label className="labels">Tambah Tim</label>
                                        </div>
                                        <div className="btn-group col-md-12">
                                            <input type="text" className="form-control col-10 mt-2 col-md-10"
                                                id="tim"
                                                name="tim"
                                                value={timTemp}
                                                onChange={(e) => setTimTemp(e.target.value)}
                                            />
                                            <button className="form-control col-2 mt-2 col-sm-2" type='button'
                                                onClick={onAddItemArray}><i className="fa fa-plus"></i></button>
                                        </div>
                                        <div className="mt-3 col-md-12"><label className="labels">Daftar Tim</label>
                                        </div>
                                        <div>
                                            {tim.length === 0 ? (
                                                <h2>Isi Daftar Tim</h2>
                                            ) : (
                                                <>

                                                    {tim.map((data, i) => (
                                                        <div className="btn-group col-md-12">
                                                            <input type="text" id={i} className="form-control col-10 mt-2 col-md-10" value={data} readOnly />
                                                            <button className="form-control col-2 mt-2 col-sm-2" type='button'
                                                                onClick={() => removeItemArray(data)}
                                                            >
                                                                <i className="fa fa-trash"></i></button>
                                                        </div>
                                                    ))}
                                                </>
                                            )}

                                        </div>

                                        <div className="mt-2 col-md-12"><label className="labels" htmlFor="formFile">Foto Profil</label>
                                            <img className='img-fluid d-block  rounded-circle' id='image' src={session.user.image} />

                                        </div>
                                        <div className="mt-2 d-flex flex-row justify-content-center">

                                        </div>

                                    </div>
                                    <div class="row mt-3 container-login100-form-btn my-3">
                                        <button type="submit"
                                            className="btn btn-outline-secondary" style={{ backgroundColor: '#006E61', color: 'rgb(255, 255, 255)', borderRadius: '5cm', width: 500, height: 50 }}>
                                            SIMPAN PROFIL
                                        </button>
                                    </div>


                                </div>
                            </form>
                        </div>
                    </div>

                </div>
            )
        }
    } else {
        return (
            <><h3>Email sudah terdaftar</h3></>
        )
    }

}