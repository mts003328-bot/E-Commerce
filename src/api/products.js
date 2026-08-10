export async function getProducts() {
    const response = await fetch(
        "https://dummyjson.com/products"
    );

    return await response.json();
}


export async function getProduct(id) {
    const response = await fetch(
        `https://dummyjson.com/products/${id}`
    );

    return await response.json();
}


export async function searchProducts(query) {
    const response = await fetch(
        `https://dummyjson.com/products/search?q=${query}`
    );

    return await response.json();
}


export async function getProductsByCategory(category) {
    const response = await fetch(
        `https://dummyjson.com/products/category/${category}`
    );

    return await response.json();
}


export async function getCategoryList() {
    const response = await fetch(
        "https://dummyjson.com/products/category-list"
    );

    return await response.json();
}


export async function getCategories() {
    const response = await fetch(
        "https://dummyjson.com/products/categories"
    );

    return await response.json();
}


export async function sortProducts(sortBy, order) {
    const response = await fetch(
        `https://dummyjson.com/products?sortBy=${sortBy}&order=${order}`
    );

    return await response.json();
}


export async function getProductsWithPagination(
    limit = 10,
    skip = 0
) {
    const response = await fetch(
        `https://dummyjson.com/products?limit=${limit}&skip=${skip}&select=title,price`
    );

    return await response.json();
}


export async function addProduct(product) {
    const response = await fetch(
        "https://dummyjson.com/products/add",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(product),
        }
    );

    return await response.json();
}


export async function updateProduct(id, product) {
    const response = await fetch(
        `https://dummyjson.com/products/${id}`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(product),
        }
    );

    return await response.json();
}


export async function deleteProduct(id) {
    const response = await fetch(
        `https://dummyjson.com/products/${id}`,
        {
            method: "DELETE",
        }
    );

    return await response.json();
}
