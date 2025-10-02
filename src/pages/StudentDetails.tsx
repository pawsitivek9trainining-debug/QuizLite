import { useState } from 'react';
import { Home } from 'lucide-react';

function StudentDetails() {
  const [srNo, setSrNo] = useState('');
  const [name, setName] = useState('');
  const [rank, setRank] = useState('');

  const handleContinue = () => {
    console.log({ srNo, name, rank });
    window.history.pushState({}, '', '/student/quiz/123');
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  const handleBack = () => {
    window.history.pushState({}, '', '/student/classroom');
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleContinue();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-2xl p-6 space-y-6 relative">
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
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Your Details</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="srNo" className="block text-sm font-medium text-gray-700 mb-1">
              Sr. No.
            </label>
            <input
              type="text"
              id="srNo"
              value={srNo}
              onChange={(e) => setSrNo(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition"
              placeholder="Enter your serial number"
              autoFocus
            />
          </div>

          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition"
              placeholder="Enter your name"
            />
          </div>

          <div>
            <label htmlFor="rank" className="block text-sm font-medium text-gray-700 mb-1">
              Rank
            </label>
            <input
              type="text"
              id="rank"
              value={rank}
              onChange={(e) => setRank(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition"
              placeholder="Enter your rank"
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={handleBack}
              className="flex-1 px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold rounded-lg transition-colors duration-200"
            >
              Back
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
            >
              Continue
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default StudentDetails;
