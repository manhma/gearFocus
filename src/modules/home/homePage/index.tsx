import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { getRequest } from '../../../services/apiServices';
import Filter from '../../common/components/filter';
import Footer from '../../common/components/footerPage/Footer';
import DataTable from '../../pages/userPage/userManager/components/tableUser/DataTable';
import { addCategory } from '../../pages/productPage/redux/productManageSlice';
import { addCountry, addRole } from '../../pages/userPage/redux/userManageSlice';
import './HomePage.scss';

function HomePage() {
    const dispatch = useDispatch();
    useEffect(() => {
        const getRole = async () => {
            const res = await getRequest('apiAdmin/commons/role');
            dispatch(addRole(res.body.data));
        };
        const getCategory = async () => {
            const res = await getRequest('api/categories/list');
            dispatch(addCategory(res.body.data));
        };
        const getCountry = async () => {
            const res = await getRequest('apiAdmin/commons/country');
            const newListCountry = res.body.data.map((item: any) => ({ ...item, id: item.code, name: item.country }));
            dispatch(addCountry(newListCountry));
        };

        getRole();
        getCategory();
        getCountry();
    }, []);
    return <Outlet />;
}

export default HomePage;
