const ContactUs = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-3xl text-center">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Contact Us</h1>
        <p className="text-gray-600 text-lg mb-6">
          Got a question? We&apos;re here to help! Feel free to reach out to us
          with any inquiries or feedback.
        </p>

        <form className="space-y-6">
          <div>
            <label className="block text-left text-gray-600 font-medium">
              Your Name
            </label>
            <input
              type="text"
              className="w-full p-3 border rounded-lg"
              placeholder="John Doe"
            />
          </div>
          <div>
            <label className="block text-left text-gray-600 font-medium">
              Your Email
            </label>
            <input
              type="email"
              className="w-full p-3 border rounded-lg"
              placeholder="johndoe@example.com"
            />
          </div>
          <div>
            <label className="block text-left text-gray-600 font-medium">
              Message
            </label>
            <textarea
              className="w-full p-3 border rounded-lg"
              rows="4"
              placeholder="Your message..."
            ></textarea>
          </div>

          <button
            type="submit"
            className="btn btn-primary bg-blue-500 text-white w-full p-3 rounded-lg hover:bg-blue-600"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
