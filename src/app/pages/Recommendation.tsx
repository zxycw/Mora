import { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { Home, ShoppingBag, Sparkles, Check } from "lucide-react";
import { getRecommendation } from "../utils/recommendationLogic";
import { useCart } from "../context/CartContext";

export default function Recommendation() {
  const navigate = useNavigate();
  const location = useLocation();
  const selections = location.state || { preferences: [] };
  const { addToCart } = useCart();

  const recommendation = useMemo(
    () => getRecommendation(selections),
    [selections]
  );

  const { mainDish, side, drink, dessert, message } = recommendation;

  // 勾選狀態，預設全勾選
  const [selectedItems, setSelectedItems] = useState({
    mainDish: true,
    side: true,
    drink: true,
    dessert: true,
  });

  const toggleItem = (item: keyof typeof selectedItems) => {
    setSelectedItems((prev) => ({
      ...prev,
      [item]: !prev[item],
    }));
  };

  const formatPrice = (price: number) => `NT$${price.toLocaleString("zh-TW")}`;

  // 計算被勾選項目的總價
  const totalPrice =
    (selectedItems.mainDish ? mainDish.price : 0) +
    (selectedItems.side && side ? side.price : 0) +
    (selectedItems.drink && drink ? drink.price : 0) +
    (selectedItems.dessert && dessert ? dessert.price : 0);

  const handleAddToCart = () => {
    if (selectedItems.mainDish) addToCart(mainDish, 1);
    if (selectedItems.side && side) addToCart(side, 1);
    if (selectedItems.drink && drink) addToCart(drink, 1);
    if (selectedItems.dessert && dessert) addToCart(dessert, 1);

    navigate("/general");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50 p-6">
      <div className="max-w-5xl mx-auto py-12">
        {/* Header */}
        <div className="text-center mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-400 to-orange-500 text-white px-6 py-3 rounded-full">
            <Sparkles className="w-5 h-5" />
            <span className="font-medium">AI 智慧推薦</span>
          </div>
          <h1 className="text-5xl font-bold text-gray-900">推薦餐點</h1>
        </div>

        {/* Personalized Message */}
        <div className="bg-gradient-to-r from-amber-100 to-orange-100 rounded-2xl p-6 mb-8 border border-amber-200">
          <p className="text-lg text-gray-800 text-center leading-relaxed">
            {message}
          </p>
        </div>

        {/* Main Dish Card */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden mb-6 transform transition-all hover:scale-[1.01] duration-300">
          <div className="aspect-[16/10] relative overflow-hidden bg-gray-100">
            <img
              src={mainDish.img}
              alt={mainDish.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
              <span className="text-2xl font-bold bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">
                {formatPrice(mainDish.price)}
              </span>
            </div>
            <div className="absolute top-4 left-4 bg-amber-500 text-white px-4 py-2 rounded-full shadow-lg font-bold">
              主餐推薦
            </div>
          </div>

          <div className="p-8 space-y-4">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 space-y-2">
                <h2 className="text-3xl font-bold text-gray-900">
                  {mainDish.name}
                </h2>
                <div className="flex items-center gap-2 text-amber-600">
                  <Sparkles className="w-5 h-5" />
                  <span className="font-medium">特別推薦</span>
                </div>
              </div>
              <button
                onClick={() => toggleItem("mainDish")}
                className={`flex-shrink-0 w-8 h-8 rounded-lg border-2 flex items-center justify-center transition-all ${
                  selectedItems.mainDish
                    ? "bg-gradient-to-r from-amber-400 to-orange-500 border-amber-500"
                    : "bg-white border-gray-300"
                }`}
              >
                {selectedItems.mainDish && <Check className="w-5 h-5 text-white" />}
              </button>
            </div>
            <p className="text-gray-600 text-lg leading-relaxed">
              {mainDish.desc}
            </p>
          </div>
        </div>

        {/* Side Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {side && (
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden relative">
              <img
                src={side.img}
                alt={side.name}
                className="w-full h-32 object-cover"
              />
              <button
                onClick={() => toggleItem("side")}
                className={`absolute top-2 right-2 w-7 h-7 rounded-lg border-2 flex items-center justify-center transition-all ${
                  selectedItems.side
                    ? "bg-gradient-to-r from-amber-400 to-orange-500 border-amber-500"
                    : "bg-white border-gray-300"
                }`}
              >
                {selectedItems.side && <Check className="w-4 h-4 text-white" />}
              </button>
              <div className="p-4">
                <p className="text-xs text-amber-600 font-medium mb-1">沙拉配菜</p>
                <h3 className="font-bold text-gray-900 text-sm mb-1">{side.name}</h3>
                <p className="text-amber-600 font-bold">{formatPrice(side.price)}</p>
              </div>
            </div>
          )}

          {drink && (
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden relative">
              <img
                src={drink.img}
                alt={drink.name}
                className="w-full h-32 object-cover"
              />
              <button
                onClick={() => toggleItem("drink")}
                className={`absolute top-2 right-2 w-7 h-7 rounded-lg border-2 flex items-center justify-center transition-all ${
                  selectedItems.drink
                    ? "bg-gradient-to-r from-amber-400 to-orange-500 border-amber-500"
                    : "bg-white border-gray-300"
                }`}
              >
                {selectedItems.drink && <Check className="w-4 h-4 text-white" />}
              </button>
              <div className="p-4">
                <p className="text-xs text-amber-600 font-medium mb-1">推薦飲品</p>
                <h3 className="font-bold text-gray-900 text-sm mb-1">{drink.name}</h3>
                <p className="text-amber-600 font-bold">{formatPrice(drink.price)}</p>
              </div>
            </div>
          )}

          {dessert && (
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden relative">
              <img
                src={dessert.img}
                alt={dessert.name}
                className="w-full h-32 object-cover"
              />
              <button
                onClick={() => toggleItem("dessert")}
                className={`absolute top-2 right-2 w-7 h-7 rounded-lg border-2 flex items-center justify-center transition-all ${
                  selectedItems.dessert
                    ? "bg-gradient-to-r from-amber-400 to-orange-500 border-amber-500"
                    : "bg-white border-gray-300"
                }`}
              >
                {selectedItems.dessert && <Check className="w-4 h-4 text-white" />}
              </button>
              <div className="p-4">
                <p className="text-xs text-amber-600 font-medium mb-1">甜點</p>
                <h3 className="font-bold text-gray-900 text-sm mb-1">{dessert.name}</h3>
                <p className="text-amber-600 font-bold">{formatPrice(dessert.price)}</p>
              </div>
            </div>
          )}
        </div>

        {/* Your Preferences */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">您的選擇</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {selections.gender && (
              <div className="space-y-1">
                <p className="text-sm text-gray-500">性別</p>
                <p className="font-medium text-gray-900">{selections.gender}</p>
              </div>
            )}
            {selections.mood && (
              <div className="space-y-1">
                <p className="text-sm text-gray-500">心情</p>
                <p className="font-medium text-gray-900">{selections.mood}</p>
              </div>
            )}
            {selections.taste && (
              <div className="space-y-1">
                <p className="text-sm text-gray-500">口味</p>
                <p className="font-medium text-gray-900">{selections.taste}</p>
              </div>
            )}
            {selections.flavor && (
              <div className="space-y-1">
                <p className="text-sm text-gray-500">偏好</p>
                <p className="font-medium text-gray-900">{selections.flavor}</p>
              </div>
            )}
            {selections.preferences && selections.preferences.length > 0 && (
              <div className="space-y-1">
                <p className="text-sm text-gray-500">忌口</p>
                <p className="font-medium text-gray-900">{selections.preferences.join("、")}</p>
              </div>
            )}
          </div>
        </div>

        {/* Total Price */}
        <div className="bg-gradient-to-r from-amber-100 to-orange-100 rounded-2xl p-6 mb-6 border border-amber-200">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-600 mb-1">已選項目總價</p>
              <p className="text-sm text-gray-500">點擊項目右上角的勾選框來選擇</p>
            </div>
            <p className="text-4xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
              {formatPrice(totalPrice)}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate("/")}
            className="flex items-center justify-center gap-2 px-8 py-4 bg-white border-2 border-gray-200 text-gray-700 font-semibold rounded-2xl hover:bg-gray-50 hover:border-gray-300 transition-all"
          >
            <Home className="w-5 h-5" />
            重新開始
          </button>

          <button
            onClick={handleAddToCart}
            className="flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-amber-400 to-orange-500 text-white font-semibold rounded-2xl hover:shadow-xl transition-all transform hover:scale-105"
          >
            <ShoppingBag className="w-5 h-5" />
            加入購物車
          </button>
        </div>

        {/* Additional Info */}
        <p className="text-center text-gray-500 text-sm mt-8">
          勾選想要的餐點，點擊「加入購物車」將選擇的項目加入購物車
        </p>
      </div>
    </div>
  );
}
