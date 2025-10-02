import { CheckCircle, Home } from 'lucide-react';

function StudentDone() {
  const handleReturnToStart = () => {
    window.history.pushState({}, '', '/');
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-2xl p-8 text-center space-y-6 relative">
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
        <div className="flex justify-center">
          <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center">
            <CheckCircle className="w-12 h-12 text-emerald-600" />
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-gray-900">All Set!</h1>
          <p className="text-gray-600">Your answers have been submitted.</p>
        </div>

        <button
          onClick={handleReturnToStart}
          className="w-full px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
        >
          Return to Start
        </button>
      </div>
    </div>
  );
}

export default StudentDone;
