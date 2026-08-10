import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

function Checkout() {
    const navigate = useNavigate();
    const { cart, cartTotal } = useCart();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        payment: "Cash on Delivery",
    });

    const [error, setError] = useState("");

    function handleChange(event) {
        const { name, value } = event.target;

        setFormData((previousData) => ({
            ...previousData,
            [name]: value,
        }));
    }

    function handleSubmit(event) {
        event.preventDefault();
        setError("");

        const { name, email, phone, address, city } = formData;

        if (
            !name.trim() ||
            !email.trim() ||
            !phone.trim() ||
            !address.trim() ||
            !city.trim()
        ) {
            setError("Please fill in all required fields.");
            return;
        }

        navigate("/order-success");
    }

    if (cart.length === 0) {
        return (
            <div className="container py-5 text-center">
                <h1 className="mb-3">Your Cart Is Empty</h1>

                <p className="text-muted mb-4">
                    Add some products before checking out.
                </p>

                <Link to="/products" className="btn btn-primary">
                    Back to Shopping
                </Link>
            </div>
        );
    }

    return (
        <div className="container py-4">
            <div className="mb-4">
                <h1 className="mb-2">Checkout</h1>

                <p className="text-muted mb-0">
                    Enter your delivery information to place your order.
                </p>
            </div>

            {error && (
                <div className="alert alert-danger">
                    {error}
                </div>
            )}

            <div className="row g-4">
                <div className="col-12 col-lg-7">
                    <div className="card shadow-sm">
                        <div className="card-body p-3 p-md-4">
                            <h4 className="mb-4">
                                Delivery Information
                            </h4>

                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label className="form-label">
                                        Full Name
                                    </label>

                                    <input
                                        type="text"
                                        name="name"
                                        className="form-control"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="Enter your full name"
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">
                                        Email
                                    </label>

                                    <input
                                        type="email"
                                        name="email"
                                        className="form-control"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="example@email.com"
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">
                                        Phone Number
                                    </label>

                                    <input
                                        type="tel"
                                        name="phone"
                                        className="form-control"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        placeholder="03XX-XXXXXXX"
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">
                                        Address
                                    </label>

                                    <textarea
                                        name="address"
                                        className="form-control"
                                        rows="3"
                                        value={formData.address}
                                        onChange={handleChange}
                                        placeholder="Enter your complete address"
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">
                                        City
                                    </label>

                                    <input
                                        type="text"
                                        name="city"
                                        className="form-control"
                                        value={formData.city}
                                        onChange={handleChange}
                                        placeholder="Enter your city"
                                    />
                                </div>

                                <div className="mb-4">
                                    <label className="form-label">
                                        Payment Method
                                    </label>

                                    <select
                                        name="payment"
                                        className="form-select"
                                        value={formData.payment}
                                        onChange={handleChange}
                                    >
                                        <option>Cash on Delivery</option>
                                        <option>Credit / Debit Card</option>
                                    </select>
                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-success w-100"
                                >
                                    Place Order
                                </button>
                            </form>
                        </div>
                    </div>
                </div>

                <div className="col-12 col-lg-5">
                    <div className="card shadow-sm">
                        <div className="card-body p-3 p-md-4">
                            <h4 className="mb-4">
                                Order Summary
                            </h4>

                            {cart.map((product) => (
                                <div
                                    key={product.id}
                                    className="d-flex align-items-center gap-3 mb-3"
                                >
                                    <img
                                        src={product.thumbnail}
                                        alt={product.title}
                                        width="60"
                                        height="60"
                                        className="rounded object-fit-contain flex-shrink-0"
                                    />

                                    <div className="flex-grow-1">
                                        <h6 className="mb-1 text-truncate">
                                            {product.title}
                                        </h6>

                                        <small className="text-muted">
                                            {product.quantity} × ${product.price}
                                        </small>
                                    </div>

                                    <strong className="text-nowrap">
                                        ${(
                                            product.price *
                                            product.quantity
                                        ).toFixed(2)}
                                    </strong>
                                </div>
                            ))}

                            <hr />

                            <div className="d-flex justify-content-between align-items-center">
                                <strong>Total</strong>

                                <strong className="text-success fs-5">
                                    ${cartTotal.toFixed(2)}
                                </strong>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Checkout;