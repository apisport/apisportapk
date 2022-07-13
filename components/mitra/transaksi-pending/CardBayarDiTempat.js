import { Router } from "next/router";

export default function CardBayarDiTempat({ props }) {
    const handlePost = async (e, id) => {
        let statusT = 'lunas'
        console.log(statusT)
        // fields check
        try {
            // Update post
            await fetch('/api/transaksipendingdb', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    status: statusT,
                    idTransaksi: id
                }),
            });
            // reload the page
            alert('Transaksi telah lunas')
            Router.push('/mitra/transaksi-pending')
        } catch (error) {
            // Stop publishing state
            console.log('Not Working')
        }
    }
    return (
        <>
            {props.length === 0 ? (
                <h2>Tidak ada data</h2>
            ) : (
                <>
                    {props.map((data, index) => (
                        <div key={index} className="shadow-sm col-12 col-lg-5 border border-2 mb-4 ml-3 p-3 text-start">
                            <h1>{data.lapangan}</h1>
                            <h4><b>Nama Pemesan:</b>{data.nama}</h4>
                            <h4><b>Nama Tim:</b>{data.tim}</h4>
                            <h4><b>Opsi Pembayaran:</b> {data.opsiBayar}</h4>
                            {data.opsiBayar != 'DP' ? (
                                <h4><b>Harga :</b>{` Rp ${data.harga.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".")}`}</h4>
                            ) : (
                                <div>
                                    <h4><b>Harga :</b>{` Rp ${data.harga.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".")}`}</h4>
                                    <h4><b>Harga DP:</b>{` Rp ${data.hargaDP.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".")}`}</h4>
                                </div>
                            )}
                            <hr></hr>
                            <h5><b>Diterima:</b> {data.diterima}</h5>
                            <h5><b>Tanggal Main:</b> {data.tglMain}</h5><br></br>
                            <a onClick={(e) => handlePost(e, data._id)} className="btn btn-success text-white p-3 mb-2">Lunas</a>
                        </div>
                    ))}
                </>
            )}


        </>

    )
}