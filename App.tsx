
import React, { useState, useCallback, useEffect } from 'react';
import { QuizQuestion, UserAnswer, DiagnosisResult } from './types';
import { QUIZ_QUESTIONS } from './constants';
import QuestionComponent from './components/QuestionComponent';
import ResultsComponent from './components/ResultsComponent';
import { getAiToolRecommendation } from './services/geminiService';
import Header from './components/Header';
import Footer from './components/Footer';

const App: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const [diagnosisResult, setDiagnosisResult] = useState<DiagnosisResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // APIキー入力関連のstateとロジックは削除されました。
  // アプリケーションは process.env.API_KEY が環境で設定されていることを前提とします。

  const handleAnswerSelect = useCallback((question: QuizQuestion, answerValue: string, answerText: string) => {
    setUserAnswers(prevAnswers => [
      ...prevAnswers,
      {
        questionId: question.id,
        questionText: question.text,
        answerValue: answerValue,
        answerText: answerText,
      }
    ]);
    setCurrentQuestionIndex(prevIndex => prevIndex + 1);
  }, []);

  const fetchRecommendation = useCallback(async () => {
    if (userAnswers.length === QUIZ_QUESTIONS.length) {
      setIsLoading(true);
      setError(null);
      try {
        // geminiService は内部で process.env.API_KEY を直接使用します。
        const result = await getAiToolRecommendation(userAnswers);
        setDiagnosisResult(result);
      } catch (err) {
        console.error("診断エラー:", err);
        setError(err instanceof Error ? `診断の取得中にエラーが発生しました: ${err.message}` : "不明なエラーが発生しました。");
      } finally {
        setIsLoading(false);
      }
    }
  }, [userAnswers]);

  useEffect(() => {
    if (currentQuestionIndex === QUIZ_QUESTIONS.length && userAnswers.length === QUIZ_QUESTIONS.length && !diagnosisResult && !isLoading) {
      fetchRecommendation();
    }
  }, [currentQuestionIndex, userAnswers, diagnosisResult, isLoading, fetchRecommendation]);

  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setUserAnswers([]);
    setDiagnosisResult(null);
    setError(null);
    setIsLoading(false);
  };
  
  // APIキー入力フォームの条件分岐を削除しました。
  // アプリは直接メインコンテンツのレンダリングに進みます。
  // APIキーがない場合、getAiToolRecommendation がエラーをスローし、
  // 既存のエラー処理UIが表示されます。

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 flex flex-col items-center justify-center">
        {isLoading && (
          <div className="text-center p-10">
            <svg className="animate-spin h-12 w-12 text-sky-400 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <p className="text-xl font-semibold text-slate-300">あなたに最適なプランを診断中です...</p>
            <p className="text-sm text-slate-400">Gemini AIが賢いアドバイスを生成しています。少々お待ちください。</p>
          </div>
        )}
        {error && (
          <div className="text-center p-10 bg-red-900/30 border border-red-700 rounded-lg shadow-xl">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16 text-red-400 mx-auto mb-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
            </svg>
            <p className="text-xl font-semibold text-red-300 mb-2">エラーが発生しました</p>
            <p className="text-slate-300 mb-6">{error}</p>
            <button
              onClick={restartQuiz}
              className="bg-sky-600 hover:bg-sky-500 text-white font-semibold py-2 px-6 rounded-md transition duration-150 ease-in-out transform hover:scale-105"
            >
              もう一度試す
            </button>
          </div>
        )}
        {!isLoading && !error && diagnosisResult && (
          <ResultsComponent result={diagnosisResult} onRestart={restartQuiz} />
        )}
        {!isLoading && !error && !diagnosisResult && currentQuestionIndex < QUIZ_QUESTIONS.length && (
          <QuestionComponent
            question={QUIZ_QUESTIONS[currentQuestionIndex]}
            onAnswerSelect={handleAnswerSelect}
            currentIndex={currentQuestionIndex}
            totalQuestions={QUIZ_QUESTIONS.length}
          />
        )}
      </main>
      <Footer />
    </div>
  );
};

export default App;
