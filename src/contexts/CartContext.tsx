import { createContext, useContext, useState } from 'react';

type Product = {
  barcode: string;
  name: string;
  price: number;
};

export type CartItem = {
  product: Product;
  quantity: number;
};

interface CartContextType {
  cart: CartItem[];
  addProduct: (product: Product, quantity?: number) => void;
  removeProduct: (barcode: string) => void;
  updateQuantity: (barcode: string, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addProduct = (product: Product, quantity = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.barcode === product.barcode);
      if (existing) {
        return prev.map(item =>
          item.product.barcode === product.barcode
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
  };

  const removeProduct = (barcode: string) => {
    setCart(prev => prev.filter(item => item.product.barcode !== barcode));
  };

  const updateQuantity = (barcode: string, quantity: number) => {
    setCart(prev =>
      prev.map(item =>
        item.product.barcode === barcode ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ cart, addProduct, removeProduct, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
};
