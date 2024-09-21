import { Link } from "react-router-dom";

const Unauthorized = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center bg-gray-100 p-6">
      <h1 className="text-4xl font-bold mb-4 text-red-600">
        403 - Unauthorized
      </h1>
      <p className="text-lg mb-6 text-gray-700">
        Oops! You don&apos;t have permission to view this page. If you have an
        account, please sign in to access the content.
      </p>
      <div className="flex flex-col md:flex-row gap-4">
        <Link to="/login" className="btn btn-primary">
          Sign In
        </Link>
        <Link to="/" className="btn btn-outline">
          Go Back to Home
        </Link>
      </div>
    </div>
  );
};

export default Unauthorized;
