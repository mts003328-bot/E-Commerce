import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addProduct } from "../api/products";

function AddProduct() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: "",
        price: "",
        description: "",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    function handleChange(event) {
        const { name, value } = event.target;

        setFormData((previousData) => ({
            ...previousData,
            [name]: value,
        }));
    }

    async function handleSubmit(event) {
        event.preventDefault();
        setError("");

        const { title, price, description } = formData;

        if (!title.trim() || !price || !description.trim()) {
            setError("Please fill in all fields.");
            return;
        }

        try {
            setLoading(true);

            const newProduct = await addProduct({
                title,
                price: Number(price),
                description,
            });

            navigate("/products", {
                state: {
                    newProduct,
                },
            });
        } catch (error) {
            console.error(error);
            setError("Failed to add product");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="container py-4">
            <h1 className="mb-4">Add Product</h1>

            {error && (
                <div className="alert alert-danger">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">
                        Product Title
                    </label>

                    <input
                        type="text"
                        name="title"
                        className="form-control"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="Enter product title"
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">
                        Price
                    </label>

                    <input
                        type="number"
                        name="price"
                        className="form-control"
                        value={formData.price}
                        onChange={handleChange}
                        placeholder="Enter price"
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">
                        Description
                    </label>

                    <textarea
                        name="description"
                        className="form-control"
                        rows="4"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Enter product description"
                    />
                </div>

                <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={loading}
                >
                    {loading ? "Adding..." : "Add Product"}
                </button>

                <button
                    type="button"
                    className="btn btn-secondary ms-2"
                    onClick={() => navigate("/products")}
                >
                    Cancel
                </button>
            </form>
        </div>
    );

}

export default AddProduct;
