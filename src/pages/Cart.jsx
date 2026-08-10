import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

function Cart() {

    const {
        cart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        cartTotal
    } = useCart();


    if (cart.length === 0) {

        return (
            <div className="container py-5 text-center">

                <h1 className="mb-3">
                    Your Cart
                </h1>

                <p className="text-muted mb-4">
                    Your cart is currently empty.
                </p>

                <Link
                    to="/products"
                    className="btn btn-primary"
                >
                    Continue Shopping
                </Link>

            </div>
        );

    }


    return (

        <div className="container py-4">


            {/* HEADER */}

            <div className="d-flex flex-column flex-sm-row justify-content-between align-items-sm-center gap-3 mb-4">

                <div>

                    <h1 className="mb-1">
                        Your Cart
                    </h1>

                    <p className="text-muted mb-0">
                        Review your items before checkout.
                    </p>

                </div>


                <Link
                    to="/products"
                    className="btn btn-outline-primary"
                >
                    Continue Shopping
                </Link>

            </div>


            <div className="row g-4">


                {/* CART ITEMS */}

                <div className="col-12 col-lg-8">

                    {cart.map((product) => (

                        <div
                            className="card mb-3 shadow-sm"
                            key={product.id}
                        >

                            <div className="card-body">

                                <div className="row align-items-center g-3">


                                    {/* IMAGE */}

                                    <div className="col-4 col-sm-3 col-md-2">

                                        <img
                                            src={product.thumbnail}
                                            alt={product.title}
                                            className="img-fluid rounded"
                                        />

                                    </div>


                                    {/* PRODUCT */}

                                    <div className="col-8 col-sm-9 col-md-4">

                                        <h5 className="mb-1">
                                            {product.title}
                                        </h5>

                                        <p className="text-muted mb-0">
                                            ${product.price}
                                        </p>

                                    </div>


                                    {/* QUANTITY */}

                                    <div className="col-6 col-md-3">

                                        <div className="d-flex align-items-center">

                                            <button
                                                type="button"
                                                className="btn btn-outline-secondary btn-sm"
                                                onClick={() =>
                                                    decreaseQuantity(product.id)
                                                }
                                            >
                                                −
                                            </button>

                                            <span className="mx-3 fw-bold">
                                                {product.quantity}
                                            </span>

                                            <button
                                                type="button"
                                                className="btn btn-outline-secondary btn-sm"
                                                onClick={() =>
                                                    increaseQuantity(product.id)
                                                }
                                            >
                                                +
                                            </button>

                                        </div>

                                    </div>


                                    {/* REMOVE */}

                                    <div className="col-6 col-md-3">

                                        <button
                                            type="button"
                                            className="btn btn-outline-danger btn-sm"
                                            onClick={() =>
                                                removeFromCart(product.id)
                                            }
                                        >
                                            Remove
                                        </button>

                                    </div>

                                </div>

                            </div>

                        </div>

                    ))}

                </div>


                {/* SUMMARY */}

                <div className="col-12 col-lg-4">

                    <div className="card shadow-sm">

                        <div className="card-body">

                            <h4 className="mb-3">
                                Order Summary
                            </h4>

                            <hr />

                            <div className="d-flex justify-content-between mb-2">

                                <span>
                                    Subtotal
                                </span>

                                <strong>
                                    ${cartTotal.toFixed(2)}
                                </strong>

                            </div>


                            <div className="d-flex justify-content-between mb-3">

                                <span>
                                    Delivery
                                </span>

                                <span className="text-success">
                                    Free
                                </span>

                            </div>


                            <hr />

                            <div className="d-flex justify-content-between mb-4">

                                <strong>
                                    Total
                                </strong>

                                <strong>
                                    ${cartTotal.toFixed(2)}
                                </strong>

                            </div>


                            <Link
                                to="/checkout"
                                className="btn btn-success w-100"
                            >
                                Proceed to Checkout
                            </Link>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default Cart;