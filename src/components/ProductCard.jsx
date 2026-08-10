<Link
    to={`/products/${product.id}`}
    className="text-decoration-none text-dark"
>
    <div className="card h-100">

        <img
            src={product.thumbnail}
            className="card-img-top"
            alt={product.title}
        />

        <div className="card-body">

            <h5 className="card-title">
                {product.title}
            </h5>

            <p className="card-text">
                {product.description}
            </p>

            <h5>
                ${product.price}
            </h5>

        </div>

    </div>
</Link>