import { useRouter } from 'next/router';
import useSWR from 'swr';
import { useSession, signIn } from 'next-auth/react'

export default function Profil() {
  let router = useRouter()
  const { data: session } = useSession()

  const fetcher = (...args) => fetch(...args).then((res) => res.json())

  let url = ''
  if (session) {
    url = `/api/profildb?emailReq=${session.user.email}`
  }
  const { data: data, error } = useSWR(url, fetcher)

  if (!data) {
    return <div>Anda tidak memiliki akses untuk halaman ini</div>
  } else if (error) {
    return <div>Something went wrong</div>
  }

  let profil = data['message'][0]
  console.log(profil)




  return (
    <div className="limiter">
      <div className="container-login100" style={{ backgroundImage: 'url("./bg-01.jpg")' }}>
        <div className="wrap-login100 p-l-55 p-r-55 p-t-10 p-b-20">
          <div className="container mt-4 mb-4 p-3 d-flex justify-content-center">
            <div className=" image d-flex flex-column justify-content-center align-items-center">
              <h1><b>PROFIL</b></h1>
              <div className="row mt-2 text-start">
                <form>

                </form>
                <div className="mt-2 col-md-12">
                  <label className="labels">Nama Lengkap</label>
                  <input type="text" className="form-control" value={profil.nama} readOnly />
                </div>
                <div className="mt-2 col-md-12"><label className="labels">Daftar Tim</label>
                </div>
                <div className="btn-group col-md-12">
                  <ul>
                    {profil.tim.map((data, i) => (
                      <li><b>{data}</b></li>
                    ))}
                  </ul>


                </div>
                <div className="mt-2 col-md-12"><label className="labels">No . WhatsApp</label><input type="text" className="form-control" value={profil.noWa} readOnly /></div>
                <div className="mt-2 col-md-12"><label className="labels">Email</label><input type="text" className="form-control" value={profil.email} readOnly /></div>
                <div className="mt-2 col-md-12"><label className="labels">Username</label><input type="text" className="form-control" value={session.user.name} readOnly /></div>
              </div>
              <div className='row'>
                <a className='btn btn-fill text-white mt-3' href='/edit-profil'>Edit Profil</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}