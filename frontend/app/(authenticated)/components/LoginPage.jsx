'use client'; // Add only if you're using App Router with client-side interactions

const LoginPage = ({ setCurrentPage }) => {
  return (
    <main
      className="min-h-screen flex items-center justify-center bg-gray-100 p-4"
      style={{
        backgroundImage:
          "url('https://placehold.co/1920x1080/E0E7E9/333333?text=Rural+Landscape+Background')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="bg-white bg-opacity-90 p-8 md:p-12 rounded-3xl shadow-2xl w-full max-w-md border border-gray-200">
        <h2 className="text-4xl font-bold text-center mb-8 text-gray-800 font-inter">
          Welcome Back!
        </h2>
        <p className="text-lg text-gray-600 text-center mb-8">
          Log in to your Villagestay account.
        </p>

        <form className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-gray-700 text-lg font-medium mb-2"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 text-lg"
              placeholder="you@example.com"
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-gray-700 text-lg font-medium mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 text-lg"
              placeholder="••••••••"
              required
            />
          </div>

          <div className="flex justify-end">
            <a
              href="#"
              className="text-green-600 hover:text-green-800 text-md font-medium transition-colors duration-200"
            >
              Forgot Password?
            </a>
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-xl text-xl transition-all duration-300 transform hover:scale-[1.01] shadow-lg focus:outline-none focus:ring-4 focus:ring-green-300"
          >
            Login
          </button>
        </form>

        <p className="text-center text-gray-600 mt-8 text-lg">
          Don&apos;t have an account?{' '}
          <a
            href="#"
            className="text-green-600 hover:text-green-800 font-semibold transition-colors duration-200"
          >
            Sign Up
          </a>
        </p>
      </div>
    </main>
  );
};

export default LoginPage;