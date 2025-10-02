import { AlertCircle } from 'lucide-react';

function NotFound() {
  const handleTeacherLogin = () => {
    window.history.pushState({}, '', '/teacher/login');
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  const handleStudentJoin = () => {
    window.history.pushState({}, '', '/student/classroom');
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full p-12 text-center space-y-6">
        <div className="flex justify-center">
          <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center">
            <AlertCircle className="w-12 h-12 text-gray-500" />
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-gray-900">Page not found</h1>
          <p className="text-gray-600">The page you're looking for doesn't exist.</p>
        </div>

        <div className="space-y-3 pt-4">
          <button
            onClick={handleTeacherLogin}
            className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
          >
            Teacher Login
          </button>
          <button
            onClick={handleStudentJoin}
            className="w-full px-6 py-3 bg-white hover:bg-gray-50 text-gray-900 font-semibold rounded-lg border-2 border-gray-300 shadow-md hover:shadow-lg transition-all duration-200"
          >
            Student Join
          </button>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
