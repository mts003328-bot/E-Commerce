import { useSelector } from "react-redux";

function Profile() {
    const user = useSelector((state) => state.auth.user);

    if (!user) {
        return (
            <div className="container py-4">
                <div className="alert alert-danger">
                    No user found. Please login first.
                </div>
            </div>
        );
    }

    return (
        <div className="container py-4">
            <div className="card shadow-sm p-4">
                <h1 className="mb-4">My Profile</h1>

                <div className="text-center mb-4">
                    <img
                        src={user.image}
                        alt={user.firstName}
                        width="120"
                        height="120"
                        className="rounded-circle"
                    />
                </div>

                <h3>
                    {user.firstName} {user.lastName}
                </h3>

                <p>
                    <strong>Username:</strong> {user.username}
                </p>

                <p>
                    <strong>Email:</strong> {user.email}
                </p>

                <p>
                    <strong>Age:</strong> {user.age}
                </p>

                <p>
                    <strong>Gender:</strong> {user.gender}
                </p>
            </div>
        </div>
    );

}

export default Profile;
