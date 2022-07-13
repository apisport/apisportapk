import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link'
import Router from 'next/router';

export default function DetailUser() {
    let router = useRouter()
    const {
        nama,
        jenisKelamin,
        noWa,
        emailReq,
        objectId } = router.query

    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    // let opsiBayar = JSON.parse(opsiBayarStringify)
    // let rekening = JSON.parse(rekeningStringify)
    // let fotoVenue = JSON.parse(fotoVenueStringify)
    let email = emailReq

    const deleteuser = async () => {
        try {
            console.log('Try')
            await fetch('/api/userdb', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    _id: objectId
                }),
            });
            // reset the deleting state
            // reload the page
            alert('user Terhapus')
            router.push('/dev/user-dev')
        } catch (error) {
            // stop deleting state
        }
    };

    const handleKembali = () => {
        Router.back()
    }

    const handlePost = async (e) => {
        e.preventDefault();
        // fields check
        if (!nama || !jenisKelamin || !noWa || !email) {
            alert('Harap untuk mengisi semua data');
            return setError('Isi Semua Data');
        }
        // post structure
        let user = {
            nama,
            jenisKelamin,
            noWa,
            email
        };
        // save the post
        let response = await fetch('/api/favoritdb', {
            method: 'POST',
            body: JSON.stringify(user),
        });
        // get the data
        let data = await response.json();
        if (data.success) {
            // reset the fields
            alert('Penambahan Favorit Sukses')
            return setMessage(data.message);
        }
        else {
            // set the error
            console.log(data.message);
            return setError(data.message);
        }
    };

    return (
        <div className="limiter">
            <div className="container-login100">
                <form className="login100-form validate-form" onSubmit={handlePost}>
                    <span className="login100-form-title">
                        Detail User
                    </span>
                    <div className="p-3 py-5">
                        <div className="row">
                            <div className=" col-md-12">
                                <label className="labels">Nama </label><i style={{ color: '#ff0000', fontSize: 'larger' }}>*</i>
                                <input type="text" className="form-control"
                                    required
                                    name="nama"
                                    value={nama}
                                    readOnly
                                />
                            </div>
                        </div>

                        <div className="row mt-2">
                            <div className="mt-2 col-md-12">
                                <label className="labels">Jenis Kelamin</label><i style={{ color: '#ff0000', fontSize: 'larger' }}>*</i>
                                <input type="text" className="form-control"
                                    required
                                    value={jenisKelamin}
                                    readOnly
                                />
                            </div>
                        </div>
                        <div className="row mt-2">
                            <div className="mt-2 col-md-12">
                                <label className="labels">No. WA Venue</label><i style={{ color: '#ff0000', fontSize: 'larger' }}>*</i>
                                <input type="text" className="form-control"
                                    required
                                    value={noWa}
                                    readOnly
                                />
                            </div>
                        </div>
                        <div className="row mt-2">
                            <div className="mt-2 col-md-12">
                                <label className="labels">Email</label><i style={{ color: '#ff0000', fontSize: 'larger' }}>*</i>
                                <input type="text" className="form-control"
                                    required
                                    value={email}
                                    readOnly
                                />
                            </div>
                        </div>
                        {/* <div className="col-12 col-md-12">
                            {fotoVenue.length === 0 ? (
                                <h2>Daftar Foto</h2>
                            ) : (
                                <>

                                    {fotoVenue.map((data, i) => (
                                        <>
                                            <div className='cols-2 mt-3 mb-3 row row-cols-2'>
                                                <div className='cols-1 col-md-6'>
                                                    <img id='image' className='img-fluid d-block border border-dark' width={150} height={150} src={`/uploads/${fotoVenue[i]}`} />
                                                </div>


                                            </div>
                                        </>


                                    ))}
                                </>
                            )}
                        </div> */}


                        <div class="row mt-2 my-2 g-2">

                            



                        </div>
                        <div class='d-flex flex-row justify-content-center mt-2 my-2 g-2'>
                            <button type="button"
                                onClick={() => deleteuser()}
                                className="btn btn-outline-secondary mx-3" style={{ backgroundColor: '#c41d0e', color: 'rgb(255, 255, 255)', borderRadius: '5cm', width: 500, height: 50 }}>
                                HAPUS
                            </button>
                            <a onClick={handleKembali}><button type="button"
                                className="btn btn-outline-secondary mx-3" style={{ backgroundColor: '#006E61', color: 'rgb(255, 255, 255)', borderRadius: '5cm', width: 500, height: 50 }}>
                                KEMBALI
                            </button></a>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
