'use client';
import React, { useState } from 'react';
import { useBuilderStore } from '@/lib/store/builderStore';
import { ArrowRight, Check } from 'lucide-react';

const steps = [
  {
    icon: '👋',
    title: "Welcome to EasyPage!",
    description: "Build beautiful websites visually — no coding required. Let's take a quick tour to get you started.",
  },
  {
    icon: '📦',
    title: "Add Components",
    description: "Browse the left panel for components like Hero, Features, and more. Click or drag them onto your canvas.",
  },
  {
    icon: '✏️',
    title: "Edit Your Content",
    description: "Click any component on the canvas to select it. Then edit text inline or use the properties panel on the right.",
  },
  {
    icon: '🚀',
    title: "Export Your Site",
    description: "When you're happy with your page, click the Export button to download a ready-to-publish HTML file.",
  },
];

export function OnboardingWizard() {
  const { isOnboarding, dismissOnboarding, addComponent } = useBuilderStore();
  const [step, setStep] = useState(0);

  if (!isOnboarding) return null;

  const isLast = step === steps.length - 1;
  const current = steps[step];

  const handleFinish = () => {
    addComponent('hero');
    addComponent('features');
    dismissOnboarding();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/80 to-purple-900/80 backdrop-blur-sm" />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 overflow-hidden">
        {/* Progress bar */}
        <div className="h-1 bg-gray-100">
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500"
            style={{ width: `${((step + 1) / steps.length) * 100}%` }}
          />
        </div>

        <div className="p-8">
          {/* Step indicator dots */}
          <div className="flex justify-center gap-2 mb-6">
            {steps.map((_, i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full transition-colors ${i === step ? 'bg-blue-600' : i < step ? 'bg-blue-300' : 'bg-gray-200'}`}
              />
            ))}
          </div>

          <div className="text-center mb-8">
            <div className="text-6xl mb-4">{current.icon}</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">{current.title}</h2>
            <p className="text-gray-500 leading-relaxed">{current.description}</p>
          </div>

          <div className="flex items-center gap-3">
            {step > 0 && (
              <button
                onClick={() => setStep(step - 1)}
                className="flex-1 py-2.5 text-gray-600 border border-gray-200 rounded-xl font-medium hover:bg-gray-50 transition-colors"
              >
                Back
              </button>
            )}
            <button
              onClick={() => isLast ? handleFinish() : setStep(step + 1)}
              className="flex-1 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
            >
              {isLast ? (
                <>
                  <Check size={16} />
                  Start Building!
                </>
              ) : (
                <>
                  Next
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </div>

          <button
            onClick={dismissOnboarding}
            className="mt-4 w-full text-sm text-gray-400 hover:text-gray-600 transition-colors"
          >
            Skip tour
          </button>
        </div>
      </div>
    </div>
  );
}
