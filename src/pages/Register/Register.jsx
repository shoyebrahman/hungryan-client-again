import { useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../provider/AuthProvider";
import { useNavigate } from "react-router-dom";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import Swal from "sweetalert2";
import SocialLogin from "../../components/SocialLogin/SocialLogin";

const Register = () => {
  const axiosPublic = useAxiosPublic();
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  const { createUser, updateUserProfile } = useContext(AuthContext);
  const navigate = useNavigate();

  const onSubmit = (data) => {
    console.log(data);
    createUser(data.email, data.password).then((result) => {
      const loggedUser = result.user;
      console.log(loggedUser);
      updateUserProfile(data.name, data.photoURL)
        .then(() => {
          //create user entry
          const userInfo = {
            name: data.name,
            email: data.email,
          };
          axiosPublic.post("/users", userInfo).then((res) => {
            if (res.data.insertedId) {
              reset();
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "user created successfully",
                showConfirmButton: false,
                timer: 1200,
              });
              navigate("/");
            }
          });
        })
        .catch((error) => {
          console.log(error);
        });
    });
  };

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Register now!</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <div className="card-body">
              <fieldset className="fieldset">
                <label className="label">Name</label>
                <input
                  type="text"
                  {...register("name", { required: true })}
                  name="name"
                  className="input"
                  placeholder="Name"
                />
                {errors.name && <span>This field is required</span>}
                <label className="label">PhototUrl</label>
                <input
                  type="text"
                  {...register("photoURL", { required: true })}
                  className="input"
                  placeholder="Photo URL"
                />
                {errors.photoURL && <span>PhotoURL is required</span>}
                <label className="label">Email</label>
                <input
                  type="email"
                  {...register("email", { required: true })}
                  name="email"
                  className="input"
                  placeholder="Email"
                />
                {errors.email && <span>This field is required</span>}
                <label className="label">Password</label>
                <input
                  type="password"
                  {...register("password", {
                    required: true,
                    minLength: 6,
                    maxLength: 20,
                  })}
                  name="password"
                  className="input"
                  placeholder="Password"
                />
                {errors.password?.type === "required" && (
                  <p className="text-red-500">Password is required</p>
                )}

                <input
                  className="btn btn-neutral mt-4"
                  type="submit"
                  value="Register"
                />
              </fieldset>
            </div>
          </div>
        </form>
        <SocialLogin></SocialLogin>
      </div>
    </div>
  );
};

export default Register;
