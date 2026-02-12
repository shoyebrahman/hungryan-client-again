import { useContext, useEffect, useRef, useState } from "react";
import {
  loadCaptchaEnginge,
  LoadCanvasTemplate,
  LoadCanvasTemplateNoReload,
  validateCaptcha,
} from "react-simple-captcha";
import { AuthContext } from "../../provider/AuthProvider";
import { Link, replace, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import SocialLogin from "../../components/SocialLogin/SocialLogin";

const Login = () => {
  const [disable, setDisable] = useState(true);
  const captchaRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const { signIn } = useContext(AuthContext);
  useEffect(() => {
    loadCaptchaEnginge(6);
  }, []);

  const handlelogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    console.log(email, password);

    signIn(email, password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        Swal.fire({
          title: "Login Successful!",
          icon: "success",
          animation: false,
          timer: 2000,
          showConfirmButton: false,
        });
        navigate(from, { replace: true });
      })
      .catch((error) => console.error(error));
  };

  const handleValidateCaptcha = () => {
    const uservalue = captchaRef.current.value;
    if (validateCaptcha(uservalue)) {
      setDisable(false);
    } else {
      setDisable(true);
    }
  };
  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Login now!</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <form onSubmit={handlelogin}>
            <div className="card-body">
              <fieldset className="fieldset">
                <label className="label">Email</label>
                <input
                  type="email"
                  className="input"
                  placeholder="Email"
                  name="email"
                />
                <label className="label">Password</label>
                <input
                  type="password"
                  className="input"
                  placeholder="Password"
                  name="password"
                />
                <div>
                  <a className="link link-hover">Forgot password?</a>
                </div>
                <label className="label">Type the captcha</label>
                <div>
                  <LoadCanvasTemplate />
                </div>
                <input
                  type="text"
                  ref={captchaRef}
                  className="input input-bordered"
                  placeholder="Type the captcha"
                  name="capcha"
                />
                <button
                  onClick={handleValidateCaptcha}
                  type="button"
                  className="btn btn-outline btn-xs mt-2"
                >
                  Validate
                </button>

                <input
                  className="btn btn-neutral mt-4"
                  disabled={disable}
                  type="submit"
                  value="Login"
                />
              </fieldset>
            </div>
          </form>
          <p>
            New in this site ? <Link to="/register">than Register</Link>
          </p>
          <SocialLogin></SocialLogin>
        </div>
      </div>
    </div>
  );
};

export default Login;
