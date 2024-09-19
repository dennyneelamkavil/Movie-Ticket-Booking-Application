import { Link } from "react-router-dom";

export default function PaymentSuccessPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-green-50">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-3xl font-bold text-green-600">
          Payment Successful!
        </h1>
        <p className="mt-4 text-lg text-gray-700">
          Thank you for your purchase! Your payment has been processed
          successfully.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="btn btn-success text-white px-6 py-3 rounded-lg hover:bg-green-700"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
