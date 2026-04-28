import { create } from "zustand";

const useCartStore = create((set) => ({
  cartItems: [],
  addToCart: (product) =>
    set((state) => ({ cartItems: [...state.cartItems, product] })),
  
  removeFromCart: (productId) =>
    set((state) => ({
      cartItems: state.cartItems.filter((item) => item._id !== productId),
    })),

  // Naya Clear Cart Function
  clearCart: () => set({ cartItems: [] }),
}));

export default useCartStore;
