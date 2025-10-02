import { useState } from 'react';
import { Copy, ExternalLink, Home } from 'lucide-react';

function MakeQuizLive() {
  const [selectedQuiz, setSelectedQuiz] = useState('');
  const [selectedClassroom, setSelectedClassroom] = useState('');
  const [isLive, setIsLive] = useState(false);
  const [sessionId] = useState('ABC123');

  const handleStartSession = () => {
    if (selectedQuiz && selectedClassroom) {
      setIsLive(true);
    }
  };

  const handleCopyJoinInfo = () => {
    const joinInfo = `Join Code: ${sessionId}\nClassroom: ${selectedClassroom}`;
    navigator.clipboard.writeText(joinInfo);
  };

  const handleOpenMonitor = () => {
    window.history.pushState({}, '', '/teacher/results/123');
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  if (isLive) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-100">
        <div className="max-w-2xl mx-auto py-12 px-4 space-y-8">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-900">Make Quiz Live</h1>
            <button
              onClick={() => {
                window.history.pushState({}, '', '/');
                window.dispatchEvent(new PopStateEvent('popstate'));
              }}
              className="p-2 text-gray-600 hover:text-gray-800 hover:bg-white rounded-lg transition-all"
              title="Home"
            >
              <Home size={20} />
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 space-y-6">
            <div className="text-center space-y-4">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full">
                <svg
                  className="w-8 h-8 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Session Active</h2>
              <p className="text-gray-600">Your quiz is now live and students can join</p>
            </div>

            <div className="border-t border-b border-gray-200 py-6 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-600">Session ID</span>
                <span className="text-2xl font-bold text-blue-600">{sessionId}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-600">Classroom</span>
                <span className="text-lg font-semibold text-gray-900">{selectedClassroom}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleCopyJoinInfo}
                className="flex-1 px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
              >
                <Copy size={18} />
                Copy Join Info
              </button>
              <button
                onClick={handleOpenMonitor}
                className="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2"
              >
                <ExternalLink size={18} />
                Open Live Monitor
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-100">
      <div className="max-w-2xl mx-auto py-12 px-4 space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">Make Quiz Live</h1>
          <button
            onClick={() => {
              window.history.pushState({}, '', '/');
              window.dispatchEvent(new PopStateEvent('popstate'));
            }}
            className="p-2 text-gray-600 hover:text-gray-800 hover:bg-white rounded-lg transition-all"
            title="Home"
          >
            <Home size={20} />
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 space-y-6">
          <h2 className="text-xl font-semibold text-gray-900">Start Live Session</h2>

          <div>
            <label htmlFor="quiz" className="block text-sm font-medium text-gray-700 mb-2">
              Select Quiz
            </label>
            <select
              id="quiz"
              value={selectedQuiz}
              onChange={(e) => setSelectedQuiz(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
            >
              <option value="">Choose a quiz</option>
              <option value="math-quiz-1">Math Quiz 1</option>
              <option value="science-test">Science Test</option>
              <option value="history-quiz">History Quiz</option>
            </select>
          </div>

          <div>
            <label htmlFor="classroom" className="block text-sm font-medium text-gray-700 mb-2">
              Select Classroom
            </label>
            <select
              id="classroom"
              value={selectedClassroom}
              onChange={(e) => setSelectedClassroom(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
            >
              <option value="">Choose a classroom</option>
              <option value="algebra-101">Algebra 101</option>
              <option value="biology-201">Biology 201</option>
              <option value="world-history">World History</option>
            </select>
          </div>

          <button
            onClick={handleStartSession}
            disabled={!selectedQuiz || !selectedClassroom}
            className="w-full px-6 py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold text-lg rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
          >
            Start Live Session
          </button>
        </div>
      </div>
    </div>
  );
}

export default MakeQuizLive;
