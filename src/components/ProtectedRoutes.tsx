import { Navigate } from 'react-router'
import { useAuth } from '../hooks/useAuth';

export const ProtectedRoute = ({ children }: any) => {
    const user: boolean = useAuth();
    if (!user) {
        return <><Navigate to="/app/sign_in" /></>;
    }
    return<>{children}</>;
};

export const UnProtectedRoute = ({ children }: any) => {
    const user: boolean = useAuth();
    if (user) {
        return <><Navigate to="/app/dashboard" /></>;
    }
    return<>{children}</>;
};