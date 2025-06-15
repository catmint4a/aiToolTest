
import React from 'react';
import { DiagnosisResult, RecommendedTool, AlternativeTool } from '../types';
import { CheckCircleIcon, ArrowPathIcon, InformationCircleIcon, LinkIcon } from '@heroicons/react/24/solid';

interface ResultsComponentProps {
  result: DiagnosisResult;
  onRestart: () => void;
}

const RecommendationCard: React.FC<{ tool: RecommendedTool }> = ({ tool }) => {
  let levelColor = 'text-sky-400';
  if (tool.level === '強く推奨') levelColor = 'text-green-400';
  else if (tool.level === '推奨') levelColor = 'text-yellow-400';

  return (
    <div className="bg-slate-700/50 p-6 rounded-lg shadow-xl border border-slate-600 mb-8 transform transition-all hover:shadow-sky-500/30 hover:scale-[1.01] duration-300">
      <div className="flex items-center mb-4">
        <CheckCircleIcon className={`h-10 w-10 ${levelColor} mr-3`} />
        <div>
          <h2 className="text-3xl font-bold text-slate-100">{tool.name} - {tool.plan}</h2>
          <p className={`text-xl font-semibold ${levelColor}`}>{tool.level}</p>
        </div>
      </div>
      <p className="text-slate-300 mb-4 leading-relaxed">{tool.reasoning}</p>
      {tool.url && (
        <a
          href={tool.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center bg-sky-600 hover:bg-sky-500 text-white font-semibold py-2 px-4 rounded-md transition duration-150 ease-in-out transform hover:scale-105"
        >
          <LinkIcon className="h-5 w-5 mr-2" />
          公式サイトへ
        </a>
      )}
    </div>
  );
};

const AlternativeCard: React.FC<{ tool: AlternativeTool }> = ({ tool }) => {
  return (
    <div className="bg-slate-700 p-5 rounded-lg shadow-lg border border-slate-600 transition-all hover:shadow-indigo-500/20 duration-300">
      <h3 className="text-xl font-semibold text-indigo-400 mb-2">{tool.name}</h3>
      <p className="text-slate-300 text-sm mb-3">{tool.description}</p>
      {tool.url && (
        <a
          href={tool.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-sm text-indigo-400 hover:text-indigo-300 font-medium"
        >
          <LinkIcon className="h-4 w-4 mr-1" />
          詳細を見る
        </a>
      )}
    </div>
  );
};


const ResultsComponent: React.FC<ResultsComponentProps> = ({ result, onRestart }) => {
  return (
    <div className="w-full max-w-3xl bg-slate-800 shadow-2xl rounded-xl p-6 sm:p-10 text-slate-100">
      <h1 className="text-4xl font-bold text-center mb-3 text-sky-300">診断結果</h1>
      <p className="text-center text-slate-400 mb-8">あなたに最適なAIツールプランはこちらです！</p>

      <RecommendationCard tool={result.recommendedTool} />

      {result.alternativeTools && result.alternativeTools.length > 0 && (
        <div className="mb-8">
          <div className="flex items-center mb-4">
             <InformationCircleIcon className="h-7 w-7 text-indigo-400 mr-2" />
            <h3 className="text-2xl font-semibold text-slate-200">その他の推奨ツール</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {result.alternativeTools.map((alt, index) => (
              <AlternativeCard key={index} tool={alt} />
            ))}
          </div>
        </div>
      )}

      <div className="text-center mt-10">
        <button
          onClick={onRestart}
          className="bg-slate-600 hover:bg-slate-500 text-white font-semibold py-3 px-8 rounded-md transition duration-150 ease-in-out transform hover:scale-105 inline-flex items-center"
        >
          <ArrowPathIcon className="h-5 w-5 mr-2" />
          もう一度診断する
        </button>
      </div>
    </div>
  );
};

export default ResultsComponent;
