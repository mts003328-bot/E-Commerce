import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { login, setUser } from "../redux/authSlice";

function LoginForm() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const refreshToken = useSelector(
        (state) => state.auth.refreshToken
    );

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    async function getCurrentUser(token) {
        const response = await fetch(
            "https://dummyjson.com/auth/me",
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(
                data.message || "Failed to get user"
            );
        }

        dispatch(setUser(data));
    }

    async function handleSubmit(event) {
        event.preventDefault();

        try {
            const response = await fetch(
                "https://dummyjson.com/auth/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        username,
                        password,
                        expiresInMins: 30,
                    }),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                alert(data.message || "Login failed");
                return;
            }

            dispatch(
                login({
                    accessToken: data.accessToken,
                    refreshToken: data.refreshToken,
                    user: data,
                })
            );

            await getCurrentUser(data.accessToken);

            alert("Login Successful!");

            navigate("/products");
        } catch (error) {
            console.error("Login Error:", error);
            alert("Something went wrong. Please try again.");
        }
    }

    async function refreshAccessToken() {
        if (!refreshToken) {
            alert("No refresh token available. Please login again.");
            return;
        }

        try {
            const response = await fetch(
                "https://dummyjson.com/auth/refresh",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        refreshToken: refreshToken,
                        expiresInMins: 30,
                    }),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                alert(data.message || "Refresh failed");
                return;
            }

            dispatch(
                login({
                    accessToken: data.accessToken,
                    refreshToken: data.refreshToken,
                    user: null,
                })
            );

            alert("Token refreshed successfully!");
        } catch (error) {
            console.error("Refresh Error:", error);
            alert("Failed to refresh token.");
        }
    }

    return (
        <div className="container vh-100 d-flex justify-content-center align-items-center">
            <div
                className="card shadow p-4"
                style={{ width: "400px" }}
            >
                <h2 className="text-center mb-4">
                    Login
                </h2>

                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">
                            Username
                        </label>

                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter username"
                            value={username}
                            onChange={(event) =>
                                setUsername(event.target.value)
                            }
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">
                            Password
                        </label>

                        <input
                            type="password"
                            className="form-control"
                            placeholder="Enter password"
                            value={password}
                            onChange={(event) =>
                                setPassword(event.target.value)
                            }
                        />
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary w-100"
                    >
                        Login
                    </button>

                    <button
                        type="button"
                        className="btn btn-secondary w-100 mt-2"
                        onClick={refreshAccessToken}
                    >
                        Refresh Token
                    </button>
                </form>
            </div>
        </div>
    );
}

export default LoginForm;