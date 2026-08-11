const API_URL = import.meta.env.VITE_API_URL;

export async function getComments() {
    const response = await fetch(
        `${API_URL}/comments`
    );

    return await response.json();
}

export async function getComment(id) {
    const response = await fetch(
        `${API_URL}/comments/${id}`
    );

    return await response.json();
}

export async function getCommentsByPost(postId) {
    const response = await fetch(
        `${API_URL}/comments/post/${postId}`
    );

    if (!response.ok) {
        throw new Error("Failed to fetch comments");
    }

    const data = await response.json();

    return data.comments;
}

export async function addComment(postId, body) {
    const response = await fetch(
        `${API_URL}/comments/add`,
        {
            method: "POST",

            headers: {
                "Content-Type": "application/json",
            },

            body: JSON.stringify({
                body: body,
                postId: postId,
                userId: 1,
            }),
        }
    );

    if (!response.ok) {
        throw new Error("Failed to add comment");
    }

    return await response.json();
}

export async function getCommentsWithPagination(
    limit = 10,
    skip = 0
) {
    const response = await fetch(
        `${API_URL}/comments?limit=${limit}&skip=${skip}&select=body,postId`
    );

    return await response.json();
}

export async function updateComment(id, comment) {
    const response = await fetch(
        `${API_URL}/comments/${id}`,
        {
            method: "PUT",

            headers: {
                "Content-Type": "application/json",
            },

            body: JSON.stringify(comment),
        }
    );

    return await response.json();
}

export async function deleteComment(id) {
    const response = await fetch(
        `${API_URL}/comments/${id}`,
        {
            method: "DELETE",
        }
    );

    return await response.json();
}