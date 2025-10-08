import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

type NonProtectedRouteProps = {
    children: React.ReactNode;
};

const NonProtectedRoute: React.FC<NonProtectedRouteProps> = ({ children }) => {
    const navigate = useNavigate();

    useEffect(() => {
        const user = localStorage.getItem("user");

        if (user) {
            navigate("/dashboard");
        }
    }, [navigate]);

    return <>{children}</>;
};

export default NonProtectedRoute;
