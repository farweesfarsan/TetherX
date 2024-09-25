import React, { createContext, useState, useContext } from 'react';

const StepContext = createContext();

export const useStep = () => useContext(StepContext);

export const StepProvider = ({ children }) => {
  const [currentStep, setCurrentStep] = useState(1);

  return (
    <StepContext.Provider value={{ currentStep, setCurrentStep }}>
      {children}
    </StepContext.Provider>
  );
};
