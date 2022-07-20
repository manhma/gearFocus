import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { RootRouter } from './configs/router.config';
import LoginPage from './modules/auth/pages/loginPage';
import HomePage from './modules/home/homePage';
import DefaultLayout from './modules/layouts/DefaultLayout';
import ProtectedRoute from './modules/layouts/protectedRouter';
import CreateProductPage from './modules/pages/productPage/createProduct/CreateProductPage';
import CreateProductPage2 from './modules/pages/productPage/createProduct/CreateProductPage2';
import ProductDetail from './modules/pages/productPage/detailProduct/ProductDetail';
import ProductPage from './modules/pages/productPage/productManage/ProductPage';
import CreateUserPage from './modules/pages/userPage/createUser/CreateUserPage';
import DetailUser from './modules/pages/userPage/detailUser/DetailUser';
import UserPage from './modules/pages/userPage/userManager';

type Props = {};

function Routers({}: Props) {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate replace to={RootRouter.USER} />} />
                <Route path="/" element={<ProtectedRoute />}>
                    <Route
                        path=""
                        element={
                            <DefaultLayout>
                                <HomePage />
                            </DefaultLayout>
                        }
                    >
                        <Route path={RootRouter.USER} element={<UserPage />} />
                        <Route path={RootRouter.PRODUCT} element={<ProductPage />} />
                        <Route path={RootRouter.NEW_USER} element={<CreateUserPage />} />
                        <Route path={RootRouter.DETAIL_USER} element={<DetailUser />} />
                        <Route path={RootRouter.NEW_PRODUCT} element={<CreateProductPage2 />} />
                        <Route path={RootRouter.DETAIL_PRODUCT} element={<ProductDetail />} />
                    </Route>
                </Route>
                <Route path="/login" element={<LoginPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default Routers;
