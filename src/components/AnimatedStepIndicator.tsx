import { FC, ReactNode } from 'react';
import { motion } from 'framer-motion';

interface Step {
  id: number;
  label: string;
  icon: ReactNode;
}

interface AnimatedStepIndicatorProps {
  steps: Step[];
  activeStep: number;
  onStepClick: (step: number) => void;
}

const AnimatedStepIndicator: FC<AnimatedStepIndicatorProps> = ({ 
  steps, 
  activeStep,
  onStepClick
}) => {
  return (
    <div className="w-full py-4 px-2">
      <div className="flex justify-between items-center relative">
        {/* Progress bar */}
        <div className="absolute left-0 top-1/2 transform -translate-y-1/2 h-1 bg-indigo-900/50 w-full -z-10"></div>
        
        {/* Active progress overlay */}
        <motion.div 
          className="absolute left-0 top-1/2 transform -translate-y-1/2 h-1 bg-gradient-to-r from-indigo-600 to-purple-600 -z-10"
          initial={{ width: '0%' }}
          animate={{ 
            width: `${((activeStep - 1) / (steps.length - 1)) * 100}%` 
          }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        />

        {steps.map((step) => (
          <motion.div 
            key={step.id}
            className="flex flex-col items-center"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <button
              onClick={() => onStepClick(step.id)}
              className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300
                ${activeStep >= step.id 
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 border-white text-white' 
                  : 'bg-indigo-900/70 border-indigo-600/50 text-indigo-300'}`}
            >
              {step.icon}
            </button>
            
            <motion.p 
              className={`mt-2 text-sm font-medium transition-colors duration-300 
                ${activeStep >= step.id ? 'text-white' : 'text-indigo-300'}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: step.id * 0.1 }}
            >
              {step.label}
            </motion.p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AnimatedStepIndicator;