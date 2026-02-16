
import React, { useState, useEffect } from 'react';
import { GoogleGenAI } from '@google/genai';
import { BudgetData } from '../types';

interface AIInsightsProps {
  budgetData: BudgetData;
  totals: {
    income: number;
    expenses: number;
    savings: number;
    balance: number;
  };
}

const AIInsights: React.FC<AIInsightsProps> = ({ budgetData, totals }) => {
  const [insight, setInsight] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const fetchInsight = async () => {
    if (totals.income === 0) return;
    
    setLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = `
        Act as a professional financial advisor. Analyze this budget for a single pay period:
        - Income: $${totals.income} (${budgetData.income.frequency})
        - Expenses: $${totals.expenses}
        - Savings Allocation: $${totals.savings}
        - Remaining Balance: $${totals.balance}

        Provide 3 concise, bulleted bullet points of advice for this person. Focus on their savings rate and how much they have left over after obligations. 
        Keep it encouraging but firm.
      `;

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
        config: { temperature: 0.7 }
      });

      setInsight(response.text || 'Unable to generate insights at this time.');
    } catch (error) {
      console.error('Gemini error:', error);
      setInsight('Your personal financial advisor is currently offline. Check back soon!');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchInsight();
    }, 1000);
    return () => clearTimeout(timer);
  }, [totals]);

  return (
    <div className="bg-gradient-to-br from-indigo-900 to-purple-900 p-6 rounded-2xl shadow-xl text-white">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold flex items-center">
          <svg className="w-5 h-5 mr-2 text-indigo-300" fill="currentColor" viewBox="0 0 24 24">
            <path d="M9.813 4.903a.75.75 0 01.746.448l.194.469a4.5 4.5 0 003.727 2.727l.469.194a.75.75 0 010 1.382l-.469.194a4.5 4.5 0 00-3.727 2.727l-.194.469a.75.75 0 01-1.382 0l-.194-.469a4.5 4.5 0 00-3.727-2.727l-.469-.194a.75.75 0 010-1.382l.469-.194a4.5 4.5 0 003.727-2.727l.194-.469a.75.75 0 01.746-.448z" />
          </svg>
          AI Financial Coach
        </h3>
        {loading && <div className="animate-spin w-4 h-4 border-2 border-indigo-300 border-t-transparent rounded-full"></div>}
      </div>

      {loading ? (
        <div className="space-y-2 py-2">
          <div className="h-4 bg-white/10 rounded w-full animate-pulse"></div>
          <div className="h-4 bg-white/10 rounded w-3/4 animate-pulse"></div>
          <div className="h-4 bg-white/10 rounded w-5/6 animate-pulse"></div>
        </div>
      ) : (
        <div className="text-sm leading-relaxed text-indigo-100 prose prose-invert">
          {insight ? (
            <div dangerouslySetInnerHTML={{ __html: insight.replace(/\*/g, '').split('\n').map(l => `<p>${l}</p>`).join('') }} />
          ) : (
            <p>Gathering data to provide your financial health check...</p>
          )}
        </div>
      )}

      <button 
        onClick={fetchInsight}
        className="mt-4 w-full py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg text-xs font-bold transition-colors uppercase tracking-widest"
      >
        Refresh Insights
      </button>
    </div>
  );
};

export default AIInsights;
