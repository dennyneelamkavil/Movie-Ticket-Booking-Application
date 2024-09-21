import { Link } from "react-router-dom";

export default function PaymentCancelPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-red-50">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-3xl font-bold text-red-600">Payment Cancelled</h1>
        <p className="mt-4 text-lg text-gray-700">
          Your payment process was cancelled. Please try again. <br />
          For any additional questions, please contact support.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="btn btn-error text-white px-6 py-3 rounded-lg hover:bg-red-700"
          >
            Back to Home
          </Link>
          <Link
            to="/contact-us"
            className="ml-4 btn btn-success px-6 py-3 rounded-lg hover:bg-green-600"
          >
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
}
