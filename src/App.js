import React, { useState, useEffect } from 'react';
import Survey from './Components/Survey';

const App = () => {
  const [customerSession, setCustomerSession] = useState(null);

  
  useEffect(() => {
    const existingSession = localStorage.getItem('surveySession');
    if (existingSession) {
      setCustomerSession(existingSession);
    }
  }, []);

  const startSurvey = () => {
    let sessionId = localStorage.getItem('surveySession');
    
    if (!sessionId) {
      sessionId = Date.now().toString();
      localStorage.setItem('surveySession', sessionId);
    }
    
    setCustomerSession(sessionId);
  };

  return (
    <div className=" m-4 flex justify-center">
      <div className='p-4 w-[35rem] flex justify-center border border-black rounded-3xl bg-blue-200 h-[35rem]'>
      {!customerSession ? (
        <div className="">
          <h1>Welcome to Our Survey!</h1>
          <button onClick={startSurvey}>Start Survey</button>
        </div>
      ) : (
        <Survey sessionId={customerSession} />
      )}
      </div>
    </div>
  );
};

export default App;

