
import React from 'react';
import { QuizQuestion, QuizOption } from '../types';

interface QuestionComponentProps {
  question: QuizQuestion;
  onAnswerSelect: (question: QuizQuestion, value: string, text: string) => void;
  currentIndex: number;
  totalQuestions: number;
}

const QuestionComponent: React.FC<QuestionComponentProps> = ({ question, onAnswerSelect, currentIndex, totalQuestions }) => {
  const IconComponent = question.icon;

  return (
    <div className="w-full max-w-2xl bg-slate-800 shadow-2xl rounded-xl p-6 sm:p-10 transition-all duration-500 ease-in-out">
      <div className="mb-6 text-center">
        <p className="text-sm font-semibold text-sky-400">
          質問 {currentIndex + 1} / {totalQuestions}
        </p>
        <div className="w-full bg-slate-700 rounded-full h-2.5 mt-2 mb-4">
          <div
            className="bg-sky-500 h-2.5 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${((currentIndex + 1) / totalQuestions) * 100}%` }}
          ></div>
        </div>
      </div>

      <div className="flex items-start mb-6">
        {IconComponent && <IconComponent className="h-10 w-10 sm:h-12 sm:w-12 text-sky-400 mr-4 flex-shrink-0 mt-1" />}
        <h2 className="text-2xl sm:text-3xl font-semibold text-slate-100 leading-tight">
          {question.text}
        </h2>
      </div>

      <div className="space-y-4">
        {question.options.map((option: QuizOption) => (
          <button
            key={option.value}
            onClick={() => onAnswerSelect(question, option.value, option.text)}
            className="w-full flex items-center text-left bg-slate-700 hover:bg-sky-700/50 border border-slate-600 hover:border-sky-500 text-slate-200 font-medium py-4 px-5 rounded-lg transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-opacity-75 transform hover:scale-[1.02]"
          >
            {option.icon && <option.icon className="h-5 w-5 mr-3 text-sky-400 flex-shrink-0" />}
            <span className="flex-grow">{option.text}</span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-slate-400 ml-2">
              <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuestionComponent;
