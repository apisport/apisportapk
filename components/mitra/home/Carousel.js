export default function Carousel({ gambar, nama }) {
    let namaHasil = nama.split(" ").join("");
    return (
        <>
            {/* SLIDER */}
            <div id={`${namaHasil}`} className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-indicators">
                    {gambar.map((data, i) => (
                        <>
                            {i == 0 ?
                                (<button type="button" data-bs-target={`#${namaHasil}`} data-bs-slide-to={i} className="active" aria-current="true" aria-label={`Slide ${i}`} />) :
                                (<button type="button" data-bs-target={`#${namaHasil}`} data-bs-slide-to={i} aria-label={`Slide ${i}`} />)}

                        </>
                    ))}
                </div>
                <div className="carousel-inner">
                    {gambar.map((data, i) => (
                        <>
                            {i == 0 ?
                                (<div className="carousel-item active">
                                    <img src={`/uploads/${data}`} className=" img-fluid"/>
                                </div>) :
                                (<div className="carousel-item">
                                    <img src={`/uploads/${data}`} className=" img-fluid"/>
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
        </>
    )
}