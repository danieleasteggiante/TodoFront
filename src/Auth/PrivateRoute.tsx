import { Navigate, useLocation } from "react-router";
import {useAuth} from "./AuthContext";

interface PrivateRouteProps {
    children: JSX.Element;
}

export function PrivateRoute ({ children }: PrivateRouteProps) {
    let auth = useAuth();
    let location = useLocation();
    if (!auth.isAuthenticated)
        return <Navigate to="/" state={{ from: location }} />;

    return children;
};