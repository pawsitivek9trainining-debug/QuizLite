import { useState } from 'react';
import { Plus, Trash2, Home } from 'lucide-react';

type QuestionType = 'MCQ' | 'True-False' | 'Short';

interface Question {
  id: number;
  type: QuestionType;
  text: string;
  options?: string[];
  correctAnswer?: number | string;
  points: number;
}

function QuizBuilder() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [classroom, setClassroom] = useState('');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [nextId, setNextId] = useState(1);

  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        id: nextId,
        type: 'MCQ',
        text: '',
        options: ['', '', '', ''],
        correctAnswer: 0,
        points: 1,
      },
    ]);
    setNextId(nextId + 1);
  };

  const removeQuestion = (id: number) => {
    setQuestions(questions.filter((q) => q.id !== id));
  };

  const updateQuestion = (id: number, updates: Partial<Question>) => {
    setQuestions(
      questions.map((q) => {
        if (q.id === id) {
          const updated = { ...q, ...updates };
          if (updates.type === 'MCQ' && !q.options) {
            updated.options = ['', '', '', ''];
            updated.correctAnswer = 0;
          } else if (updates.type === 'True-False') {
            updated.options = undefined;
            updated.correctAnswer = 'true';
          } else if (updates.type === 'Short') {
            updated.options = undefined;
            updated.correctAnswer = '';
          }
          return updated;
        }
        return q;
      })
    );
  };

  const updateOption = (questionId: number, optionIndex: number, value: string) => {
    setQuestions(
      questions.map((q) => {
        if (q.id === questionId && q.options) {
          const newOptions = [...q.options];
          newOptions[optionIndex] = value;
          return { ...q, options: newOptions };
        }
        return q;
      })
    );
  };

  const handleSaveDraft = () => {
    console.log({ title, description, classroom, questions });
  };

  const handleSaveAndExit = () => {
    console.log({ title, description, classroom, questions });
    window.history.pushState({}, '', '/teacher/dashboard');
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-100">
      <div className="max-w-3xl mx-auto py-12 px-4 space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">New Quiz</h1>
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

        <div className="bg-white rounded-xl shadow-lg p-6 space-y-4">
          <h2 className="text-xl font-semibold text-gray-900">Quiz Info</h2>

          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              placeholder="Enter quiz title"
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition resize-none"
              placeholder="Enter quiz description"
            />
          </div>

          <div>
            <label htmlFor="classroom" className="block text-sm font-medium text-gray-700 mb-1">
              Classroom
            </label>
            <select
              id="classroom"
              value={classroom}
              onChange={(e) => setClassroom(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
            >
              <option value="">Select a classroom</option>
              <option value="algebra-101">Algebra 101</option>
              <option value="biology-201">Biology 201</option>
              <option value="world-history">World History</option>
            </select>
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">Questions</h2>
            <button
              onClick={addQuestion}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 flex items-center gap-2"
            >
              <Plus size={18} />
              Add Question
            </button>
          </div>

          {questions.map((question, index) => (
            <div key={question.id} className="bg-white rounded-xl shadow-lg p-6 space-y-4">
              <div className="flex items-start justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Question {index + 1}</h3>
                <button
                  onClick={() => removeQuestion(question.id)}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50 p-2 rounded transition"
                >
                  <Trash2 size={18} />
                </button>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Question Type
                </label>
                <select
                  value={question.type}
                  onChange={(e) => updateQuestion(question.id, { type: e.target.value as QuestionType })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                >
                  <option value="MCQ">Multiple Choice</option>
                  <option value="True-False">True/False</option>
                  <option value="Short">Short Answer</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Question Text
                </label>
                <input
                  type="text"
                  value={question.text}
                  onChange={(e) => updateQuestion(question.id, { text: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                  placeholder="Enter your question"
                />
              </div>

              {question.type === 'MCQ' && question.options && (
                <div className="space-y-3">
                  <label className="block text-sm font-medium text-gray-700">Options</label>
                  {question.options.map((option, optIndex) => (
                    <div key={optIndex} className="flex items-center gap-3">
                      <input
                        type="radio"
                        name={`correct-${question.id}`}
                        checked={question.correctAnswer === optIndex}
                        onChange={() => updateQuestion(question.id, { correctAnswer: optIndex })}
                        className="w-4 h-4 text-blue-600"
                      />
                      <input
                        type="text"
                        value={option}
                        onChange={(e) => updateOption(question.id, optIndex, e.target.value)}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                        placeholder={`Option ${optIndex + 1}`}
                      />
                    </div>
                  ))}
                </div>
              )}

              {question.type === 'True-False' && (
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Correct Answer</label>
                  <div className="flex gap-6">
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name={`tf-${question.id}`}
                        value="true"
                        checked={question.correctAnswer === 'true'}
                        onChange={(e) => updateQuestion(question.id, { correctAnswer: e.target.value })}
                        className="w-4 h-4 text-blue-600"
                      />
                      <span className="text-sm text-gray-700">True</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name={`tf-${question.id}`}
                        value="false"
                        checked={question.correctAnswer === 'false'}
                        onChange={(e) => updateQuestion(question.id, { correctAnswer: e.target.value })}
                        className="w-4 h-4 text-blue-600"
                      />
                      <span className="text-sm text-gray-700">False</span>
                    </label>
                  </div>
                </div>
              )}

              {question.type === 'Short' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Answer Key (Optional)
                  </label>
                  <input
                    type="text"
                    value={question.correctAnswer as string}
                    onChange={(e) => updateQuestion(question.id, { correctAnswer: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                    placeholder="Expected answer"
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Points
                </label>
                <input
                  type="number"
                  value={question.points}
                  onChange={(e) => updateQuestion(question.id, { points: parseInt(e.target.value) || 1 })}
                  min="1"
                  className="w-32 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                />
              </div>
            </div>
          ))}
        </div>

        <div className="flex gap-4 justify-end">
          <button
            onClick={handleSaveAndExit}
            className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold rounded-lg transition-colors duration-200"
          >
            Save & Exit
          </button>
          <button
            onClick={handleSaveDraft}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
          >
            Save Draft
          </button>
        </div>
      </div>
    </div>
  );
}

export default QuizBuilder;
