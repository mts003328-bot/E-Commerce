import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {

    const [cart, setCart] = useState(() => {

        const savedCart = localStorage.getItem("cart");

        return savedCart
            ? JSON.parse(savedCart)
            : [];

    });


    // Add product to cart
    function addToCart(product) {

        setCart((previousCart) => {

            const existingProduct = previousCart.find(
                (item) => item.id === product.id
            );


            let updatedCart;


            if (existingProduct) {

                updatedCart = previousCart.map((item) =>
                    item.id === product.id
                        ? {
                            ...item,
                            quantity: item.quantity + 1
                        }
                        : item
                );

            } else {

                updatedCart = [
                    ...previousCart,
                    {
                        ...product,
                        quantity: 1
                    }
                ];

            }


            localStorage.setItem(
                "cart",
                JSON.stringify(updatedCart)
            );


            return updatedCart;

        });

    }


    // Remove product completely
    function removeFromCart(productId) {

        setCart((previousCart) => {

            const updatedCart = previousCart.filter(
                (item) => item.id !== productId
            );


            localStorage.setItem(
                "cart",
                JSON.stringify(updatedCart)
            );


            return updatedCart;

        });

    }


    // Increase quantity
    function increaseQuantity(productId) {

        setCart((previousCart) => {

            const updatedCart = previousCart.map((item) =>
                item.id === productId
                    ? {
                        ...item,
                        quantity: item.quantity + 1
                    }
                    : item
            );


            localStorage.setItem(
                "cart",
                JSON.stringify(updatedCart)
            );


            return updatedCart;

        });

    }


    // Decrease quantity
    function decreaseQuantity(productId) {

        setCart((previousCart) => {

            const updatedCart = previousCart
                .map((item) =>
                    item.id === productId
                        ? {
                            ...item,
                            quantity: item.quantity - 1
                        }
                        : item
                )
                .filter((item) => item.quantity > 0);


            localStorage.setItem(
                "cart",
                JSON.stringify(updatedCart)
            );


            return updatedCart;

        });

    }


    // Total number of products
    const cartCount = cart.reduce(
        (total, item) => total + item.quantity,
        0
    );


    // Total price
    const cartTotal = cart.reduce(
        (total, item) =>
            total + item.price * item.quantity,
        0
    );
    return (
        <CartContext.Provider
            value={{
                cart,
                addToCart,
                removeFromCart,
                increaseQuantity,
                decreaseQuantity,
                cartCount,
                cartTotal,
            }}
        >
            {children}
        </CartContext.Provider>
    );

}

export function useCart() {
    return useContext(CartContext);
}