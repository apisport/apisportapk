import { useState } from 'react';
import { useRouter } from 'next/router';
import { useSession, signIn } from 'next-auth/react'
import Link from 'next/link';
import useSWR from 'swr';

export default function Register() {

  const [nama, setNama] = useState('');
  const [jenisKelamin, setJenisKelamin] = useState('');
  const [noWa, setNoWa] = useState('');
  const [email, setEmail] = useState('');
  const [timTemp, setTimTemp] = useState('');
  const [tim, setTim] = useState([]);
  const [image, setImage] = useState(null);
  const [createObjectURL, setCreateObjectURL] = useState(null);
  const [message, setMessage] = useState('');
  const { data: session } = useSession();

  const handleSigninUser = (e) => {
    e.preventDefault()
    signIn('GOOGLE_ID', { callbackUrl: '/register/register-profil' })

  }
  const handleSigninMitra = (e) => {
    e.preventDefault()
    signIn('GOOGLE_ID', { callbackUrl: '/register/mitra-register' })

  }

  return (
    <div className="limiter">
      <div className="container-login100" style={{ backgroundImage: 'url("./bg-01.jpg")' }}>
        <div className="wrap-login100 p-3">
          <form className="login100-form validate-form">
             
            <div className="p-3 py-5">
              
              <div className="flex-c-m">
                {!session && <a href="#" onClick={handleSigninUser} className="btn btn-primary p-3">
                  <i className="fa fa-google" /> &nbsp; &nbsp; &nbsp; Register dengan Google

                </a>}
                {session &&
                  <h3>Anda Sudah Login</h3>
                }

              </div>
              <div className="txt1 text-center mt-2">
                <span>
                  atau
                </span>
              </div>
              <div className='mt-2 col-md-12 text-center' style={{ color: 'red' }}>
                <div className="flex-c-m">
                    <a href="#" className="btn btn-success text-white p-3" onClick={handleSigninMitra}>
                    <i className="fa fa-address-card" /> &nbsp; &nbsp; &nbsp; Register sebagai Mitra
                  </a>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>

    </div>
  )
}