import { useState } from 'react';
import { ChevronLeft, ChevronRight, Home } from 'lucide-react';

type QuestionType = 'MCQ' | 'True-False' | 'Short';

interface Question {
  id: number;
  type: QuestionType;
  text: string;
  options?: string[];
  points: number;
}

const dummyQuestions: Question[] = [
  {
    id: 1,
    type: 'MCQ',
    text: 'What is the capital of France?',
    options: ['London', 'Paris', 'Berlin', 'Madrid'],
    points: 1,
  },
  {
    id: 2,
    type: 'True-False',
    text: 'The Earth is flat.',
    points: 1,
  },
  {
    id: 3,
    type: 'Short',
    text: 'What is the chemical symbol for water?',
    points: 2,
  },
  {
    id: 4,
    type: 'MCQ',
    text: 'Which planet is known as the Red Planet?',
    options: ['Venus', 'Mars', 'Jupiter', 'Saturn'],
    points: 1,
  },
  {
    id: 5,
    type: 'True-False',
    text: 'JavaScript is the same as Java.',
    points: 1,
  },
  {
    id: 6,
    type: 'Short',
    text: 'What is 2 + 2?',
    points: 1,
  },
  {
    id: 7,
    type: 'MCQ',
    text: 'What is the largest ocean on Earth?',
    options: ['Atlantic Ocean', 'Indian Ocean', 'Arctic Ocean', 'Pacific Ocean'],
    points: 1,
  },
  {
    id: 8,
    type: 'True-False',
    text: 'The speed of light is constant in a vacuum.',
    points: 1,
  },
  {
    id: 9,
    type: 'MCQ',
    text: 'Who painted the Mona Lisa?',
    options: ['Vincent van Gogh', 'Leonardo da Vinci', 'Pablo Picasso', 'Michelangelo'],
    points: 2,
  },
  {
    id: 10,
    type: 'Short',
    text: 'What is the square root of 144?',
    points: 1,
  },
];

function StudentQuiz() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string | number>>({});

  const currentQuestion = dummyQuestions[currentQuestionIndex];
  const totalQuestions = dummyQuestions.length;
  const isLastQuestion = currentQuestionIndex === totalQuestions - 1;

  const handleAnswer = (value: string | number) => {
    setAnswers({
      ...answers,
      [currentQuestion.id]: value,
    });
  };

  const handleNext = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmit = () => {
    console.log('Submitted answers:', answers);
    window.history.pushState({}, '', '/student/done');
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100">
      <div className="max-w-3xl mx-auto py-12 px-4 space-y-8">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Quiz</h1>
            <p className="text-sm text-gray-600 mt-1">Classroom: Algebra 101</p>
          </div>
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
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-500">
              Q {currentQuestionIndex + 1} of {totalQuestions}
            </span>
            <span className="text-sm font-medium text-emerald-600">
              {currentQuestion.points} {currentQuestion.points === 1 ? 'point' : 'points'}
            </span>
          </div>

          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900">
              {currentQuestion.text}
            </h2>

            {currentQuestion.type === 'MCQ' && currentQuestion.options && (
              <div className="space-y-3">
                {currentQuestion.options.map((option, index) => (
                  <label
                    key={index}
                    className="flex items-start gap-3 p-4 border-2 border-gray-200 rounded-lg hover:border-emerald-300 hover:bg-emerald-50 cursor-pointer transition-colors"
                  >
                    <input
                      type="radio"
                      name={`question-${currentQuestion.id}`}
                      value={index}
                      checked={answers[currentQuestion.id] === index}
                      onChange={() => handleAnswer(index)}
                      className="mt-1 w-4 h-4 text-emerald-600"
                    />
                    <span className="flex-1 text-gray-900">{option}</span>
                  </label>
                ))}
              </div>
            )}

            {currentQuestion.type === 'True-False' && (
              <div className="space-y-3">
                <label className="flex items-start gap-3 p-4 border-2 border-gray-200 rounded-lg hover:border-emerald-300 hover:bg-emerald-50 cursor-pointer transition-colors">
                  <input
                    type="radio"
                    name={`question-${currentQuestion.id}`}
                    value="true"
                    checked={answers[currentQuestion.id] === 'true'}
                    onChange={() => handleAnswer('true')}
                    className="mt-1 w-4 h-4 text-emerald-600"
                  />
                  <span className="flex-1 text-gray-900">True</span>
                </label>
                <label className="flex items-start gap-3 p-4 border-2 border-gray-200 rounded-lg hover:border-emerald-300 hover:bg-emerald-50 cursor-pointer transition-colors">
                  <input
                    type="radio"
                    name={`question-${currentQuestion.id}`}
                    value="false"
                    checked={answers[currentQuestion.id] === 'false'}
                    onChange={() => handleAnswer('false')}
                    className="mt-1 w-4 h-4 text-emerald-600"
                  />
                  <span className="flex-1 text-gray-900">False</span>
                </label>
              </div>
            )}

            {currentQuestion.type === 'Short' && (
              <div>
                <textarea
                  value={(answers[currentQuestion.id] as string) || ''}
                  onChange={(e) => handleAnswer(e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition resize-none"
                  placeholder="Type your answer here..."
                />
              </div>
            )}
          </div>
        </div>

        <div className="sticky bottom-0 bg-gradient-to-br from-emerald-50 to-teal-100 py-4">
          <div className="flex gap-4">
            <button
              onClick={handleBack}
              disabled={currentQuestionIndex === 0}
              className="px-6 py-3 bg-white hover:bg-gray-50 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed text-gray-800 font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 flex items-center gap-2"
            >
              <ChevronLeft size={20} />
              Back
            </button>

            {!isLastQuestion && (
              <button
                onClick={handleNext}
                className="flex-1 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2"
              >
                Next
                <ChevronRight size={20} />
              </button>
            )}

            {isLastQuestion && (
              <button
                onClick={handleSubmit}
                className="flex-1 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
              >
                Save & Submit
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentQuiz;
