import { faBookmark, faEnvelopeOpen, faUser } from '@fortawesome/free-regular-svg-icons';
import { faTag } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Accordion,
    AccordionBody,
    AccordionHeader,
    AccordionItem,
    Collapse,
    ListGroup,
    ListGroupItem,
    UncontrolledAccordion,
} from 'reactstrap';
import { RootRouter } from '../../../../configs/router.config';
import './Sidebar.scss';

type Props = {
    isShowSidebar: boolean;
    onShowSidebar: any;
};

function Sidebar({ isShowSidebar, onShowSidebar }: Props) {
    const navigate = useNavigate();
    const [showItemMenu, setShowItemMenu] = useState<string>('');
    if (isShowSidebar) {
        return (
            <div className="wrapper-sidebar">
                <Collapse horizontal isOpen={isShowSidebar} className="collapse-sidebar">
                    <div>
                        <UncontrolledAccordion flush open={showItemMenu} stayOpen>
                            <AccordionItem>
                                <AccordionHeader targetId="1" onClick={() => setShowItemMenu('1')}>
                                    <FontAwesomeIcon icon={faEnvelopeOpen} className="menu-item" />
                                    Orders
                                </AccordionHeader>
                                <AccordionBody accordionId="1">
                                    <ListGroup flush>
                                        <ListGroupItem tag="a">Order List</ListGroupItem>
                                        <ListGroupItem tag="a">Dapibus ac facilisis in</ListGroupItem>
                                        <ListGroupItem tag="a">Morbi leo risus</ListGroupItem>
                                        <ListGroupItem tag="a">Porta ac consectetur ac</ListGroupItem>
                                        <ListGroupItem tag="a">Vestibulum at eros</ListGroupItem>
                                    </ListGroup>
                                </AccordionBody>
                            </AccordionItem>
                            <AccordionItem>
                                <AccordionHeader targetId="2" onClick={() => setShowItemMenu('2')}>
                                    <FontAwesomeIcon icon={faBookmark} className="menu-item" />
                                    Catalog
                                </AccordionHeader>
                                <AccordionBody accordionId="2">
                                    <ListGroup flush>
                                        <ListGroupItem tag="a" onClick={() => navigate(RootRouter.PRODUCT)}>
                                            Products
                                        </ListGroupItem>
                                        <ListGroupItem tag="a">Reviews</ListGroupItem>
                                    </ListGroup>
                                </AccordionBody>
                            </AccordionItem>
                            <AccordionItem>
                                <AccordionHeader targetId="3" onClick={() => setShowItemMenu('3')}>
                                    <FontAwesomeIcon icon={faUser} className="menu-item" />
                                    User
                                </AccordionHeader>
                                <AccordionBody accordionId="3">
                                    <ListGroup flush>
                                        <ListGroupItem onClick={() => navigate(RootRouter.USER)} tag="a">
                                            User List
                                        </ListGroupItem>
                                    </ListGroup>
                                </AccordionBody>
                            </AccordionItem>
                        </UncontrolledAccordion>
                    </div>
                </Collapse>
            </div>
        );
    } else {
        return (
            <div className="wrapper-sidebar">
                <div className="sidebar-small" onClick={() => onShowSidebar()}>
                    <FontAwesomeIcon icon={faEnvelopeOpen} className="menu-item-small" />
                    <FontAwesomeIcon icon={faBookmark} className="menu-item-small" />
                    <FontAwesomeIcon icon={faUser} className="menu-item-small" />
                </div>
            </div>
        );
    }
}

export default Sidebar;
