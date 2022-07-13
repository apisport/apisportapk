export default function Tambahtransaksi() {
    return (
        <div className="container-xxl p-3">
            <div className="d-flex flex-row justify-content-center">
                <h1 className="mb-3">Tambah Transaksi</h1>
            </div>

            <div className="p-3">
                <div className="container-xxl card p-3 shadow-lg">
                    <div className="row">
                        <div className="px-md-5 p-3 col-md-6 d-flex flex-column align-items-start justify-content-center" >
                            <h1>Nama Mitra</h1>
                            <p className="mb-3 lead">Lapangan 1</p>
                            <p className="mb-2">Sabtu 5 Maret 2022</p>
                            <div className="row">
                                <div className="col-4 col-lg-4 mr-auto">
                                    <button type="button" class="btn btn-sm btn-primary text-white" disabled>16.00 - 17.00<br />Rp 100.000</button>
                                </div>
                                <div className="col-4 col-lg-4 mr-auto">
                                    <button type="button" class="btn btn-sm btn-primary text-white" disabled>16.00 - 17.00<br />Rp 100.000</button>
                                </div>
                                <div className="col-4 col-lg-4 mr-auto">
                                    <button type="button" class="btn btn-sm btn-primary text-white" disabled>16.00 - 17.00<br />Rp 100.000</button>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 p-3"> <img className=" d-block w-100" src="https://placekitten.com/100/200" height={200} /> </div>
                    </div>
                </div>
            </div>
            <div className="mt-4">
                <div className="container-xxl p-5">
                    <form>
                        <div className="form-group">
                            <label htmlFor="exampleFormControlInput1">Nama Pemesan : </label>
                            <input type="text" className="form-control" placeholder="Isikan Nama Pemesan" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleFormControlInput1">Nama Tim : </label>
                            <input type="email" className="form-control" placeholder="Isikan Nama Tim Pemesan" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleFormControlInput1">No. Telp / WA: </label>
                            <input type="email" className="form-control" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleFormControlInput2">Total Bayar : </label>
                            <input type="email" className="form-control" value={'Rp 130.000'} readOnly />
                        </div>
                        <div className="form-group">
                            <label>Opsi Bayar</label>
                            <select className=" form-select">
                                <option>DP</option>
                                <option>Full Bayar</option>
                                <option>Bayar di Tempat</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleFormControlSelect1">No. Rekening</label>
                            <select className="form-control form-select" id="exampleFormControlSelect1">
                                <option>Bayar di Tempat</option>
                                <option>123 - Bank ABC</option>
                                <option>234 - Bank</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <div className="mt-2 col-md-12"><label className="labels" htmlFor="formFile">Bukti Bayar</label><input type="file" className="form-control form-file" id="formFile" />
                            </div>
                        </div>

                        <div className="mt-4 text-center">
                            <img src="https://placekitten.com/200/300" />
                        </div>
                        <div class="d-grid gap-2 py-4 ">
                            <button class="btn btn-primary p-3" type="button" style={{ backgroundColor: '#006E61' }}>+ Tambah Transaksi</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    )
}