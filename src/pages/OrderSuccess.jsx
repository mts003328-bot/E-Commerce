import { Link } from "react-router-dom";

function OrderSuccess() {
    return (<div className="container py-5">
        <div
            className="card shadow-sm text-center mx-auto"
            style={{ maxWidth: "600px" }}
        > <div className="card-body p-4 p-md-5"> <div className="mb-3"> <span className="fs-1 text-success">✓</span> </div>

                ```
                <h1 className="mb-3">
                    Order Placed Successfully!
                </h1>

                <p className="text-muted mb-4">
                    Thank you for your order. Your order has been received
                    and will be processed shortly.
                </p>

                <Link to="/products" className="btn btn-primary">
                    Continue Shopping
                </Link>
            </div>
        </div>
    </div>
    );

}

export default OrderSuccess;
