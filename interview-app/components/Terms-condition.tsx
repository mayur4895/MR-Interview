// components/TermsAndConditions.tsx
import React from 'react';
import { Button } from './ui/button';

interface TermsAndConditionsProps {
  onStartInterview: () => void;
}

const TermsAndConditions: React.FC<TermsAndConditionsProps> = ({ onStartInterview }) => {
  return (
    <div  className=' flex items-center justify-center w-full h-[70vh]'>
   <div className=' flex flex-col gap-2'>
   <h2 className='text-2xl font-semibold'>Terms and Conditions</h2>
      <p>Please read the following terms before starting the interview:</p>
      <ul className=' flex flex-col gap-2 mt-5'>
        <li>By starting the interview, you consent to your video being recorded.</li>
        <li>You agree to answer all questions to the best of your ability.</li>
        <li>Failure to comply with the rules may result in disqualification.</li>
      </ul>
      <Button onClick={onStartInterview}>Start Interview</Button>
   </div>
    </div>
  );
};

export default TermsAndConditions;
