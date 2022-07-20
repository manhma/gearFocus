import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Pagination } from '@mui/material';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table } from 'reactstrap';
import { RootRouter } from '../../../../../../configs/router.config';
import './DataTable.scss';

type Props = {};

function DataTable(props: any) {
    const { listUser, handleSelectUser, handleSelectAllUser } = props;

    const navigate = useNavigate();
    const [selectAllUser, setSelectAllUser] = useState(false);

    const formatDate = (date: number) => {
        const newDate = new Date(date * 1000);
        return moment(newDate).format('lll');
    };

    useEffect(() => {
        handleSelectAllUser(selectAllUser);
    }, [selectAllUser]);
    return (
        <div>
            <Table>
                <thead>
                    <tr>
                        <th>
                            <input
                                type="checkbox"
                                checked={selectAllUser}
                                onChange={() => setSelectAllUser(!selectAllUser)}
                            />
                        </th>
                        <th>Login/Email</th>
                        <th>Name</th>
                        <th>Access level</th>
                        <th>Products</th>
                        <th>Orders</th>
                        <th>Wishlist</th>
                        <th>Created</th>
                        <th>Last Login</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {listUser.map((item: any) => (
                        <tr key={item.profile_id} className={item.selected ? 'tr-table-selected' : ''}>
                            <th scope="row">
                                <input
                                    type="checkbox"
                                    checked={item.selected}
                                    onChange={() => handleSelectUser(item.profile_id)}
                                />
                            </th>
                            <td>
                                <div className="email-td">
                                    <span
                                        className="a-td"
                                        onClick={() =>
                                            navigate({
                                                pathname: RootRouter.DETAIL_USER,
                                                search: `id=${item.profile_id}`,
                                            })
                                        }
                                    >
                                        {item.vendor}
                                    </span>
                                    <span>{item.storeName}</span>
                                </div>
                            </td>
                            <td>
                                {item.fistName} {item.lastName}
                            </td>
                            <td>{item.access_level}</td>
                            <td>{item.product}</td>
                            <td>{item.order.order_as_buyer}</td>
                            <td>{item.wishlist}</td>
                            <td>{formatDate(item.created)}</td>
                            <td>{formatDate(item.last_login)}</td>
                            <td>
                                <FontAwesomeIcon icon={faTrash} onClick={() => handleSelectUser(item.profile_id)} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
}

export default DataTable;
