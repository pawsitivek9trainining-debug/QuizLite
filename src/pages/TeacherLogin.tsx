import { useState, FormEvent } from 'react';
import { Home } from 'lucide-react';

function TeacherLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log({ email, password });
    window.history.pushState({}, '', '/teacher/dashboard');
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 space-y-6 relative">
        <button
          onClick={() => {
            window.history.pushState({}, '', '/');
            window.dispatchEvent(new PopStateEvent('popstate'));
          }}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all"
          title="Home"
        >
          <Home size={20} />
        </button>
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-center text-gray-900">
            Teacher Login
          </h1>
          <p className="text-sm text-gray-600 text-center">
            Enter your email and password to login.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              placeholder="teacher@school.edu"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105"
          >
            Login
          </button>
        </form>

        <p className="text-sm text-gray-600 text-center">
          Need an account?{' '}
          <a
            href="/teacher/register"
            onClick={(e) => {
              e.preventDefault();
              window.history.pushState({}, '', '/teacher/register');
              window.dispatchEvent(new PopStateEvent('popstate'));
            }}
            className="text-blue-600 hover:text-blue-700 font-medium hover:underline"
          >
            Register
          </a>
        </p>
      </div>
    </div>
  );
}

export default TeacherLogin;
