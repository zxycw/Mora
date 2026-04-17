import { useState } from "react";
import { useNavigate } from "react-router";
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight } from "lucide-react";
import { useCart } from "../context/CartContext";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { cart, updateQuantity, removeFromCart, getCartTotal, getCartCount, clearCart } = useCart();
  const navigate = useNavigate();

  const formatPrice = (price: number) => `NT$${price.toLocaleString("zh-TW")}`;

  const handleCheckout = () => {
    // 這裡可以導向結帳頁面
    alert(`結帳總金額：${formatPrice(getCartTotal())}\n\n已選購 ${getCartCount()} 道餐點`);
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-40 transition-opacity"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-50 shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-400 to-orange-500 text-white p-6">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <ShoppingBag className="w-6 h-6" />
              <h2 className="text-2xl font-bold">購物車</h2>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 flex items-center justify-center bg-white/20 hover:bg-white/30 rounded-full transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          <p className="text-amber-100">
            {getCartCount() > 0 ? `已選 ${getCartCount()} 道餐點` : "購物車是空的"}
          </p>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-400">
              <ShoppingBag className="w-24 h-24 mb-4 opacity-20" />
              <p className="text-lg">還沒有選購餐點</p>
              <p className="text-sm">快去挑選你喜歡的美食吧！</p>
            </div>
          ) : (
            <>
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="bg-gray-50 rounded-2xl p-4 space-y-3"
                >
                  <div className="flex gap-4">
                    <img
                      src={item.img}
                      alt={item.name}
                      className="w-20 h-20 rounded-xl object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-gray-900 truncate">
                        {item.name}
                      </h3>
                      <p className="text-sm text-gray-600 truncate">
                        {item.desc}
                      </p>
                      <p className="text-lg font-bold text-amber-600 mt-1">
                        {formatPrice(item.price)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 bg-white rounded-full px-3 py-2 shadow-sm">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="min-w-[24px] text-center font-bold">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 flex items-center justify-center bg-gradient-to-r from-amber-400 to-orange-500 text-white rounded-lg transition-all"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 hover:text-red-600 p-2"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="text-right text-sm text-gray-600 pt-2 border-t border-gray-200">
                    小計：<span className="font-bold text-gray-900">{formatPrice(item.price * item.quantity)}</span>
                  </div>
                </div>
              ))}

              {cart.length > 0 && (
                <button
                  onClick={clearCart}
                  className="w-full py-3 text-red-500 hover:text-red-600 text-sm font-medium flex items-center justify-center gap-2"
                >
                  <Trash2 className="w-4 h-4" />
                  清空購物車
                </button>
              )}
            </>
          )}
        </div>

        {/* Footer / Checkout */}
        {cart.length > 0 && (
          <div className="border-t border-gray-200 p-6 space-y-4 bg-gray-50">
            <div className="space-y-2">
              <div className="flex justify-between text-gray-600">
                <span>商品總計</span>
                <span className="font-medium">{formatPrice(getCartTotal())}</span>
              </div>
              <div className="flex justify-between text-xl font-bold text-gray-900 pt-2 border-t border-gray-200">
                <span>總金額</span>
                <span className="text-amber-600">{formatPrice(getCartTotal())}</span>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-white py-4 rounded-2xl font-bold text-lg shadow-lg transition-all transform hover:scale-[1.02] flex items-center justify-center gap-2"
            >
              前往結帳
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </>
  );
}
