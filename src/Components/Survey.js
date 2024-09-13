import React, { useState, useEffect } from 'react';

const questionsData = [
  { id: 1, text: 'How satisfied are you with our products?', type: 'rating', options: [1, 2, 3, 4, 5] },
  { id: 2, text: 'How fair are the prices compared to similar retailers?', type: 'rating', options: [1, 2, 3, 4, 5] },
  { id: 3, text: 'How satisfied are you with the value for money of your purchase?', type: 'rating', options: [1, 2, 3, 4, 5] },
  { id: 4, text: 'On a scale of 1-10 how would you recommend us to your friends and family?', type: 'rating', options: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] },
  { id: 5, text: 'What could we do to improve our service?', type: 'text' }
];

const Survey = ({ sessionId, resetSurvey }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const storedAnswers = JSON.parse(localStorage.getItem(sessionId)) || {};
    setAnswers(storedAnswers);
  }, [sessionId]);

  const currentQuestion = questionsData[currentQuestionIndex];

  
  const saveAnswer = (questionId, answer) => {
    const updatedAnswers = { ...answers, [questionId]: answer };
    setAnswers(updatedAnswers);
    localStorage.setItem(sessionId, JSON.stringify(updatedAnswers));
  };

  
  const handleNext = () => {
    if (currentQuestionIndex < questionsData.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setShowConfirmation(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmit = () => {
  
    const updatedAnswers = { ...answers, status: 'COMPLETED' };
    localStorage.setItem(sessionId, JSON.stringify(updatedAnswers));

    setSubmitted(true);
    setTimeout(() => {
      resetSurvey(); 
    }, 5000);
  };

  if (submitted) {
    return (
      <div className="thank-you-screen">
        <h1>Thank you for completing the survey!</h1>
        <p>Returning to the welcome screen in 5 seconds...</p>
      </div>
    );
  }

  return (
    <div>
      {!showConfirmation ? (
        <>
          <h2 className="flex justify-end">
            {currentQuestionIndex + 1} / {questionsData.length}
          </h2>

          <div className="flex justify-end mt-8">
            <span>{currentQuestion.id}.</span>
            <span>{currentQuestion.text}</span>
          </div>

          {currentQuestion.type === 'rating' && (
            <div>
              {currentQuestion.options.map((option) => (
                <button
                  key={option}
                  className={`bg-white mt-10 m-1 h-8 w-8 text-center rounded-full border border-black
                     ${answers[currentQuestion.id] === option ? 'bg-red-500' : ''}`}
                  onClick={() => saveAnswer(currentQuestion.id, option)}
                >
                  {option}
                </button>
              ))}
            </div>
          )}

          {currentQuestion.type === 'text' && (
            <textarea
              value={answers[currentQuestion.id] || ''}
              onChange={(e) => saveAnswer(currentQuestion.id, e.target.value)}
              placeholder="Enter your answer"
              className="border p-2 w-full mt-4"
            />
          )}

          <div className="flex justify-between mt-4">
            <button
              className="text-white bg-blue-500 w-14 ml-8 border border-black"
              onClick={handlePrevious}
              disabled={currentQuestionIndex === 0}
            >
              Prev
            </button>
            <button
              className="text-white bg-pink-500 w-14 mr-8 border border-black"
              onClick={handleNext}
              disabled={currentQuestionIndex === questionsData.length - 1}
            >
              {currentQuestionIndex === questionsData.length - 1 ? 'Submit' : 'Next'}
            </button>
          </div>
        </>
      ) : (
        <div className="confirmation-dialog">
          <h2>Are you sure you want to submit the survey?</h2>
          <div className="flex justify-between mt-4">
            <button
              className="text-white bg-green-500 w-14 ml-8 border border-black"
              onClick={handleSubmit}
            >
              Yes
            </button>
            <button
              className="text-white bg-red-500 w-14 mr-8 border border-black"
              onClick={() => setShowConfirmation(false)}
            >
              No
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Survey;
