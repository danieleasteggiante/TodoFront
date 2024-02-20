import { Navigate, useLocation } from "react-router";
import {useAuth} from "./AuthContext";

export const PrivateRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
    let auth = useAuth();
    let location = useLocation();

    if (!auth.isAuthenticated) return <Navigate to="/" state={{ from: location }} />;

    return children;
};