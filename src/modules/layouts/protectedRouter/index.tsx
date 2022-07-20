import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { RootRouter } from '../../../configs/router.config';

type Props = {};

function ProtectedRoute({}: Props) {
    const getToken = localStorage.getItem('token');

    if (getToken) {
        return <Outlet />;
    }

    return (
        <Navigate
            to={{
                pathname: RootRouter.LOGIN,
            }}
        />
    );
}

export default ProtectedRoute;
