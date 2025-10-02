import { useState } from 'react';
import { Download, ArrowLeft } from 'lucide-react';

interface Submission {
  srNo: string;
  name: string;
  rank: string;
  submitted: boolean;
  score: number;
  maxScore: number;
}

interface QuestionBreakdown {
  questionNumber: number;
  questionText: string;
  correctPercentage: number;
}

const dummySubmissions: Submission[] = [
  { srNo: '101', name: 'Alice Johnson', rank: 'A1', submitted: true, score: 8, maxScore: 10 },
  { srNo: '102', name: 'Bob Smith', rank: 'A2', submitted: true, score: 7, maxScore: 10 },
  { srNo: '103', name: 'Charlie Brown', rank: 'B1', submitted: false, score: 0, maxScore: 10 },
  { srNo: '104', name: 'Diana Prince', rank: 'A1', submitted: true, score: 9, maxScore: 10 },
  { srNo: '105', name: 'Ethan Hunt', rank: 'B2', submitted: true, score: 6, maxScore: 10 },
  { srNo: '106', name: 'Fiona Carter', rank: 'A2', submitted: false, score: 0, maxScore: 10 },
  { srNo: '107', name: 'George Wilson', rank: 'B1', submitted: true, score: 8, maxScore: 10 },
  { srNo: '108', name: 'Hannah Lee', rank: 'A1', submitted: true, score: 10, maxScore: 10 },
];

const dummyQuestionBreakdown: QuestionBreakdown[] = [
  { questionNumber: 1, questionText: 'What is the capital of France?', correctPercentage: 83 },
  { questionNumber: 2, questionText: 'The Earth is flat.', correctPercentage: 100 },
  { questionNumber: 3, questionText: 'What is the chemical symbol for water?', correctPercentage: 67 },
  { questionNumber: 4, questionText: 'Which planet is known as the Red Planet?', correctPercentage: 83 },
  { questionNumber: 5, questionText: 'JavaScript is the same as Java.', correctPercentage: 100 },
  { questionNumber: 6, questionText: 'What is 2 + 2?', correctPercentage: 83 },
  { questionNumber: 7, questionText: 'What is the largest ocean on Earth?', correctPercentage: 67 },
  { questionNumber: 8, questionText: 'The speed of light is constant in a vacuum.', correctPercentage: 83 },
  { questionNumber: 9, questionText: 'Who painted the Mona Lisa?', correctPercentage: 50 },
  { questionNumber: 10, questionText: 'What is the square root of 144?', correctPercentage: 83 },
];

function TeacherResults() {
  const [sessionStatus, setSessionStatus] = useState<'LIVE' | 'ENDED'>('LIVE');

  const handleEndSession = () => {
    if (confirm('Are you sure you want to end this session?')) {
      setSessionStatus('ENDED');
    }
  };

  const handleExportCSV = () => {
    const csvContent = [
      ['Sr. No.', 'Name', 'Rank', 'Submitted', 'Score'],
      ...dummySubmissions.map(s => [
        s.srNo,
        s.name,
        s.rank,
        s.submitted ? 'Yes' : 'No',
        `${s.score}/${s.maxScore}`
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'quiz-results.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const handleBackToDashboard = () => {
    window.history.pushState({}, '', '/teacher/dashboard');
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-100">
      <div className="max-w-5xl mx-auto py-12 px-4 space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Live Session</h1>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-lg font-semibold text-gray-900">Session Status</span>
              <span
                className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  sessionStatus === 'LIVE'
                    ? 'bg-green-100 text-green-700'
                    : 'bg-gray-100 text-gray-700'
                }`}
              >
                {sessionStatus}
              </span>
            </div>
            {sessionStatus === 'LIVE' && (
              <button
                onClick={handleEndSession}
                className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
              >
                End Session
              </button>
            )}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 space-y-4">
          <h2 className="text-xl font-bold text-gray-900">Submissions</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Sr. No.</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Name</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Rank</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Submitted?</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Score</th>
                </tr>
              </thead>
              <tbody>
                {dummySubmissions.map((submission, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                  >
                    <td className="py-3 px-4 text-gray-900">{submission.srNo}</td>
                    <td className="py-3 px-4 text-gray-900">{submission.name}</td>
                    <td className="py-3 px-4 text-gray-900">{submission.rank}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          submission.submitted
                            ? 'bg-green-100 text-green-700'
                            : 'bg-yellow-100 text-yellow-700'
                        }`}
                      >
                        {submission.submitted ? 'Yes' : 'No'}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-gray-900">
                      {submission.submitted ? `${submission.score}/${submission.maxScore}` : '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 space-y-4">
          <h2 className="text-xl font-bold text-gray-900">Question Breakdown</h2>
          <div className="space-y-3">
            {dummyQuestionBreakdown.map((question) => (
              <div key={question.questionNumber} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">
                    Q{question.questionNumber}: {question.questionText}
                  </span>
                  <span className="text-sm font-semibold text-gray-900">
                    {question.correctPercentage}% correct
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${question.correctPercentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-4">
          <button
            onClick={handleBackToDashboard}
            className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 flex items-center gap-2"
          >
            <ArrowLeft size={20} />
            Back to Dashboard
          </button>
          <button
            onClick={handleExportCSV}
            className="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2"
          >
            <Download size={20} />
            Export CSV
          </button>
        </div>
      </div>
    </div>
  );
}

export default TeacherResults;
