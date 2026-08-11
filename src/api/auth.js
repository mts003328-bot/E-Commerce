const API_URL = import.meta.env.VITE_API_URL;

export async function login(username, password) {
    const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",

        headers: {
            "Content-Type": "application/json",
        },

        body: JSON.stringify({
            username,
            password,
            expiresInMins: 30,
        }),

        credentials: "include",
    });

    const data = await response.json();

    return {
        response,
        data,
    };
}

export async function getCurrentUser(accessToken) {
    const response = await fetch(`${API_URL}/auth/me`, {
        method: "GET",

        headers: {
            Authorization: `Bearer ${accessToken}`,
        },

        credentials: "include",
    });

    const data = await response.json();

    return {
        response,
        data,
    };
}

export async function refreshAccessToken(refreshToken) {
    const response = await fetch(`${API_URL}/auth/refresh`, {
        method: "POST",

        headers: {
            "Content-Type": "application/json",
        },

        body: JSON.stringify({
            refreshToken,
            expiresInMins: 30,
        }),

        credentials: "include",
    });

    const data = await response.json();

    return {
        response,
        data,
    };
}