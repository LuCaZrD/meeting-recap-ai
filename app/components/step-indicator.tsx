import { Check } from 'lucide-react';

type Step = 'upload' | 'info' | 'prompt' | 'processing' | 'result';

interface StepIndicatorProps {
  currentStep: Step;
}

const steps: { id: Step; label: string }[] = [
  { id: 'upload', label: 'Tải lên' },
  { id: 'info', label: 'Thông tin' },
  { id: 'prompt', label: 'Yêu cầu' },
  { id: 'processing', label: 'Xử lý' },
  { id: 'result', label: 'Kết quả' },
];

export function StepIndicator({ currentStep }: StepIndicatorProps) {
  const getStepStatus = (stepId: Step) => {
    const stepIndex = steps.findIndex(s => s.id === stepId);
    const currentIndex = steps.findIndex(s => s.id === currentStep);
    
    if (stepIndex < currentIndex) return 'completed';
    if (stepIndex === currentIndex) return 'active';
    return 'pending';
  };

  return (
    <div className="step-indicator">
      {steps.map((step, index) => (
        <div key={step.id}>
          <div className={`step ${getStepStatus(step.id)}`}>
            <div className="step-number">
              {getStepStatus(step.id) === 'completed' ? (
                <Check className="w-4 h-4" />
              ) : (
                index + 1
              )}
            </div>
            <div className="step-label">{step.label}</div>
          </div>
          {index < steps.length - 1 && (
            <div 
              className={`step-line ${
                getStepStatus(steps[index + 1].id) === 'completed' ? 'completed' : ''
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
} 