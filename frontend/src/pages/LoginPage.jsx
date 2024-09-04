import { useSelector } from "react-redux";
import LoginForm from "../component/LoginForm";
import SignupForm from "../component/SignupForm";

export default function LoginPage() {
  const {showLogin} = useSelector((state) => state.auth);
  return (
    <div className="flex justify-center items-center h-screen w-full">
      {showLogin ? <LoginForm /> : <SignupForm />}
    </div>
  );
}
