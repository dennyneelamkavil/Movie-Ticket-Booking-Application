import LoginForm from "../component/LoginForm";
import SignupForm from "../component/SignupForm";
// import useLoginStore from "../store/loginStore";

export default function LoginPage() {
  const { isLogin } = useLoginStore();
  return (
    <div className="flex justify-center items-center h-screen w-full">
      {/* {isLogin ? <LoginForm /> : <SignupForm />} */}
    </div>
  );
}
