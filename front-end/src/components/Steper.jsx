import React from 'react';
import { useStep } from '../context/StepContext';

const Steper = () => {
  const { currentStep } = useStep();
  const steps = ["1", "2", "3"];

  return (
    <div className="flex justify-between mt-4 w-full max-w-xs">
      {steps.map((step, i) => (
        <div 
          key={i} 
          className={`step-item ${currentStep === i + 1 ? 'active' : ''} ${currentStep > i + 1 ? 'completed' : ''}`}
        >
          <div 
            className={`step flex items-center justify-center rounded-full w-6 h-6 text-sm ${currentStep > i + 1 ? 'completed' : ''}`}
          >
            {i + 1}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Steper;