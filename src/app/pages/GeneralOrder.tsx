import { useState } from "react";
import { useNavigate } from "react-router";
import { Home, ShoppingCart, Plus, Minus, ShoppingBag } from "lucide-react";
import { MENU_DATA, CATEGORIES } from "../data/menuData";
import { useCart } from "../context/CartContext";
import CartDrawer from "../components/CartDrawer";

export default function GeneralOrder() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("set");
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { cart, updateQuantity: updateCartQuantity, getCartTotal, getCartCount, addToCart } = useCart();

  const filteredItems = MENU_DATA.filter((item) => item.cat === selectedCategory);

  const getItemQuantityInCart = (itemId: string) => {
    const cartItem = cart.find((item) => item.id === itemId);
    return cartItem?.quantity || 0;
  };

  const handleUpdateQuantity = (itemId: string, delta: number) => {
    const currentQty = getItemQuantityInCart(itemId);
    const newQty = currentQty + delta;

    if (newQty <= 0) {
      updateCartQuantity(itemId, 0);
    } else if (currentQty === 0 && delta > 0) {
      // 如果是第一次添加，使用 addToCart
      const item = MENU_DATA.find((i) => i.id === itemId);
      if (item) {
        addToCart(item, delta);
      }
    } else {
      updateCartQuantity(itemId, newQty);
    }
  };

  const formatPrice = (price: number) => `NT$${price.toLocaleString("zh-TW")}`;

  return (
    <>
      <div className="min-h-screen bg-gray-50 pb-32">
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-400 to-orange-500 text-white sticky top-0 z-10 shadow-lg">
          <div className="max-w-7xl mx-auto px-6 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold">MORA</h1>
                <p className="text-amber-100 mt-1">一般點餐</p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsCartOpen(true)}
                  className="relative flex items-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm px-4 py-2 rounded-full transition-colors"
                >
                  <ShoppingBag className="w-5 h-5" />
                  {getCartCount() > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                      {getCartCount()}
                    </span>
                  )}
                  <span className="hidden sm:inline">購物車</span>
                </button>
                <button
                  onClick={() => navigate("/")}
                  className="flex items-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm px-4 py-2 rounded-full transition-colors"
                >
                  <Home className="w-5 h-5" />
                  <span className="hidden sm:inline">返回首頁</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex gap-6">
            {/* Sidebar - Desktop */}
            <aside className="hidden lg:block w-56 flex-shrink-0">
              <div className="bg-white rounded-2xl shadow-lg p-4 sticky top-28">
                <h2 className="text-lg font-bold text-gray-900 mb-4 px-3">分類</h2>
                <div className="space-y-1">
                  {CATEGORIES.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`w-full text-left px-4 py-3 rounded-xl font-medium transition-all ${
                        selectedCategory === category.id
                          ? "bg-gradient-to-r from-amber-400 to-orange-500 text-white shadow-md"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      {category.name}
                    </button>
                  ))}
                </div>
              </div>
            </aside>

            <div className="flex-1">
              {/* Mobile Category Selector */}
              <div className="lg:hidden w-full mb-6">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-4 py-3 bg-white rounded-xl border-2 border-gray-200 font-medium text-gray-900 focus:outline-none focus:border-amber-400"
                >
                  {CATEGORIES.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Menu Grid */}
              <main>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredItems.map((item) => {
                    const quantity = getItemQuantityInCart(item.id);
                    return (
                      <div
                        key={item.id}
                        className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                      >
                        <div className="aspect-[16/9] relative bg-gray-100">
                          <img
                            src={item.img}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                          {quantity > 0 && (
                            <div className="absolute top-3 right-3 bg-amber-500 text-white font-bold rounded-full w-10 h-10 flex items-center justify-center shadow-lg">
                              {quantity}
                            </div>
                          )}
                        </div>

                        <div className="p-5 space-y-3">
                          <div>
                            <h3 className="text-xl font-bold text-gray-900 mb-1">
                              {item.name}
                            </h3>
                            <p className="text-sm text-gray-600 line-clamp-2">
                              {item.desc}
                            </p>
                          </div>

                          <div className="flex items-center justify-between pt-2">
                            <span className="text-2xl font-bold text-gray-900">
                              {formatPrice(item.price)}
                            </span>

                            <div className="flex items-center gap-3 bg-gray-100 rounded-full px-3 py-2">
                              <button
                                onClick={() => handleUpdateQuantity(item.id, -1)}
                                className="w-8 h-8 flex items-center justify-center bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors disabled:opacity-50"
                                disabled={quantity === 0}
                              >
                                <Minus className="w-4 h-4" />
                              </button>

                              <span className="min-w-[24px] text-center font-bold">
                                {quantity}
                              </span>

                              <button
                                onClick={() => handleUpdateQuantity(item.id, 1)}
                                className="w-8 h-8 flex items-center justify-center bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-white rounded-lg transition-all"
                              >
                                <Plus className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </main>
            </div>
          </div>
        </div>

        {/* Floating Cart Button - Mobile */}
        {getCartCount() > 0 && (
          <div className="fixed bottom-6 left-6 right-6 max-w-7xl mx-auto lg:hidden">
            <button
              onClick={() => setIsCartOpen(true)}
              className="w-full bg-gradient-to-r from-gray-900 to-gray-800 text-white rounded-2xl shadow-2xl p-5 flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl">
                  <ShoppingCart className="w-6 h-6" />
                </div>
                <div className="text-left">
                  <p className="text-sm text-gray-300">已選 {getCartCount()} 道</p>
                  <p className="text-2xl font-bold">{formatPrice(getCartTotal())}</p>
                </div>
              </div>
              <div className="bg-gradient-to-r from-amber-400 to-orange-500 px-6 py-3 rounded-xl font-bold">
                查看購物車
              </div>
            </button>
          </div>
        )}

        {/* Desktop Cart Summary */}
        {getCartCount() > 0 && (
          <div className="hidden lg:block fixed bottom-6 left-6 right-6 max-w-7xl mx-auto">
            <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white rounded-2xl shadow-2xl p-5 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl">
                  <ShoppingCart className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-gray-300">已選 {getCartCount()} 道</p>
                  <p className="text-2xl font-bold">{formatPrice(getCartTotal())}</p>
                </div>
              </div>

              <button
                onClick={() => setIsCartOpen(true)}
                className="bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 px-8 py-4 rounded-xl font-bold text-lg shadow-lg transition-all transform hover:scale-105"
              >
                查看購物車
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Cart Drawer */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}
