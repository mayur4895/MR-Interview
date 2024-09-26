// components/QuestionDisplay.tsx
import React from 'react';

interface QuestionDisplayProps {
  question: string;
  currentQuestionIndex: number;
  totalQuestions: number;
  onNext: () => void;
  onSubmit: () => void;
}

const QuestionDisplay: React.FC<QuestionDisplayProps> = ({
  question,
  currentQuestionIndex,
  totalQuestions,
  onNext,
  onSubmit,
}) => {
  return (
    <div style={{ flex: 1, padding: '20px' }}>
      {currentQuestionIndex < totalQuestions ? (
        <div>
          <h2>Question {currentQuestionIndex + 1}</h2>
          <p>{question}</p>
          {currentQuestionIndex === totalQuestions - 1 ? (
            <button onClick={onSubmit}>Submit Interview</button>
          ) : (
            <button onClick={onNext}>Next Question</button>
          )}
        </div>
      ) : (
        <div>
          <h2>Interview Finished</h2>
          <p>Thank you for completing the interview!</p>
        </div>
      )}
    </div>
  );
};

export default QuestionDisplay;
