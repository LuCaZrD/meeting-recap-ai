"use client";

import { useState } from 'react';
import { Headphones } from "lucide-react";
import { AudioInput } from './components/audio-input';
import { StepIndicator } from './components/step-indicator';
import { MeetingInfoForm, MeetingInfo } from './components/meeting-info-form';
import { SystemPromptEditor } from './components/system-prompt-editor';
import { ProcessingScreen } from './components/processing-screen';
import { RecapResult } from './components/recap-result';
import { toast } from 'sonner';

// Define the application steps
type Step = 'upload' | 'info' | 'prompt' | 'processing' | 'result';

export default function Home() {
  // State for tracking the current step
  const [currentStep, setCurrentStep] = useState<Step>('upload');
  
  // State for storing data at each step
  const [audioData, setAudioData] = useState<{ type: 'local' | 'drive'; data: any } | null>(null);
  const [meetingInfo, setMeetingInfo] = useState<MeetingInfo | null>(null);
  const [systemPrompt, setSystemPrompt] = useState<string>('');
  const [recapResult, setRecapResult] = useState<string>('');
  
  // Handle file selection
  const handleFileSelect = (result: { type: 'local' | 'drive'; data: any }) => {
    setAudioData(result);
    toast.success('File đã được tải lên', {
      description: 'Bắt đầu xử lý file âm thanh'
    });
    setCurrentStep('info');
  };
  
  // Handle meeting info submission
  const handleMeetingInfoSubmit = (info: MeetingInfo) => {
    setMeetingInfo(info);
    setCurrentStep('prompt');
  };
  
  // Handle system prompt submission
  const handlePromptSubmit = (prompt: string) => {
    setSystemPrompt(prompt);
    setCurrentStep('processing');
  };
  
  // Handle processing completion
  const handleProcessingComplete = (result: string) => {
    setRecapResult(result);
    setCurrentStep('result');
  };
  
  // Handle reset to start over
  const handleReset = () => {
    setAudioData(null);
    setMeetingInfo(null);
    setSystemPrompt('');
    setRecapResult('');
    setCurrentStep('upload');
  };
  
  return (
    <main className="flex min-h-screen flex-col items-center p-4 sm:p-6 md:p-24 font-mono">
      <div className="z-10 w-full max-w-4xl">
        <header className="mb-10 text-center">
          <div className="flex justify-center mb-4">
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-content/10">
              <Headphones className="w-8 h-8 text-content" />
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">Meeting Recap AI</h1>
          <p className="mt-4 text-lg text-content/80">
            Tải lên file âm thanh cuộc họp và nhận tóm tắt tự động bằng AI
          </p>
        </header>

        <StepIndicator currentStep={currentStep} />

        <main className="space-y-8">
          {currentStep === 'upload' && (
            <AudioInput onFileSelect={handleFileSelect} />
          )}
          
          {currentStep === 'info' && (
            <MeetingInfoForm onSubmit={handleMeetingInfoSubmit} />
          )}
          
          {currentStep === 'prompt' && meetingInfo && (
            <SystemPromptEditor 
              onSubmit={handlePromptSubmit} 
              meetingInfo={meetingInfo} 
            />
          )}
          
          {currentStep === 'processing' && (
            <ProcessingScreen onComplete={handleProcessingComplete} />
          )}
          
          {currentStep === 'result' && recapResult && (
            <RecapResult result={recapResult} onReset={handleReset} />
          )}
        </main>
      </div>
    </main>
  );
} 