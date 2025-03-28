"use client";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

type CartItem = {
  id: string;
  name: string;
  price: number;
  productVariantId?: string;
  quantity: number;
  color: string;
  size: string;
  image: string;
  stock?: number;
  material: string;
  asset : string;
};

type AddToCartItem = Omit<CartItem, "quantity"> & {
  quantity?: number;
};

type cartContext = {
  cart: CartItem[];
  addToCart: (item: AddToCartItem) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
};

const CartContext = createContext<cartContext | null>(null);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item: AddToCartItem) => {
    // Ensure quantity is a number before proceeding
    const quantityToAdd: number =
      item.quantity !== undefined ? item.quantity : 1;

    const itemWithQuantity: CartItem = {
      ...(item as Omit<CartItem, "quantity">), // Cast to ensure all required fields are present
      quantity: quantityToAdd,
    };

    setCart((prevCart: CartItem[]) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        return prevCart.map((c) =>
          c.id === item.id ? { ...c, quantity: c.quantity + quantityToAdd } : c
        );
      }

      return [...prevCart, itemWithQuantity];
    });
  };

  // Update quantity of an item in the cart
  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      // Remove item if quantity is 0 or negative
      removeFromCart(id);
      return;
    }

    setCart((prevCart) =>
      prevCart.map((cartItem) =>
        cartItem.id === id ? { ...cartItem, quantity } : cartItem
      )
    );
  };

  const removeFromCart = (id: string) => {
    setCart((prevCart) => prevCart.filter((cartItem) => cartItem.id !== id));
  };

  // Clear the entire cart
  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be within a Cart Provider.");

  return context;
};
