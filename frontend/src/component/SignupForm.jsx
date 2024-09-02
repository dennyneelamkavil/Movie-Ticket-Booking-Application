import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
// import useLoginStore from "../store/loginStore";
// import { signup } from "../apis";

export default function SignupForm() {
//   const { setIsLogin } = useLoginStore();
  const { handleSubmit, register, reset } = useForm();

  const toSignup = async (data) => {
    try {
    //   const res = await signup(data);
    //   toast.success(res.data.message);
    //   setIsLogin();
    } catch (error) {
      toast.error(error.response.data.message);
      reset();
    }
  };

  return (
    <div className="max-w-sm mx-auto p-6 border border-gray-300 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-center mb-4">Sign Up</h2>
      <form
        onSubmit={handleSubmit(toSignup)}
        className="space-y-4"
      >
        <input
          type="email"
          placeholder="Email"
          className="input input-bordered w-full"
          {...register("email")}
        />
        <input
          type="password"
          placeholder="New Password"
          className="input input-bordered w-full"
          {...register("newPassword")}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          className="input input-bordered w-full"
          {...register("password")}
        />
        <button className="btn btn-primary w-full">Sign Up</button>
      </form>
      <p className="text-center text-sm mt-4">
        Already have an account?{" "}
        <span
        //   onClick={setIsLogin}
          className="text-blue-500 cursor-pointer"
        >
          Login here
        </span>
      </p>
    </div>
  );
}
