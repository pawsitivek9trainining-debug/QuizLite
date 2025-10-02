import { useState } from 'react';
import { Users, Home } from 'lucide-react';

function StudentLogin() {
  const [classroomName, setClassroomName] = useState('');

  const handleNext = () => {
    if (classroomName.trim()) {
      window.history.pushState({}, '', '/student/details');
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleNext();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 space-y-6 relative">
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
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 rounded-full mb-2">
            <Users className="w-8 h-8 text-emerald-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Student Login</h1>
          <p className="text-gray-600">Enter the classroom name to join your quiz.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="classroom" className="block text-sm font-medium text-gray-700 mb-2">
              Classroom Name
            </label>
            <input
              type="text"
              id="classroom"
              value={classroomName}
              onChange={(e) => setClassroomName(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition text-lg"
              placeholder="e.g., algebra-101"
              autoFocus
            />
          </div>

          <button
            type="submit"
            disabled={!classroomName.trim()}
            className="w-full px-6 py-4 bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold text-lg rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
          >
            Next
          </button>
        </form>
      </div>
    </div>
  );
}

export default StudentLogin;
