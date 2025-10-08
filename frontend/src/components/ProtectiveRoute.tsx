import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

type ProtectedRouteProps = {
    children: React.ReactNode;
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const navigate = useNavigate();

    useEffect(() => {
        const user = localStorage.getItem("user");

        if (!user) {
            navigate("/");
        }
    }, [navigate]);

    return <>{children}</>;
};

export default ProtectedRoute;

    