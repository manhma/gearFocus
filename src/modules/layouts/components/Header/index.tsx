import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import './Header.scss';

type Props = {
    onShowSidebar: any;
};

function Header({ onShowSidebar }: Props) {
    return (
        <div className="wrapper-header">
            <div className="header-left">
                <FontAwesomeIcon icon={faBars} className="show-menu-icon" onClick={onShowSidebar} />
                <div className="logo-header">Gear Focus Admin</div>
            </div>
            <FontAwesomeIcon icon={faUser} className="myuser-icon" />
        </div>
    );
}

export default Header;
