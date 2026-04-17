import { useState } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft, ArrowRight, AlertCircle } from "lucide-react";

type EmotionStep = "mood" | "taste" | "flavor" | "preferences";

const STEPS: { step: EmotionStep; title: string; question: string }[] = [
  { step: "mood", title: "心情點餐助手", question: "今天的心情如何呢？" },
  { step: "taste", title: "心情點餐助手", question: "今天想吃什麼口味？" },
  { step: "flavor", title: "心情點餐助手", question: "想吃偏鹹還是偏甜？" },
  { step: "preferences", title: "心情點餐助手", question: "今日忌口（可複選）" },
];

const OPTIONS = {
  mood: ["很棒", "煩躁", "有點低落", "壓力大"],
  taste: ["清淡", "中等", "重口味"],
  flavor: ["偏鹹", "平衡", "偏甜"],
  preferences: ["海鮮", "不吃牛肉", "不要蔥蒜", "素食", "不要辣"],
};

export default function EmotionFlow() {
  const navigate = useNavigate();
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [selections, setSelections] = useState<{
    mood?: string;
    taste?: string;
    flavor?: string;
    preferences: string[];
  }>({
    preferences: [],
  });
  const [showError, setShowError] = useState(false);

  const currentStep = STEPS[currentStepIndex];
  const isLastStep = currentStepIndex === STEPS.length - 1;

  const handleSelect = (option: string) => {
    setShowError(false);

    if (currentStep.step === "preferences") {
      setSelections((prev) => ({
        ...prev,
        preferences: prev.preferences.includes(option)
          ? prev.preferences.filter((p) => p !== option)
          : [...prev.preferences, option],
      }));
    } else {
      setSelections((prev) => ({
        ...prev,
        [currentStep.step]: option,
      }));
    }
  };

  const handleNext = () => {
    if (currentStep.step === "preferences") {
      if (selections.preferences.length === 0) {
        setShowError(true);
        return;
      }
      navigate("/recommendation", { state: selections });
    } else {
      const currentSelection = selections[currentStep.step as keyof typeof selections];
      if (!currentSelection) {
        setShowError(true);
        return;
      }
      setCurrentStepIndex((prev) => prev + 1);
      setShowError(false);
    }
  };

  const handleBack = () => {
    if (currentStepIndex === 0) {
      navigate("/");
    } else {
      setCurrentStepIndex((prev) => prev - 1);
      setShowError(false);
    }
  };

  const isSelected = (option: string) => {
    if (currentStep.step === "preferences") {
      return selections.preferences.includes(option);
    }
    return selections[currentStep.step as keyof typeof selections] === option;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50 flex items-center justify-center p-6">
      <div className="max-w-3xl w-full">
        {/* Progress Bar */}
        <div className="mb-12">
          <div className="flex justify-between mb-3">
            {STEPS.map((step, index) => (
              <div
                key={step.step}
                className={`h-2 flex-1 mx-1 rounded-full transition-all duration-300 ${
                  index <= currentStepIndex
                    ? "bg-gradient-to-r from-amber-400 to-orange-500"
                    : "bg-gray-200"
                }`}
              />
            ))}
          </div>
          <div className="text-center text-sm text-gray-600">
            步驟 {currentStepIndex + 1} / {STEPS.length}
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold text-gray-900">{currentStep.title}</h1>
            <p className="text-2xl text-gray-700">{currentStep.question}</p>
          </div>

          {/* Error Message */}
          {showError && (
            <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-xl animate-in fade-in slide-in-from-top-2 duration-300">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <p>
                {currentStep.step === "preferences"
                  ? "請至少選擇一項喔！"
                  : "請先選擇一個選項喔！"}
              </p>
            </div>
          )}

          {/* Options */}
          <div className="flex flex-wrap gap-4 justify-center min-h-[200px] items-center">
            {OPTIONS[currentStep.step].map((option) => (
              <button
                key={option}
                onClick={() => handleSelect(option)}
                className={`px-8 py-4 rounded-full text-lg font-medium transition-all duration-200 min-w-[160px] ${
                  isSelected(option)
                    ? "bg-gradient-to-r from-amber-400 to-orange-500 text-white shadow-lg scale-105"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-105"
                }`}
              >
                {option}
              </button>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center gap-4 pt-8 border-t border-gray-200">
            <button
              onClick={handleBack}
              className="flex items-center gap-2 px-6 py-3 rounded-full bg-gray-100 text-gray-700 font-medium hover:bg-gray-200 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              上一頁
            </button>

            <button
              onClick={handleNext}
              className="flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 text-white font-medium hover:shadow-lg transition-all"
            >
              {isLastStep ? "查看推薦" : "繼續"}
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
