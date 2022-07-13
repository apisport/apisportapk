import Carousel from '../../components/user/detail-lapangan/Carousel'
import CardJadwal from '../../components/user/detail-lapangan/CardJadwal'
export default function DetailLapangan() {
    return (
        <div className="container">
            <h1 className='mb-3'>Lapangan 1</h1>
            <div className="row mb-3">
                <div className="col md-3 mb-4">
                    {/* SLIDER */}
                    <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
                        <div className="carousel-indicators">
                            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to={0} className="active" aria-current="true" aria-label="Slide 1" />
                            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to={1} aria-label="Slide 2" />
                            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to={2} aria-label="Slide 3" />
                        </div>
                        <div className="carousel-inner">
                            <Carousel />
                        </div>
                        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true" />
                            <span className="visually-hidden">Previous</span>
                        </button>
                        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
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
                        <span>Lapangan ini adalah lapangan matras cocok untuk</span>
                    </div>
                </div>
            </div>
            <div className='mt-3'>
                <h4 className='text-start'>Jadwal Lapangan</h4>
                <input type='date' className='form-control mb-4'></input>
                <div className='card p-3'>
                    <div className='row' style={{ color: 'white' }}>
                        <CardJadwal />
                        <CardJadwal />
                        <CardJadwal />
                        <CardJadwal />
                        <CardJadwal />
                        <CardJadwal />
                        <CardJadwal />
                        <CardJadwal />
                        <CardJadwal />

                    </div>
                </div>

                <div className='row'>
                    <a className='btn btn-primary text-white mt-3 p-3' href='/mitra/tambah-transaksi'>+ Tambah Transaksi</a>
                </div>
                <div className='row'>
                    <a className='btn btn-success text-white mt-3 p-3' href='/mitra/edit-lapangan'><icon className='fa fa-pencil'></icon> Edit Lapangan</a>
                </div>

            </div>
        </div>

    )
}
