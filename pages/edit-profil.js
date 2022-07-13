export default function EditProfil() {
  function myFunction() {
    var x = document.getElementById("passwordInput");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  }
  return (
    <div className="limiter">
      <div className="container-login100" style={{ backgroundImage: 'url("./bg-01.jpg")' }}>
        <div className="wrap-login100 p-l-55 p-r-55 p-t-10 p-b-20">
          <form className="login100-form validate-form">
            <div className="p-3 py-5">
              <div className="d-flex justify-content-center align-items-center mb-3">
                <h1 className="text-center">Ubah Profil</h1>
              </div>
              <div className="row mt-2">
                <div className="mt-2 col-md-12">
                  <label className="labels">Nama Lengkap</label>
                  <input type="text" className="form-control" placeholder="Nama Lengkap" />
                </div>
                <div className="mt-2 col-md-12">
                  <label className="labels">Tambah Tim</label>
                </div>
                <div className="d-flex flex-row">
                  <input type="text" className="form-control mt-2 col-10 col-md-8 col-sm-8" placeholder="Tambah Tim" />
                  <button href='#' className="form-control mt-2 col-2 col-md-4 col-sm-4"><i className="fa fa-plus"></i></button>
                </div>
                <div className="mt-2 col-md-12"><label className="labels">Daftar Tim</label>
                </div>
                <div className="btn-group col-md-12">
                  <input type="text" className="form-control mt-2 col-10 col-md-10" placeholder="Barca Fc" readOnly />
                  <button href='#' className="form-control mt-2 col-2 col-md-2"><i className="fa fa-trash"></i></button>
                </div>
                <div className="mt-2 form-radio col-md-12">
                  <label htmlFor="gender" className="radio-label">Jenis Kelamin</label>
                  <div className="form-radio-item">
                    <input type="radio" name="gender" id="male" defaultChecked />
                    <label htmlFor="male">Laki-laki</label>
                    <span className="check ml-5" />
                    <input type="radio" name="gender" id="female" />
                    <label htmlFor="female">Perempuan</label>
                    <span className="check" />
                  </div>
                </div>
                <div className="mt-2 col-md-12"><label className="labels">No . WhatsApp</label><input type="text" className="form-control" placeholder="Masukkan No. WhatsApp" /></div>
                <div className="mt-2 col-md-12"><label className="labels">Email</label><input type="text" className="form-control" placeholder="Masukkan Email" readOnly /></div>
                <div className="mt-2 col-md-12"><label className="labels">Username</label><input type="text" className="form-control" placeholder="Username" readOnly /></div>
                <div className="mt-2 col-md-12">
                  <label className="labels">Password</label>
                </div>
                <div className="btn-group col-md-12">
                  <input type="text" className="form-control col-10 col-md-10" id='passwordInput' placeholder="Password" />
                  <button onClick={() => { myFunction() }} className="form-control col-2 col-sm-2"><i className="fa fa-eye"></i></button>
                </div>
                <div className="mt-2 col-md-12"><label className="labels" htmlFor="formFile">Pilih Foto Profil</label>
                  <div className="custom-file">
                    <input type="file" className="custom-file-input" id="validatedCustomFile" required />
                    <label className="custom-file-label" htmlFor="validatedCustomFile">Choose file...</label>
                    <div className="invalid-feedback">Example invalid custom file feedback</div>
                  </div>

                </div>
              </div>
              {/* <div class="row mt-3">
							<div class="col-md-6"><label class="labels">Country</label><input type="text" class="form-control" placeholder="country" value=""></div>
							<div class="col-md-6"><label class="labels">State/Region</label><input type="text" class="form-control" value="" placeholder="state"></div>
						</div> */}
              <div className="mt-5 text-center">
                <button type="button" className="btn btn-outline-secondary p-3" style={{ backgroundColor: '#006E61', color: 'rgb(255, 255, 255)', borderRadius: '5cm' }}>SIMPAN PROFIL</button>
              </div>
            </div></form>
        </div>
      </div>
    </div>

  )
}