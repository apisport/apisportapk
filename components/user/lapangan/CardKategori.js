import React from 'react'
import Link from 'next/link'

const CardKategori = ({ props }) => {
    let namaHasil = props.namaVenue.split(" ").join("");
    return (
        <>
            <Link href={{
                pathname: '/detail-venue',
                query: {
                    namaVenue: props.namaVenue
                }

            }}>
                <div className="col card shadow">
                    <div className="card text-start">
                        <div id={`kategori${namaHasil}`} className="carousel slide" data-bs-ride="carousel">
                            <div className="carousel-indicators">
                                {props.fotoVenue.map((data, i) => (
                                    <>
                                        {i == 0 ?
                                            (<button type="button" data-bs-target={`#kategori${namaHasil}`} data-bs-slide-to={i} className="active" aria-current="true" aria-label={`Slide ${i}`} />) :
                                            (<button type="button" data-bs-target={`#kategori${namaHasil}`} data-bs-slide-to={i} aria-label={`Slide ${i}`} />)}

                                    </>
                                ))}
                            </div>
                            <div className="carousel-inner">
                                {props.fotoVenue.map((data, i) => (
                                    <>
                                        {i == 0 ?
                                            (<div className="carousel-item active">
                                                <img src={`/uploads/${data}`} className="" width={400} height={200} />
                                            </div>) :
                                            (<div className="carousel-item">
                                                <img src={`/uploads/${data}`} className="" width={400} height={200} />
                                            </div>)}
                                    </>
                                ))}

                            </div>
                            <button className="carousel-control-prev" type="button" data-bs-target={`#kategori${namaHasil}`} data-bs-slide="prev">
                                <span className="carousel-control-prev-icon" aria-hidden="true" />
                                <span className="visually-hidden">Previous</span>
                            </button>
                            <button className="carousel-control-next" type="button" data-bs-target={`#kategori${namaHasil}`} data-bs-slide="next">
                                <span className="carousel-control-next-icon" aria-hidden="true" />
                                <span className="visually-hidden">Next</span>
                            </button>
                        </div>
                        <div className="card-body">
                            <h5 className="card-title" style={{ color: "black" }}><strong>{props.namaVenue}</strong></h5>
                            <span className="card-text text-left" style={{ color: "black" }}><icon className='fa fa-calendar'></icon>{` ${props.hariOperasional}`}</span><br></br>
                            <span className="card-text" style={{ color: "black" }}><icon className='fa fa-clock'></icon> {` Pukul ${props.jamOperasional}`}</span><br></br>
                            <span className="card-text" style={{ color: "black" }}><icon className='fa fa-compass'></icon>{` ${props.alamat}`}</span><br></br>
                            <span className="card-text" style={{ color: "black" }}><icon className='fa fa-futbol'></icon>{` ${props.kategori}`}</span><br></br>
                            <span className="card-text text-muted" style={{ color: "black" }}><strong>Harga mulai dari </strong><br></br><span style={{ color: "green" }}>{props.lapanganVenue.length === 0 ? ('Tidak ada data lapangan') : (`Rp ${props.lapanganVenue[0].hargaPagi.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".")}`)}</span></span>
                        </div>
                    </div>
                </div>
            </Link>
        </>
    )
}
export default CardKategori
