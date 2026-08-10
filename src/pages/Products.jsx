import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";

import { logout } from "../redux/authSlice";

import {
    getProducts,
    deleteProduct,
    updateProduct
} from "../api/products";

import { useCart } from "../context/CartContext";


function Products() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();

    const {
        cartCount,
        addToCart
    } = useCart();


    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [editingId, setEditingId] = useState(null);
    const [editTitle, setEditTitle] = useState("");
    const [editPrice, setEditPrice] = useState("");
    const [editDescription, setEditDescription] = useState("");


    // LOGOUT

    function handleLogout() {

        dispatch(logout());

        navigate("/login");

    }


    // DELETE

    async function handleDelete(productId) {

        try {

            await deleteProduct(productId);

            setProducts((previousProducts) =>
                previousProducts.filter(
                    (product) => product.id !== productId
                )
            );

        } catch (error) {

            console.error(error);
            setError("Failed to delete product");

        }

    }


    // START EDIT

    function handleEdit(product) {

        setEditingId(product.id);
        setEditTitle(product.title);
        setEditPrice(product.price);
        setEditDescription(product.description);

    }


    // UPDATE

    async function handleUpdate(productId) {

        try {

            const updatedProduct = await updateProduct(
                productId,
                {
                    title: editTitle,
                    price: Number(editPrice),
                    description: editDescription
                }
            );


            setProducts((previousProducts) =>
                previousProducts.map((product) =>
                    product.id === productId
                        ? {
                            ...product,
                            ...updatedProduct
                        }
                        : product
                )
            );


            setEditingId(null);
            setEditTitle("");
            setEditPrice("");
            setEditDescription("");

        } catch (error) {

            console.error(error);
            setError("Failed to update product");

        }

    }


    // GET PRODUCTS

    useEffect(() => {

        async function loadProducts() {

            try {

                const data = await getProducts();

                let loadedProducts = data.products;

                const newProduct =
                    location.state?.newProduct;


                if (newProduct) {

                    loadedProducts = [
                        newProduct,
                        ...loadedProducts
                    ];

                }


                setProducts(loadedProducts);

            } catch (error) {

                console.error(error);
                setError("Failed to load products");

            } finally {

                setLoading(false);

            }

        }


        loadProducts();

    }, [location.state]);


    // LOADING

    if (loading) {

        return (
            <div className="container py-5 text-center">

                <div
                    className="spinner-border text-primary mb-3"
                    role="status"
                />

                <h5>
                    Loading products...
                </h5>

            </div>
        );

    }


    // ERROR

    if (error) {

        return (
            <div className="container py-5">

                <div className="alert alert-danger">
                    {error}
                </div>

            </div>
        );

    }


    return (

        <div className="container py-4">


            {/* HEADER */}

            <div className="d-flex flex-column flex-sm-row justify-content-between align-items-sm-center gap-3 mb-4">

                <h1 className="mb-0">
                    Products
                </h1>


                <div className="d-flex gap-2">

                    <Link
                        to="/profile"
                        className="btn btn-outline-secondary"
                        title="Profile"
                    >
                        👤
                    </Link>


                    <Link
                        to="/cart"
                        className="btn btn-outline-primary position-relative"
                        title="Cart"
                    >
                        🛒

                        {cartCount > 0 && (

                            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">

                                {cartCount}

                            </span>

                        )}

                    </Link>


                    <button
                        onClick={handleLogout}
                        className="btn btn-danger"
                    >
                        Logout
                    </button>

                </div>

            </div>


            {/* ADD PRODUCT */}

            <Link
                to="/products/add"
                className="btn btn-primary mb-4"
            >
                Add Product
            </Link>


            {/* PRODUCTS */}

            <div className="row g-4">

                {products.map((product) => (

                    <div
                        className="col-12 col-sm-6 col-lg-4 col-xl-3"
                        key={product.id}
                    >

                        <div className="card h-100 shadow-sm">


                            <img
                                src={product.thumbnail}
                                className="card-img-top p-3"
                                alt={product.title}
                            />


                            <div className="card-body d-flex flex-column">


                                {editingId === product.id ? (

                                    <>

                                        <input
                                            type="text"
                                            className="form-control mb-2"
                                            value={editTitle}
                                            onChange={(event) =>
                                                setEditTitle(
                                                    event.target.value
                                                )
                                            }
                                        />


                                        <input
                                            type="number"
                                            className="form-control mb-2"
                                            value={editPrice}
                                            onChange={(event) =>
                                                setEditPrice(
                                                    event.target.value
                                                )
                                            }
                                        />


                                        <textarea
                                            className="form-control mb-3"
                                            rows="3"
                                            value={editDescription}
                                            onChange={(event) =>
                                                setEditDescription(
                                                    event.target.value
                                                )
                                            }
                                        />


                                        <div className="mt-auto d-flex gap-2">

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    handleUpdate(
                                                        product.id
                                                    )
                                                }
                                                className="btn btn-success btn-sm"
                                            >
                                                Save
                                            </button>


                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setEditingId(null);
                                                    setEditTitle("");
                                                    setEditPrice("");
                                                    setEditDescription("");
                                                }}
                                                className="btn btn-secondary btn-sm"
                                            >
                                                Cancel
                                            </button>

                                        </div>

                                    </>

                                ) : (

                                    <>

                                        <Link
                                            to={`/products/${product.id}`}
                                            className="text-decoration-none text-dark"
                                        >

                                            <h5 className="card-title">
                                                {product.title}
                                            </h5>


                                            <p className="card-text text-muted">
                                                {product.description}
                                            </p>


                                            <h5 className="fw-bold">
                                                ${product.price}
                                            </h5>

                                        </Link>


                                        <div className="mt-auto pt-3 d-flex flex-wrap gap-2">

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    handleEdit(product)
                                                }
                                                className="btn btn-warning btn-sm"
                                            >
                                                Edit
                                            </button>


                                            <button
                                                type="button"
                                                onClick={() =>
                                                    handleDelete(product.id)
                                                }
                                                className="btn btn-danger btn-sm"
                                            >
                                                Delete
                                            </button>


                                            <button
                                                type="button"
                                                onClick={() =>
                                                    addToCart(product)
                                                }
                                                className="btn btn-primary btn-sm"
                                            >
                                                Add to Cart
                                            </button>

                                        </div>

                                    </>

                                )}

                            </div>

                        </div>

                    </div>

                ))}

            </div>

        </div>

    );

}


export default Products;