export default function Profil() {
  return (
    <div className="limiter">
      <div className="container-login100" style={{ backgroundImage: 'url("./bg-01.jpg")' }}>
        <div className="wrap-login100 p-l-55 p-r-55 p-t-10 p-b-20">
          <div className="container mt-4 mb-4 p-3 d-flex justify-content-center">
            <div className=" image d-flex flex-column justify-content-center align-items-center">
              <a href="/edit-profil">
                <button>
                  <img src="./y.png" height={100} width={100} />
                </button>
              </a>
              <div className="row mt-2 text-start">
                <div className="mt-2 col-md-12">
                  <label className="labels">Nama Admin</label>
                  <input type="text" className="form-control" placeholder="Nama Admin" readOnly />
                </div>
                <div className="mt-2 col-md-12">
                  <label className="labels">No. WhatsApp</label>
                  <input type="text" className="form-control" placeholder="No. WhatsApp" readOnly />
                </div>
                <div className="mt-2 col-md-12">
                  <label className="labels">Username</label>
                  <input type="text" className="form-control" placeholder="Username" readOnly />
                </div>
              </div>
              <div className='row'>
                <a className='btn btn-fill text-white mt-3' href='/edit-profil'>Edit Profil</a>
              </div>
              <div className=" px-2 rounded mt-4 date "> <span className="join">Joined May,2021</span> </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}