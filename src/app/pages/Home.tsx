import { useNavigate } from "react-router";
import { Bot, Sparkles, Utensils } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50 flex items-center justify-center p-6">
      <div className="max-w-2xl w-full text-center space-y-8">
        {/* Logo & Brand */}
        <div className="space-y-4">
          <h1 className="text-6xl font-bold text-gray-900">MORA</h1>
          <p className="text-xl text-gray-600">情緒點餐助手</p>
        </div>

        {/* Placeholder for Logo - will be added later */}
        <div className="flex justify-center my-8">
          <img
            src="/src/imports/MORA.png"
            alt="MORA Logo"
            className="w-40 h-40 object-contain drop-shadow-lg"
          />
        </div>

        {/* Welcome Message */}
        <div className="space-y-3 px-6">
          <p className="text-2xl text-gray-800 font-medium">今天想吃點甚麼？</p>
          <p className="text-lg text-gray-600">
            需要我幫你選擇一份適合你的餐點嗎！
          </p>
        </div>

        {/* Action Buttons */}
        <div className="grid gap-4 mt-12 px-6">
          <button
            onClick={() => navigate("/emotion")}
            className="group relative overflow-hidden bg-gradient-to-r from-amber-400 to-orange-500 text-white px-8 py-5 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity"></div>
            <div className="flex items-center justify-center gap-3">
              <Sparkles className="w-6 h-6" />
              <span>情緒助手推薦</span>
            </div>
          </button>

          <button
            onClick={() => navigate("/general")}
            className="group bg-white border-2 border-gray-200 text-gray-800 px-8 py-5 rounded-2xl font-semibold text-lg shadow-md hover:shadow-lg transition-all duration-300 hover:border-gray-300 hover:-translate-y-1"
          >
            <div className="flex items-center justify-center gap-3">
              <Bot className="w-6 h-6" />
              <span>一般點餐</span>
            </div>
          </button>
        </div>

        {/* Footer Note */}
        <p className="text-sm text-gray-500 mt-12">
          讓 AI 根據你的心情，為你推薦最適合的美味餐點
        </p>
      </div>
    </div>
  );
}