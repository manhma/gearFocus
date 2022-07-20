import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import './DefaultLayout.scss';

function DefaultLayout({ children }: any) {
    const [isShowSidebar, setIsShowSidebar] = useState(true);
    const onShowSidebar = () => {
        setIsShowSidebar(!isShowSidebar);
    };
    return (
        <div className="app">
            <Header onShowSidebar={onShowSidebar} />
            <div className="container-home">
                <Sidebar isShowSidebar={isShowSidebar} onShowSidebar={onShowSidebar} />
                {children}
            </div>
        </div>
    );
}

export default DefaultLayout;
