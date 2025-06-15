
import { QuizQuestion } from './types';
import {
  ChatBubbleLeftEllipsisIcon, CodeBracketIcon, LightBulbIcon, MagnifyingGlassIcon, LanguageIcon, CurrencyDollarIcon, PhotoIcon, DocumentTextIcon, UsersIcon, AdjustmentsHorizontalIcon
} from '@heroicons/react/24/outline';


export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'q1',
    text: 'AIツールを主にどのような目的で利用したいですか？',
    icon: ChatBubbleLeftEllipsisIcon,
    options: [
      { text: '文章作成・校正', value: '文章作成・校正' },
      { text: 'プログラミング支援', value: 'プログラミング支援' },
      { text: 'アイデア出し・ブレインストーミング', value: 'アイデア出し' },
      { text: '情報収集・調査', value: '情報収集' },
    ],
  },
  {
    id: 'q2',
    text: '生成される文章の創造性や多様性をどの程度重視しますか？',
    icon: LightBulbIcon,
    options: [
      { text: '非常に重視する', value: '創造性非常に重視' },
      { text: 'ある程度重視する', value: '創造性ある程度重視' },
      { text: 'あまり重視しない（正確さ優先）', value: '創造性あまり重視しない' },
    ],
  },
  {
    id: 'q3',
    text: '日本語の自然さや精度はどの程度重要ですか？',
    icon: LanguageIcon,
    options: [
      { text: '非常に重要（ネイティブレベルを求める）', value: '日本語の自然さ非常に重要' },
      { text: '重要（コミュニケーションに支障がない程度）', value: '日本語の自然さ重要' },
      { text: '普通（多少不自然でも意味が通じればOK）', value: '日本語の自然さ普通' },
    ],
  },
  {
    id: 'q4',
    text: '最新情報や専門知識へのアクセスはどの程度重要ですか？',
    icon: MagnifyingGlassIcon,
    options: [
      { text: '非常に重要（常に最新の情報を参照したい）', value: '最新情報非常に重要' },
      { text: 'ある程度重要（必要に応じて新しい情報も欲しい）', value: '最新情報ある程度重要' },
      { text: 'あまり重要でない（普遍的な知識で十分）', value: '最新情報あまり重要でない' },
    ],
  },
  {
    id: 'q5',
    text: 'API連携や外部ツールとの連携、カスタマイズ性は必要ですか？',
    icon: CodeBracketIcon,
    options: [
      { text: 'はい、必須です', value: 'API連携必須' },
      { text: 'あると嬉しいが、必須ではない', value: 'API連携あると嬉しい' },
      { text: 'いいえ、不要です', value: 'API連携不要' },
    ],
  },
  {
    id: 'q6',
    text: '月々の予算はどのくらいを考えていますか？',
    icon: CurrencyDollarIcon,
    options: [
      { text: '無料プランが第一希望', value: '予算無料' },
      { text: '月2,000円以内', value: '予算2000円以内' },
      { text: '月5,000円以内', value: '予算5000円以内' },
      { text: '特に上限なし（費用対効果重視）', value: '予算上限なし' },
    ],
  },
  {
    id: 'q7',
    text: '画像の生成機能は必要ですか？',
    icon: PhotoIcon,
    options: [
      { text: 'はい、頻繁に使いたいです', value: '画像生成頻繁' },
      { text: 'あると便利だが、必須ではない', value: '画像生成あると便利' },
      { text: 'いいえ、全く不要です', value: '画像生成不要' },
    ],
  },
  {
    id: 'q8',
    text: '長文の読解、要約、または大量のドキュメント処理機能はどの程度重要ですか？',
    icon: DocumentTextIcon,
    options: [
      { text: '非常に重要（日常的に長文を扱う）', value: '長文処理非常に重要' },
      { text: '時々必要になる', value: '長文処理時々必要' },
      { text: 'ほとんど使わない', value: '長文処理不要' },
    ],
  },
  {
    id: 'q9',
    text: '主に個人利用ですか、それともチームやビジネスでの利用ですか？',
    icon: UsersIcon,
    options: [
      { text: '個人利用', value: '個人利用' },
      { text: 'チーム・ビジネス利用（コラボレーション機能重視）', value: 'チーム利用' },
    ],
  },
  {
    id: 'q10',
    text: 'AIツールの設定や機能のカスタマイズ性を重視しますか？',
    icon: AdjustmentsHorizontalIcon,
    options: [
        { text: 'はい、細かく設定を調整したい', value: 'カスタマイズ性重視' },
        { text: 'いいえ、シンプルで使いやすい方が良い', value: 'シンプルさ重視' },
        { text: 'どちらでもない', value: 'カスタマイズ性どちらでもない'}
    ]
  }
];

export const AI_TOOLS_INFO = {
  ChatGPT: {
    name: "ChatGPT",
    plans: [
      { name: "Free", price: "無料", features: "基本的な対話、GPT-3.5ベース", url: "https://chat.openai.com/" },
      { name: "Plus", price: "月額$20", features: "GPT-4o、DALL·E、高度なデータ分析、プラグイン", url: "https://chat.openai.com/plus" },
      { name: "Team", price: "月額$25/ユーザー (年間契約時)", features: "Plusの全機能、チーム向け管理機能、高セキュリティ", url: "https://openai.com/chatgpt/team" }
    ],
    description: "OpenAIによって開発された汎用性の高い対話型AI。無料版から高機能な有料版まで提供。",
    generalUrl: "https://chat.openai.com/"
  },
  Gemini: {
    name: "Gemini",
    plans: [
      { name: "Free (旧Bard)", price: "無料", features: "Gemini Proモデル、Googleアプリとの連携", url: "https://gemini.google.com/" },
      { name: "Advanced (Google One AI Premium)", price: "月額 約3,000円 (プランにより変動)", features: "最先端のGemini 1.5 Proモデル、2TBストレージ、Googleアプリでの高度なGemini機能", url: "https://one.google.com/ai-premium" }
    ],
    description: "Googleによって開発されたマルチモーダルAI。Googleサービスとの連携が強力。",
    generalUrl: "https://gemini.google.com/"
  },
  Claude: {
    name: "Claude",
    plans: [
      { name: "Free", price: "無料", features: "Claude 3 Sonnet (制限あり)、優れた長文処理能力", url: "https://claude.ai/" },
      { name: "Pro", price: "月額$20", features: "Claude 3 Opusへのアクセス (制限あり)、Sonnet/Haikuはより多くの利用が可能、優先アクセス", url: "https://claude.ai/claude-pro" },
      { name: "Team", price: "月額$30/ユーザー", features: "Proの全機能、チームでの利用に最適化、より高い利用上限", url: "https://www.anthropic.com/claude#claude-for-business"}
    ],
    description: "Anthropicによって開発されたAI。特に長文読解・生成、倫理的な応答に強み。",
    generalUrl: "https://claude.ai/"
  },
  Genpark: {
    name: "Genpark",
    description: "ChatGPTやClaudeなど、複数の主要な生成AIモデルを1つのプラットフォームで試せるサービス。様々なAIを手軽に比較検討したい人向け。",
    url: "https://www.genpark.ai/" // Placeholder, actual site might differ or not exist
  }
};
