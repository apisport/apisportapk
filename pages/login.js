export default function Login() {
    return (
      <div className="limiter">
        
  <div className="container-login100" style={{backgroundImage: 'url("./bg-01.jpg")'}}>
    <div className="wrap-login100 p-l-55 p-r-55 p-t-10 p-b-20">
      <form className="login100-form validate-form">
        <div className="text-center">
          <img src="./y.png" style={{height: '5cm', width: '5cm'}} />
        </div>					  
        <span className="login100-form-title p-b-49">
          LOGIN
        </span>
        <div className="wrap-input100 validate-input m-b-23" data-validate="Username is required">
          <span className="label-input100">Username</span>
          <input className="input100" type="text" name="username" placeholder="Ketik username anda di sini!" />
          <span className="focus-input100" data-symbol="" />
        </div>
        <div className="wrap-input100 validate-input" data-validate="Password is required">
          <span className="label-input100">Password</span>
          <input className="input100" type="password" name="pass" placeholder="Ketik password anda di sini!" />
          <span className="focus-input100" data-symbol="" />
        </div>
        <div className="text-right p-t-8 p-b-31">
          <a href="#">
            Lupa password?
          </a>
        </div>
        
        <div className="container-login100-form-btn">
          <button type="button" className="btn btn-outline-secondary" style={{backgroundColor: '#006E61', color: 'rgb(255, 255, 255)', borderRadius: '5cm', width: 500, height: 50}}>LOGIN</button>
        </div>
        <div className="txt1 text-center p-t-20 p-b-20">
          <span>
            atau
          </span>
        </div>
        <div className="flex-c-m">
          <span>
            Login dengan
          </span>
          <a href="#" className="login100-social-item bg1">
            <i className="fa fa-facebook" />
          </a>
          <a href="#" className="login100-social-item bg3">
            <i className="fa fa-google" />
          </a>
        </div>
        <div className="flex-col-c p-t-50">
          <span className="txt1 p-b-10">
            Belum punya akun? 
            <a href="./register" className="txt2">
            &nbsp;<u>Buat akun</u>
            </a>
          </span>	
        </div>
      </form>
    </div>
  </div>
</div>
    )
}