export default function Carousel() {
    return (
        <>
            <div className="carousel-item active">
                <img src="images/futsallap.jpg" width='300' height='300' className="d-block w-100" />
            </div>
            <div className="carousel-item" >
                <img src="images/futsallap.jpg" width='300' height='300' className="d-block w-100" />
            </div>
            <div className="carousel-item">
                <img src="images/futsallap.jpg" width='200' height='300' className="d-block w-100" />
            </div>
        </>
    )
}