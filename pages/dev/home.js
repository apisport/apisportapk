export default function Homedev() {
  return (
    <div><div>

      <main>
        <section className="py-2 text-center container">
          <div className="row py-lg-2">
            <div className="col-lg-6 col-md-8 mx-auto">
              <img src='../y.png' className="bd-placeholder-img img-fluid " role="img" aria-label="Placeholder: 140x140" />

              <h1 className="fw-light">API SPORT DEV</h1>
            </div>
          </div>
        </section>
        <div className="py-3 bg-light">
          <div className="container-xxl">
            <div className="row row-cols-2 row-cols-md-4">
              <div className="col-md-4 col-12">
                <div className="card shadow-sm ">
                  <div className="card-body">
                    <h2>DATA USER</h2>
                    <div className="d-flex justify-content-center align-items-center">
                      <div className="text-center">
                        <a href="/dev/user-dev" className="btn btn-primary btn-lg mt-3">View</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4 col-12">
                <div className="card shadow-sm">
                  <div className="card-body">
                    <h2>DATA MITRA</h2>
                    <div className="d-flex justify-content-center align-items-center">
                      <div className="btn-group text-center">
                        <a href="/dev/mitra-dev" className="btn btn-primary btn-lg mt-3 ">View</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4 col-12">
                <div className="card shadow-sm">
                  <div className="card-body">
                    <h2>MITRA PENDING</h2>
                    <div className="d-flex justify-content-center align-items-center">
                      <div className="btn-group text-center">
                        <a href="/dev/mitra-pending" className="btn btn-primary btn-lg mt-3 ">View</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4 mt-3 col-12">
                <div className="card shadow-sm">
                  <div className="card-body">
                    <h2>FAVORIT</h2>
                    <div className="d-flex justify-content-center align-items-center">
                      <div className="btn-group text-center">
                        <a href="/dev/favorit" className="btn btn-primary btn-lg mt-3 ">View</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
    </div>
  )
}