import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
// import useLoginStore from "../store/loginStore";
// import useAuthStore from "../store/authStore";
// import { login } from "../apis";

export default function LoginForm() {
  //   const { setIsLogin } = useLoginStore();
  const { handleSubmit, register, reset } = useForm();
  //   const navigate = useNavigate();
  //   const { loginAuth } = useAuthStore();

  //   const toLogin = async (data) => {
  //     try {
  //       const res = await login(data);
  //       loginAuth(res.data.token);
  //       toast.success(res.data.message);
  //       navigate("/");
  //     } catch (error) {
  //       toast.error(error.response.data.message);
  //       reset();
  //     }
  //   };

  return (
    <div className="max-w-sm mx-auto p-6 border border-gray-300 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-center mb-4">Login</h2>
      <form
        // onSubmit={handleSubmit(toLogin)}
        className="space-y-4"
      >
        <input type="email" placeholder="Email" className="input input-bordered w-full" {...register("email")} />
        <input
          type="password"
          placeholder="Password"
          className="input input-bordered w-full"
          {...register("password")}
        />
        <button className="btn btn-primary w-full">Login</button>
      </form>
      <p className="text-center text-sm mt-4">
        Don&#39;t have an account?&nbsp;
        <span
          //   onClick={setIsLogin}
          className="text-blue-500 cursor-pointer"
        >
          Sign Up here
        </span>
      </p>
    </div>
  );
}
