import React from 'react'

const CardKategori = (props) => {
    return (
        <>
            <a href='/detail-venue'>
                <div className="col card shadow">
                    <div className="card text-start">
                        <img src="images/futsallap.jpg" className="card-img-top" alt="..." width='160' height='90' />
                        <div className="card-body">
                            <h5 className="card-title" style={{ color: "black" }}><strong>Lapangan Mitra</strong></h5>
                            <span className="card-text text-left" style={{ color: "black" }}><icon className='fa fa-calendar'></icon> Senin - Rabu</span><br></br>
                            <span className="card-text" style={{ color: "black" }}><icon className='fa fa-clock'></icon> Pukul 08.00 - 10.00</span><br></br>
                            <span className="card-text" style={{ color: "black" }}><icon className='fa fa-compass'></icon> Jalan Basuki Ahmad No. 8</span><br></br>
                            <span className="card-text" style={{ color: "black" }}><icon className='fa fa-futbol'></icon> Futsal</span><br></br>
                            <span className="card-text text-muted" style={{ color: "black" }}><strong>Harga mulai dari </strong><br></br><span style={{ color: "green" }}>Rp 100.000</span></span>
                        </div>
                    </div>
                </div>
            </a>
        </>
    )
}
export default CardKategori
