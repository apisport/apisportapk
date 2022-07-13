import CardLapangan from "../components/user/detail-venue/CardLapangan";
import useSWR from "swr";
import { useRouter } from 'next/router';

export default function Detailvenue() {
  const fetcher = (...args) => fetch(...args).then((res) => res.json())
  const router = useRouter()
  const {namaVenue} = router.query
  const { data: data, error } = useSWR(`/api/detailvenuedb?namaVenueReq=${namaVenue}`, fetcher)
  let namaHasil = ''
  if (namaVenue) {
    namaHasil = namaVenue.split(" ").join("");
  }
  

  if (!data) {
    return <div className="spinner"></div>
  } else if (error) {
    return <div>Something went wrong</div>
  }


  let venue = data['message']
  console.log(venue)

  return (
    <div className="container">
      <h1 className="fw-bold fst-italic">Detail Venue</h1>
      <div className="row mb-4">
        <div className="col">
          <div className=" shadow-sm" style={{ backgroundColor: 'white' }}>
            <div className=" rounded ">
              {/* ROW CONTENT */}
              <div className="row p-4">
                <div className="col">
                  {/* SLIDER */}
                  <div id={`${namaHasil}`} className="carousel slide" data-bs-ride="carousel">
                    <div className="carousel-indicators">
                      {venue.infoVenue[0].fotoVenue.map((data, i) => (
                        <>
                          {i == 0 ?
                            (<button type="button" data-bs-target={`#${namaHasil}`} data-bs-slide-to={i} className="active" aria-current="true" aria-label={`Slide ${i}`} />) :
                            (<button type="button" data-bs-target={`#${namaHasil}`} data-bs-slide-to={i} aria-label={`Slide ${i}`} />)}

                        </>
                      ))}
                    </div>
                    <div className="carousel-inner">
                      {venue.infoVenue[0].fotoVenue.map((data, i) => (
                        <>
                          {i == 0 ?
                            (<div className="carousel-item active">
                              <img src={`/uploads/${data}`} className="img-fluid" width={400} height={200} />
                            </div>) :
                            (<div className="carousel-item">
                              <img src={`/uploads/${data}`} className="img-fluid" width={400} height={200} />
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
                <div className="col-md-8 text-start">
                  <h5 className="card-title mt-3" style={{ color: "black" }}><strong>{venue.infoVenue[0].namaVenue}</strong></h5>
                  <span className="card-text" style={{ color: "black" }}><icon className='fa fa-calendar'></icon> {venue.infoVenue[0].hariOperasional}</span><br></br>
                  <span className="card-text" style={{ color: "black" }}><icon className='fa fa-clock'></icon> {venue.infoVenue[0].jamOperasional}</span><br></br>
                  <span className="card-text" style={{ color: "black" }}><icon className='fa fa-compass'></icon> {venue.infoVenue[0].alamat}</span><br></br>
                  <span className="card-text" style={{ color: "black" }}><icon className='fa fa-futbol'></icon> {venue.infoVenue[0].kategori}</span><br></br>
                  <span className="card-text text-muted" style={{ color: "black" }}><strong>Harga mulai dari </strong><br></br><span style={{ color: "green" }}>{venue.infoLapangan.length === 0 ? ('Tidak ada data lapangan tersedia') : (` Rp ${venue.infoLapangan[0].hargaPagi.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".")}`)}</span></span>
                </div>
              </div>
              {/* END ROW */}
            </div>
          </div>
        </div>

      </div>
      <div className='row'>
        <a  style={{ color: "black" }}>
          <h5 className='d-flex justify-content-between'>Fasilitas
          </h5>
        </a>
        <div>
          <div className='d-flex justify-content-between'  >
            <span>{venue.infoVenue[0].fasilitas}</span>
          </div>
        </div>
      </div>
      <div className='row mt-3' style={{ color: "black" }}>
       
          <h5 className='d-flex justify-content-between'>Sosial Media</h5>
        <div>
          <div className="d-flex justify-content-between" >
            <span className='mb-2'><b><icon className='fa fa-instagram' /></b> {venue.infoVenue[0].instagram}</span>
          </div>
          <div className="d-flex justify-content-between" >
            <span className='mb-2'><b><icon className='fa fa-whatsapp' /></b> {venue.infoVenue[0].noWa}</span>
          </div>
        </div>
      </div>
      <div className='row mt-3' style={{ color: "black" }}>
          <h5 className='d-flex justify-content-between'>Daftar Lapangan</h5>
        <div className='row flex-row col-12 col-md-12'>
          {venue.infoLapangan.length === 0 ? (
            <h3>Tidak ada data Lapangan</h3>
          ) : (
            <>
              {venue.infoLapangan.map((data, index) => (
                <CardLapangan props={data} />
              ))}
            </>
          )}
        </div>
      </div>



    </div>

  )
}
